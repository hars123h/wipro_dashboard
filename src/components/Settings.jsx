import React from 'react';
import setting_bank from '../images/setting_bank.png';
import setting_pwd from '../images/setting_pwd.png';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactModal from 'react-modal';
import { useState } from 'react';

const customStyles2 = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none',
        padding: 0,
        width: '80%'
    },
};

const Settings = () => {

    const navigate = useNavigate();
    const [logout_popup, setLogout_popup] = useState(false);
    const loc = useLocation();
    //console.log(loc);

    const handleSignOut = () => {
        localStorage.clear();
        navigate('/login');
    }

    //[#2e9afe]
    return (
        <div className='bg-red-800 h-screen'>
            <div>
                <ReactModal
                    isOpen={logout_popup}
                    style={customStyles2}
                    contentLabel="Notice"
                    ariaHideApp={false}
                >
                    <div className='w-full  shadow-xl z-10 border border-gray-200'>
                        <div className='flex gap-2 flex-col bg-white w-full '>
                            <div className=' text-lg px-3  py-3'>Are you sure to log out?</div>
                            <div className="flex text-blue-400 justify-end">
                                <div className='text-center w-[80px]  text-gray-400   font-semibold p-2'
                                    onClick={(e) => {
                                        setLogout_popup(false);
                                    }}>
                                    no
                                </div>
                                <div className='text-center w-[80px]  font-semibold p-2'
                                    onClick={(e) => {
                                        setLogout_popup(false);
                                        handleSignOut();
                                    }}>
                                    Ok
                                </div>

                            </div>
                        </div>
                    </div>
                </ReactModal>
            </div>
            <div className="options text-center  text-recharge-bg flex justify-between  bg-confirm text-md  font-normal mb-2 py-3 items-center px-2">
                <div className="flex items-center font-bold">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/mine')}
                            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className="w-4 h-4   storke-white  cursor-pointer stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    <span className='text-sm'>back</span>
                </div>
                <div className='flex-grow text-md font-semibold'>Security Settings</div>
                <div className=" font-bold text-sm text-confirm">Records</div>
            </div>

            {/* [#4daaff] */}
            <div className="box mt-6 bg-white mx-3 rounded-lg pb-4">

                <div
                    onClick={() => navigate('/change_login_password', { state: { withdrawalPassword: loc.state.withdrawalPassword, loginPassword: loc.state.loginPassword } })} className='flex gap-2 items-center text-black  font-semibold text-md p-3 m-1 border-b border-gray-200 cursor-pointer'>
                    {/* <div><img src={setting_pwd} alt="bnk_pwd" width={18} /></div> */}
                    <div className='flex-grow flex justify-between items-center'>
                        <div className='font-normal text-sm'>Modify login password</div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 stroke-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => navigate('/change_withdrawal_password', { state: { withdrawalPassword: loc.state.withdrawalPassword, loginPassword: loc.state.loginPassword } })} className='flex gap-2 items-center text-black  font-semibold text-md p-3 m-1 border-b border-gray-200 cursor-pointer'>
                    {/* <div><img src={setting_pwd} alt="bnk_pwd" width={18} /></div> */}
                    <div className='flex-grow flex justify-between items-center'>
                        <div className='font-normal text-sm'>Modify payment password</div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 stroke-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => navigate('/bank', { state: { withdrawalPassword: loc.state.withdrawalPassword, loginPassword: loc.state.loginPassword } })} className='flex gap-2 items-center text-black  font-semibold text-md p-3 m-1 border-b border-gray-200 cursor-pointer'>
                    {/* <div><img src={setting_bank} alt="bnk_img" width={18} /></div> */}
                    <div className='flex-grow flex justify-between items-center'>
                        <div className='font-normal text-sm'>Bind bank account</div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 stroke-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div onClick={() => setLogout_popup(true)} className="flex flex-row justify-center text-xl
               w-[80%] mx-auto py-2 mt-5 text-center rounded-full bg-confirm  text-white font-semibold text-opacity-80">
                    <div>Sign out</div>
                </div>
            </div>



        </div>
    )
}

export default Settings