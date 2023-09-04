import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AmountContext } from '../App.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import BASE_URL from '../api_url.js';
import img1 from '../images/asml/assets/asset 1.png';
import img2 from '../images/asml/assets/asset 2.png';
import img3 from '../images/asml/assets/asset 3.png';
import img4 from '../images/asml/assets/asset 4.png';
import img5 from '../images/asml/assets/asset 5.png';
import img6 from '../images/asml/assets/asset 6.png';

const RechargeWindow = () => {

    const { recharge_value } = useParams();
    const [refno, setRefno] = useState('');
    const amountDetails = useContext(AmountContext);
    const navigate = useNavigate();
    const auth = getAuth();
    const [userDetails, setUserDetails] = useState(null);
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');

    const toaster = (text, arg = '') => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(() => {
            setToasterShow(false);
            //navigate('/mine');
            if (arg === '/record') {
                navigate('/record');
            }
        }, 5000);
    }

    const getUserDetails = async () => {
        const user_info = await axios.post(`${BASE_URL}/get_user`, { user_id: localStorage.getItem('uid') }).then(({ data }) => data);
        setUserDetails(user_info);
    }

    useEffect(() => {
        //console.log(amountDetails)
        getUserDetails();
    }, []);



    const handleRecharge = async () => {
        //console.log({ refno, recharge_value, status: 'pending' });
        if (refno.length !== 12) {
            toaster('Enter a valid Ref No. of 12 digits');
            return;
        }
        try {
            await axios.post(`${BASE_URL}/place_recharge`, {
                refno,
                recharge_value,
                status: 'pending',
                user_id: localStorage.getItem('uid'),
                mobno: userDetails.mobno,
                time: new Date(),
                parent_id: userDetails.parent_id,
                grand_parent_id: userDetails.grand_parent_id ? userDetails.grand_parent_id : '',
                great_grand_parent_id: userDetails.great_grand_parent_id ? userDetails.great_grand_parent_id : ''
            }).then((response) => {
                console.log(response.data);
                if (response.data.message === 'refno already exists') {
                    toaster('RefNo already exists');
                    setRefno('');
                    console.log('RefNo already exists');
                } else {
                    toaster('Request Placed Successfully!', '/record');
                    setRefno('');
                    console.log('Recharge placed successfully!');
                }
            })
            //console.log("Document written with ID: ", docRef1.id, docRef2.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className='sm:h-[700px] md:h-[950px] flex flex-col   bg-white relative'>
            {toasterShow ? <div className='absolute top-[350px] left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-2 bg-black opacity-80 text-white px-2 py-1 rounded-md'>
                    <div>{toasterText} </div>
                </div>
            </div> : null}
            <div className="options items-start justify-center text-white flex flex-col pt-4 pb-4 mx-3 pl-2 bg-[#2c49c7]  ">
                {/* <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/mine')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  storke-white  cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg> */}
                <div className='text-xs p-[0.5px]'>Amount Payable</div>
                <div className='p-[0.5px] text-3xl font-semibold'>&#8377; {recharge_value}</div>
            </div>

            <div className="options items-start justify-center text-white flex flex-col pt-4 pb-4 mx-3 pl-2 bg-white border-gray-200 border-[1px] rounded-lg mt-4  ">
                <div className='font-semibold text-gray-500 py-2 text-center w-full'>Scan this QR to pay</div>
                <div className=' text-gray-400 font-semibold py-2 text-center w-full px-4'>
                    or take a screenshot and save then open payment app to scan
                </div>
                <div className='font-semibold text-red-500 py-2 text-center w-full'>or directly transfer to under UPI</div>
                <div className="flex gap-2 items-center w-full justify-center px-4">
                    <div className='border-gray-400 border-[1px] rounded-lg bg-gray-100 py-3 px-2 w-3/4 text-gray-600'>
                        ${amountDetails.upi_id}
                    </div>
                    <CopyToClipboard text={`${amountDetails.upi_id}`} onCopy={() => toaster('copy succeded')}>
                        <div
                            className='w-1/4 text-sm px-2 text-center py-3 text-blue-800 cursor-pointer border border-blue-800 rounded-md'>
                            Copy</div>
                    </CopyToClipboard>

                </div>
                <div className='flex flex-col px-4 gap-1 border-b border-gray-100'>
                    {/* <div className='text-sm border-y-2 border-gray-50 py-3 tl'><span >Step 2: Submit Ref No/Reference No/UTR </span></div> */}
                    <input value={refno} onChange={e => setRefno(e.target.value)} type="text" 
                    placeholder='Input 12-digit here' className=' tp pt-4' />
                    <div className='tt text-xs mb-3'>Generally, your transfer will be confirmed within 10 minutes.</div>
                </div>
            </div>

            {/* <div className='flex flex-col items-center gap-1 mt-4'>
                <CopyToClipboard text={`${recharge_value}`} onCopy={() => toaster('copy')}>
                    <div className='mb-1 text-xs text-gray-600 font-semibold'>click the amount to copy</div>
                </CopyToClipboard>
                <div className='text-6xl font-bold'>&#8377; {recharge_value}.00</div>
                <div className='text-md'><span className='text-gray-400 font-semibold mr-2 pt-4'>Serial No.</span> 1643489836485865684</div>
            </div> */}

            {/* <div className='flex flex-col p-2 gap-1 border-b border-gray-100'>
                <div className='text-sm border-y-2 border-gray-50 py-3 tl'><span >Step 1: Transfer</span><span className='text-[#d375de] ml-2'>&#8377; {recharge_value}.00 to the following upi</span></div>
                <div className="flex flex-col items-center w-full">
                    <div className='text-center bg-[#f5f8c2] py-3 mt-1 text-lg mb-4 w-full'>{amountDetails.upi_id}</div>
                    <CopyToClipboard text={`${amountDetails.upi_id}`} onCopy={() => toaster('copy')}>
                        <div className='text-sm px-3 py-1 text-red-800 cursor-pointer border border-red-800 rounded-md'>Copy Beneficiary UPI</div>
                    </CopyToClipboard>
                </div>
                <div className='tt mb-1 mt-3'>1. Open your UPI wallet and complete the transfer </div>
                <div className='tt'>2. Record your reference No.(Ref No.) after payment</div>
            </div> */}

            {/* <div className='flex flex-col px-2 gap-1 border-b border-gray-100'>
                <div className='text-sm border-y-2 border-gray-50 py-3 tl'><span >Step 2: Submit Ref No/Reference No/UTR </span></div>
                <input value={refno} onChange={e => setRefno(e.target.value)} type="text" placeholder='Input 12-digit here' className=' tp pt-4' />
                <div className='tt ml-2 mb-3'>Generally, your transfer will be confirmed within 10 minutes.</div>
            </div> */}

            <div className='flex flex-col px-4 gap-2 py-2 border-[1px] border-gray-200 mx-3 mt-2 rounded-lg bg-white pb-[100px]'>
                <div className='tt mb-1 mt-1'>Where to find Ref No.</div>
                <img src={img1} alt="img1" />
                <img src={img2} alt="img1" />
                <img src={img3} alt="img1" />
                <img src={img4} alt="img1" />
                <img src={img5} alt="img1" />
                <img src={img6} alt="img1" />
            </div>

            <div className="fixed bottom-0 border-t border-confirm w-full bg-[#f7f7fa] ">
                <button onClick={handleRecharge} className='bg-confirm py-2 text-white text-lg w-full rounded-md my-5'>Submit Ref. Number</button>
            </div>

        </div>
    )
}

export default RechargeWindow;