import React, { useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import DateDifference from '../utility/DateDifference.js';
import axios from 'axios';
import BASE_URL from '../api_url';

const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    //console.log(result);
    return result;
}


const Project = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [current_tab, setCurrent_tab] = useState('earning');
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');
    const [investment_amount, setInvestment_amount] = useState(0);
    const [accumulated_income, setAccumulated_income] = useState(0);
    const [today_income, setToday_income] = useState(0);


    const toaster = (text) => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(() => {
            setToasterShow(false);
            navigate('/mine');
        }, 5000);
    }


    const getUserDetails = async () => {
        // const docRef = doc(db, 'users', auth.currentUser.uid);
        await axios.post(`${BASE_URL}/get_user`, { user_id: localStorage.getItem('uid') }).then(async ({ data: document }) => {
            if (document) {
                setUserDetails(document);
                //console.log(document);
                if (('plans_purchased' in document) === false) {
                    toaster('Please buy a plan first!');
                }
                if (document.plans_purchased.length > 0) {
                    var earn = 0;
                    var ia = 0, ai = 0, ti = 0;
                    var temp = document.plans_purchased.map((element) => {
                        ia += element.plan_amount;

                        var days = DateDifference(new Date(element.date_till_rewarded), new Date(Math.min(new Date(), addDays(new Date(element.date_purchased), element.plan_cycle))));
                        var days2 = DateDifference(new Date(element.date_till_rewarded), addDays(new Date(element.date_purchased), element.plan_cycle));
                        //console.log(days);
                        if (element.product_type === 'short') {
                            if (days === element.plan_cycle) {
                                ti += element.plan_daily_earning;
                                ai += (days * element.quantity * element.plan_daily_earning);
                                earn = (days * element.quantity * element.plan_daily_earning);
                                return {
                                    ...element,
                                    date_till_rewarded: new Date(Math.min(new Date(), addDays(new Date(element.date_purchased), element.plan_cycle))).toDateString()
                                }
                            } else {
                                return {
                                    ...element
                                }
                            }
                        }

                        if (days > element.plan_cycle) {
                            return {
                                ...element
                            }
                        }
                        if ((DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded))) >= 1) {
                            ti += element.plan_daily_earning;
                        }
                        ai += DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning;
                        //console.log(ai);
                        earn = earn + (days * element.quantity * element.plan_daily_earning);
                        return {
                            ...element,
                            date_till_rewarded: new Date(Math.min(new Date(), addDays(new Date(element.date_purchased), element.plan_cycle))).toDateString()
                        }
                    });

                    setInvestment_amount(ia);
                    setAccumulated_income(ai);
                    setToday_income(ti);


                    await axios.post(`${BASE_URL}/update_earning`, {
                        earn: earn,
                        temp: temp,
                        user_id: localStorage.getItem('uid')
                    })
                        .then(() => console.log('Reward successfully updated'))
                        .catch(error => console.log('Some error Occured'));
                }
            } else {
                console.log('Data not found');
            }
            setLoading(false);

        }).then(() => {
            //console.log('This is working');
        })
            .catch(error => console.log('Some error occured', error));
    }

    useEffect(() => {
        setLoading(true);
        getUserDetails();
        //console.log(userDetails);
        //console.log('Use Effect Ran');
    }, []);

    if (loading) {
        return (
            <div className="grid place-items-center h-screen ">
                <div className='flex flex-col justify-center items-center'>
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="2"
                        animationDuration="0.75"
                        width="40"
                        visible={true}
                    />
                    <div className='text-lg text-gray-500'>Loading...</div>
                </div>
            </div>
        )
    }


    //[#2e9afe]
    return (
        <div className='md:h-screen overflow-y-scroll xs:h-[700px] bg-red-800 h-screen relative w-full'>
            {toasterShow ? <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-2 bg-black opacity-80 text-white mx-auto w-10/12 px-2 py-1 rounded-md'>
                    <div className='text-center w-full'>{toasterText}</div>
                </div>
            </div> : null}

            <div className="options text-center  text-recharge-bg flex justify-between  bg-confirm text-md  font-normal mb-2 py-3 items-center px-2">
                <div className="flex items-center font-bold">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate(-1)}
                            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className="w-4 h-4   storke-white  cursor-pointer stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    <span className='text-sm'>back</span>
                </div>
                <div className='flex-grow text-md font-semibold'>My Projects</div>
                <div className=" font-bold text-sm text-confirm">Records</div>
            </div>


            <div className='records w-[85%] mx-auto flex bg-white items-center justify-center mt-2'>
                <div onClick={() => setCurrent_tab('earning')} 
                className={`${current_tab === 'earning' ? 'text-white border-b-2 border-red-800 bg-confirm' : 'bg-white border-b-[0.5px] border-l-[0.5px] border-r-[0.5px] border-white text-confirm'} px-1 py-[2px] text-center text-md w-1/2 font-normal`}>unexpired product</div>
                <div onClick={() => setCurrent_tab('completed')} 
                className={`${current_tab !== 'earning' ? 'text-white border-b-2 border-red-800 bg-confirm' : 'bg-white border-b-[0.5px] border-l-[0.5px] border-r-[0.5px] border-white text-confirm'} px-1 py-[2px] text-center text-md w-1/2 font-normal`}>expired product</div>
            </div>

            <div className=' mx-auto w-[95%] mt-2 p-2 pb-10'>
                {
                    current_tab === 'earning' && userDetails && ('plans_purchased' in userDetails) && (
                        userDetails.plans_purchased.map((element, index) => {
                            if (element.plan_daily_earning * element.plan_cycle !== DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning) {
                                return (
                                    <div key={index} className='mx-auto w-[90%] mt-4 border-x-2 border-white border-b-2  rounded-lg '>
                                        <div className="text-lg p-3 text-white font-semibold bg-confirm rounded-t-lg">Plan Details</div>
                                        <div className='p-3'>
                                            <div className='mb-1'>Plan Name: {element.plan_name}</div>
                                            <div className='mb-1'>Start Date: {element.date_purchased}</div>
                                            <div className='mb-1'>Plan Amount: &#8377;{element.plan_amount}</div>
                                            <div className='mb-1'>Plan Type: {element.plan_type}</div>
                                            <div className='mb-1'>Plan Cycle: {element.plan_cycle}</div>
                                            <div className='mb-1'>Plan Daily Earning: &#8377;{element.plan_daily_earning}</div>
                                            <div className='mb-1'>Quantity: {element.quantity}</div>
                                            <div className='mb-1'>Current Earning: &#8377;{DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning}</div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    )
                }

                {
                    userDetails && ('plans_purchased' in userDetails) && (
                        current_tab === 'completed' && userDetails.plans_purchased.map((element, index) => {
                            if (element.plan_daily_earning * element.plan_cycle === DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning) {
                                return (
                                    <div key={index} className='mx-auto w-[90%] mt-4 border-x-2 border-white border-b-2  rounded-lg '>
                                        <div className="text-lg p-3 text-white font-semibold bg-confirm rounded-t-lg">Plan Details</div>
                                        <div className='p-3'>
                                            <div className='mb-1'>Plan Name: {element.plan_name}</div>
                                            <div className='mb-1'>Start Date: {element.date_purchased}</div>
                                            <div className='mb-1'>Plan Amount: &#8377;{element.plan_amount}</div>
                                            <div className='mb-1'>Plan Type: {element.plan_type}</div>
                                            <div className='mb-1'>Plan Cycle: {element.plan_cycle}</div>
                                            <div className='mb-1'>Plan Daily Earning: &#8377;{element.plan_daily_earning}</div>
                                            <div className='mb-1'>Quantity: {element.quantity}</div>
                                            <div className='mb-1'>Current Earning: &#8377;{DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning}</div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    )
                }
            </div>



            {!userDetails?.plans_purchased && (
                <div className='text-2xl text-white text-center w-[90%] mx-auto p-3 m-3 border-2 border-gray-300 rounded-lg shadow-lg'>
                    No data to show!
                </div>
            )}
        </div>
    )
}

export default Project