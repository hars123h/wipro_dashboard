import React, { useEffect, useState } from 'react';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AmountContext } from '../App';
import recharge_image from '../images/dj/recharge_image.png';

const Recharge = () => {

    const [recharge_value, setRecharge_Value] = useState(0);
    const [currentPaymentMode, setCurrentPaymentMode] = useState(0)
    const navigate = useNavigate();
    const amountDetails = useContext(AmountContext);
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');
    const valueRef = useRef();

    const toaster = (text) => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(() => {
            setToasterShow(false);
            //navigate('/mine');
        }, 5000);
    }

    useEffect(() => {
        document.body.style.backgroundColor = "white";
    }, []);

    const handleRecharge = () => {
        if (parseInt(recharge_value)) {
            if (Number(amountDetails.amount) > Number(recharge_value)) {
                toaster(`Amount should be greater than ₹${amountDetails.amount}`);
                return;
            }
            navigate(`/recharge_window/${recharge_value}`);
        } else {
            alert('Enter a valid recharge amount');
        }
    }
    //[#2e9afe] #4daaff #298ae4 [#2e9afe]
    return (
        <div className='bg-red-800 h-screen relative'>
            {toasterShow ? <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-2 bg-black opacity-80 text-white px-2 w-10/12 py-1 rounded-md'>
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
                <div className='flex-grow text-md font-semibold'>Recharge</div>
                <div className=" font-bold text-sm">Records</div>
            </div>

            

            <div className="bg-white px-4 py-4 mx-3 box flex flex-col gap-2 mb-2 rounded-md">
                <div className='text-black text-md font-semibold'>Amount</div>
                <div className='bg-[#f6f6f6] flex flex-row items-center py-2 px-1 rounded-md'>
                    <input ref={valueRef} onChange={(e) => setRecharge_Value(e.target.value)}
                        type="text" name="amount" id="amt" placeholder='Please enter the amount'
                        className='w-full bg-inherit text-red-800 outline-none font-normal text-lg 
                    placeholder:opacity-70
                    flex-row placeholder:text-black placeholder:text-sm' />
                    <div className='opacity-70 mx-1'>RS</div>
                </div>
            </div>

            <div className="bg-white py-2 mx-3 box flex flex-col gap-1 mb-2 rounded-md">
                <div className='text-black px-4 text-md font-semibold'>Payment Channel</div>
                <div className='bg-white flex flex-col items-center py-2 rounded-md'>
                    <div onClick={()=>setCurrentPaymentMode(0)} className="flex justify-between items-center px-2 border-y-[1px] border-gray-100 w-full py-2">
                        <div className='flex flex-row gap-3 items-center justify-between'>
                            <div>
                                <img src={recharge_image} className='w-6 h-6' />
                            </div>
                            <div>Ppay</div>
                        </div>
                        <div>
                            {
                                currentPaymentMode === 0 ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#63d0d7" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#63d0d7" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            }

                        </div>
                    </div>

                    <div onClick={()=>setCurrentPaymentMode(1)} className="flex justify-between items-center px-2 border-y-[1px] border-gray-100 w-full py-2">
                        <div className='flex flex-row gap-3 items-center justify-between'>
                            <div>
                                <img src={recharge_image} className='w-6 h-6' />
                            </div>
                            <div>Ptm-S</div>
                        </div>
                        <div>
                            {
                                currentPaymentMode === 1 ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#63d0d7" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#63d0d7" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            }
                        </div>
                    </div>

                    <div onClick={()=>setCurrentPaymentMode(2)} className="flex justify-between items-center px-2 border-y-[1px] border-gray-100 w-full py-2">
                        <div className='flex flex-row gap-3 items-center justify-between'>
                            <div>
                                <img src={recharge_image} className='w-6 h-6' />
                            </div>
                            <div>Ptm-pay</div>
                        </div>
                        <div>
                        {
                                currentPaymentMode === 2 ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#63d0d7" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#63d0d7" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            }
                        </div>
                    </div>

                    <div className="cnf_recharge w-[90%] mx-auto mt-7">
                        <button onClick={handleRecharge} className='w-full bg-confirm py-3 font-semibold rounded-full text-white text-lg '>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className="box bg-white text-red-800 px-4 py-4 shadow-md shadow-gray-300 mx-3">



                <div className='m-1 text-sm text-gray-500 mb-4 '>Enter Amount:</div>
                <div className='m-1 w-full flex items-center border-b border-gray-300 pb-2'>
                    <span className='text-red-700 font-bold p-0.5 text-[12px] pr-1 '>₹</span>
                    <input ref={valueRef} onChange={(e) => setRecharge_Value(e.target.value)} type="text" name="amount" id="amt" placeholder='Amount' className='w-full bg-inherit text-red-800 outline-none font-normal text-lg ' />
                </div>

                <div className='grid grid-cols-3 gap-4 py-3'>
                    <div className='bg-recharge-bg text-center py-2 rounded-md cursor-pointer' onClick={() => { setRecharge_Value(500); valueRef.current.value = 500; }}>500</div>
                    <div className='bg-recharge-bg text-center py-2 rounded-md cursor-pointer' onClick={() => { setRecharge_Value(1000); valueRef.current.value = 1000; }}>1000</div>
                    <div className='bg-recharge-bg text-center py-2 rounded-md cursor-pointer' onClick={() => { setRecharge_Value(2000); valueRef.current.value = 2000; }}>2000</div>
                    <div className='bg-recharge-bg text-center py-2 rounded-md cursor-pointer' onClick={() => { setRecharge_Value(3000); valueRef.current.value = 3000; }}>3000</div>
                    <div className='bg-recharge-bg text-center py-2 rounded-md cursor-pointer' onClick={() => { setRecharge_Value(5000); valueRef.current.value = 5000; }}>5000</div>
                    <div className='bg-recharge-bg text-center py-2 rounded-md cursor-pointer' onClick={() => { setRecharge_Value(20000); valueRef.current.value = 20000; }}>20000</div>
                </div>

                <div className="cnf_recharge w-[85%] mx-auto mt-7">
                    <button onClick={handleRecharge} className='w-full bg-red-800 py-2 font-semibold rounded-md text-white text-lg '>Confirm Recharge</button>
                </div>

                <ol className='text-[#ff0000] text-[13px] flex flex-col gap-1 mt-2'>
                    <li className='mt-2 my-1 mr-1'>1:Follow the recharge video operation to help you quickly recharge successfully.</li>
                    <li className='mt-2 my-1 mr-1'>2:If the funds do not arrive in time, please contact the APP online customer service immediately.</li>
                    <li className='mt-2 my-1 mr-1'>3:Only the online customer service obtained in the APP is authentic and credible, do not trust impostors outside the APP.</li>
                    <li className='mt-2 my-1 mr-1'>4:Fill in the UTR number correctly, the funds will arrive soon.</li>
                </ol>

            </div> */}
        </div>
    )
}

export default Recharge