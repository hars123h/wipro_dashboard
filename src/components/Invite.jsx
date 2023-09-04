import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useState, useLayoutEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from "react-qr-code";
import { useContext } from 'react';
import { AmountContext } from '../App';
import axios from 'axios';
import BASE_URL from '../api_url';

//#df1f26
const Invite = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const amountDetails = useContext(AmountContext);
    const [cb, setCb] = useState({
        value: '',
        copied: false
    });
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');

    const toaster = (text) => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(() => {
            setToasterShow(false);
            //navigate('/mine');
        }, 5000);
    }

    const getUserDetails = async () => {
        const details = await axios.post(`${BASE_URL}/get_user`, { user_id: localStorage.getItem('uid') })
            .then(({ data }) => data);
        setUserDetails(details);
    }

    useLayoutEffect(() => {
        document.body.style.backgroundColor = "#b2e7e4";
        getUserDetails();
        setLoading(false);
    }, []);

    if (loading || userDetails === null) {
        return (
            <div className=' bg-red-800  flex flex-col text-white font-light  relative'>
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
                    <div className='flex-grow text-md font-semibold'>Invitation</div>
                    <div className=" font-bold text-sm text-confirm">Records</div>
                </div>

                <div className="flex flex-col py-5 text-black  justify-center items-center gap-2 bg-white mx-2 rounded-md text-sm mt-4">
                <div className='flex flex-col gap-1 items-center p-2'>
                    <div className='text-lg'>Invitation code</div>
                    <div className='font-bold font-md'>{''}</div>
                </div>

                <div className='flex flex-col gap-1 items-center p-2'>
                    <div className='text-sm font-semibold'>invite link</div>
                    <div className='font-md border-black border-opacity-95 border-[0.5px] p-1 w-[60%] break-words text-center'>
                        {`https://www.voitelshkxuv.site/register/invite_code/${''}`}
                    </div>
                    
                </div>
            </div>
            </div>
        )
    }
    //[#2e9afe]
    return (
        <div className=' bg-red-800  flex flex-col text-white font-light relative'>
            {toasterShow ? <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-2 bg-black opacity-80 text-white px-2 py-1 rounded-md'>
                    <div>{toasterText}</div>
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
                <div className='flex-grow text-md font-semibold'>Invitation</div>
                <div className=" font-bold text-sm text-confirm">Records</div>
            </div>

            <div className="flex flex-col py-5 text-black  justify-center items-center gap-2 bg-white mx-2 rounded-md text-sm mt-4">
                <div className='flex flex-col gap-1 items-center p-2'>
                    <div className='text-lg'>Invitation code</div>
                    <div className='font-bold font-md'>{userDetails.user_invite}</div>
                </div>

                <div className='flex flex-col gap-1 items-center p-2'>
                    <div className='text-sm font-semibold'>invite link</div>
                    <div className='font-md border-black border-opacity-95 border-[0.5px] p-1 w-[60%] break-words text-center'>
                        {`https://www.voitelshkxuv.site/register/invite_code/${userDetails.user_invite}`}
                    </div>
                    <CopyToClipboard text={`https://www.voitelshkxuv.site/register/invite_code/${userDetails.user_invite}`} onCopy={() => toaster('copy succeded')}>
                        <span className='w-[80%] text-lg mt-4 py-2 rounded-full font-semibold text-center bg-confirm text-white p-2'>copy invitation link</span>
                    </CopyToClipboard>
                </div>
            </div>

            {/* <div className="info  sm:text-xs md:text-md flex flex-col gap-2 rounded-lg bg-white mt-5">
                <div className='text-left bg-red-800 font-semibold rounded-t-lg text-white text-lg border-b pl-2 py-2 border-red-800'>Invitation Rewards:</div>
                <span className='p-2 text-black font-semibold text-sm'>
                    Level 1 = <span className='text-red-600'> 20%</span>
                    <br />
                    Level 2 = <span className='text-red-600'> 3%</span>
                    <br />
                    Level 3 = <span className='text-red-600'> 2%</span>
                </span>
            </div> */}

            {/* <div className="flex gap-2 mt-[40px]">

                <div className="info w-1/2 p-3 sm:text-xs md:text-md flex flex-col rounded-2xl bg-white text-black font-bold mt-5">
                    <div className='font-bold text-sm'>Invitation Link</div>
                    <div className='py-1 px-1 text-xs rounded-md border overflow-hidden border-red-800 mt-2'>{`https://www.electricboat4s.website/register/invite_code/${userDetails.user_invite}`}</div>
                    <CopyToClipboard text={`https://www.electricboat4s.website/register/invite_code/${userDetails.user_invite}`} onCopy={() => toaster('copy success')}>
                        <span className='w-[80px] text-sm text-center bg-red-800 text-white p-2'>copy</span>
                    </CopyToClipboard>
                </div>

                <div className="info w-1/2 p-3 sm:text-xs md:text-md flex flex-col rounded-2xl bg-white text-black font-bold mt-5">
                    <div className='font-bold text-sm'>Invitation code</div>
                    <div className='py-1 px-1 text-xs rounded-md border border-red-800 mt-2'>{userDetails.user_invite}</div>
                    <CopyToClipboard text={userDetails.user_invite} onCopy={() => toaster('copy success')}>
                        <span className='w-[80px] text-sm text-center bg-red-800 text-white p-2'>copy</span>
                    </CopyToClipboard>
                </div>
            </div> */}


            {/* <div className="qr mx-auto flex flex-col justify-center items-center mt-1 p-1 bg-red-800 rounded-md">
                <QRCode
                    size={140}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={`https://www.electricboat4s.website/register/invite_code/${userDetails.user_invite}`}
                    viewBox={`0 0 120 120`}
                />
                <div className='text-red-800 font-extrabold text-center mt-1'>QR code</div>
            </div> */}
        </div>
    )
}

export default Invite