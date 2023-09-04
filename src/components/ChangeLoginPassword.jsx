import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import BASE_URL from '../api_url';



const ChangeLoginPassword = () => {
    const navigate = useNavigate();
    const loc = useLocation();
    // console.log(loc.state);
    const auth = getAuth();
    const [oldpwd, setOldpwd] = useState('');
    const [newpwd, setNewpwd] = useState('');
    const [cnfNewPwd, setCnfNewPwd] = useState('');
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');

    const toaster = (text) => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(() => {
            setToasterShow(false);
            navigate('/mine');
        }, 5000);
    }

    const handleReset = async () => {
        if (loc.state.loginPassword === oldpwd && newpwd === cnfNewPwd) {
            await axios.post(`${BASE_URL}/reset_login_password`, { user_id: localStorage.getItem('uid'), new_pwd: newpwd })
                .then(() => {
                    setCnfNewPwd(''); setNewpwd(''); setOldpwd('');
                    toaster('Password reset successfully!');
                }).catch(error => {
                    console.log('Could Not Update the passwored', error);
                    toaster('Please login again and retry to reset the password!');
                });
        } else {
            toaster('Password entered is incorrect or passwords do not match!');
        }
    }

    //[#2e9afe]
    return (
        <div className='bg-red-800 h-screen sm:h-[700px] md:h-[950px] relative'>
            {toasterShow ? <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-2 bg-black opacity-80 text-white px-2 py-1 rounded-md'>
                    <div>{toasterText}</div>
                </div>
            </div> : null}

            <div className="options text-center  text-recharge-bg flex justify-between  bg-confirm text-md  font-normal mb-2 py-3 items-center px-2">
                <div className="flex items-center font-bold">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/settings', { state: { withdrawalPassword: loc.state.withdrawalPassword, loginPassword: loc.state.loginPassword } })}
                            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className="w-4 h-4   storke-white  cursor-pointer stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    <span className='text-sm'>back</span>
                </div>
                <div className='flex-grow text-md font-semibold'>Retrieve Password</div>
                <div className=" font-bold text-sm text-confirm">Records</div>
            </div>

            {/* <div className='flex gap-2 items-center  text-md  p-1 text-sm bg-recharge-bg text-gray-500 font-semibold m-1 shadow-sm shadow-gray-50  '>
                Please enter the New Password
            </div> */}

            {/* <div className="box mt-6 bg-white mx-3 rounded-lg pb-4">


            </div> */}


            {/* [#61b2ff]  */}
            <div className="flex flex-col gap-1 bg-white mx-2 rounded-md text-sm mt-4">
                <div className="flex flex-row items-center p-3 gap-3 border-b-[0.5px] border-gray-50">
                    <div className='text-gray-400 w-[40%]' >old login password</div>
                    <input type="text" value={oldpwd} onChange={e => setOldpwd(e.target.value)}
                        className='outline-none' placeholder='Old Login Password' />
                </div>

                <div className="flex flex-row items-center p-3 gap-3 border-b-[0.5px] border-gray-50">
                    <div className='text-gray-400 w-[40%]' >new login password</div>
                    <input type="text" value={newpwd} onChange={e => setNewpwd(e.target.value)}
                        className='outline-none' placeholder='new login password Password' />
                </div>

                <div className="flex flex-row items-center p-3 gap-3 border-b-[0.5px] border-gray-50">
                    <div className='text-gray-400 w-[40%]' >confirm password</div>
                    <input type="text" value={cnfNewPwd} onChange={e => setCnfNewPwd(e.target.value)}
                        className='outline-none' placeholder='confirm new password' />
                </div>                
            </div>

            <div className='mx-4'>
                <button onClick={handleReset} 
                className='bg-confirm text-white text-lg mt-8 mb-20 rounded-full block w-full py-3'>Submit</button>
            </div>
        </div>
    )
}

export default ChangeLoginPassword;