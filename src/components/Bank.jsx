import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import BASE_URL from '../api_url';

const Bank = () => {
    const navigate = useNavigate();
    const loc = useLocation();
    console.log(loc,'loc');
    const auth = getAuth();
    const [details, setDetails] = useState({
        fullName: '',
        phoneNo: '',
        bankAccount: '',
        bankName: '',
        ifsc: '',
    });
    const [wpwd, setPwd] = useState('');
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');

    const getUserData = async () => {
        const docRef = await axios.post(`${BASE_URL}/get_user`, { user_id: localStorage.getItem('uid') }).then(({ data }) => data);
        if (docRef) {
            setDetails(docRef.bank_details);
            //console.log(docRef.bank_details);
        }
    }
    useEffect(() => {
        getUserData();
    }, []);



    const toaster = (text) => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(() => {
            setToasterShow(false);
            navigate('/mine');
        }, 5000);
    }



    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        });
        //console.log(details);
    }

    const handleSubmit = async () => {
        if (loc.state.withdrawalPassword === wpwd) {
            await axios.post(`${BASE_URL}/bank_details`, { user_id: localStorage.getItem('uid'), bank_details: details })
                .then(() => {
                    toaster('Bank details added successfully!');
                })
                .catch(() => console.log('Some error Occured')
                );
        } else {
            toaster('Incorrect withdrawal password!');
        }
    }
    //[#2e9afe]
    return (
        <div className='bg-red-800 h-screen  sm:h-[700px] md:h-[950px] relative'>
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
                <div className='flex-grow text-md font-semibold'>Bind Bank Account</div>
                <div className=" font-bold text-sm text-confirm">Records</div>
            </div>
            {/* #757575 */}

            <div className="flex flex-col gap-2 bg-white mx-2 rounded-md text-sm mt-4">
                <div className="flex flex-row items-center p-3 gap-3 border-b-[0.5px] border-gray-50">
                    <div className='text-gray-400 w-[20%]' >Realname</div>
                    <div>
                        <input type="text" onChange={handleChange} className='outline-none' name='fullName' value={details.fullName} />
                    </div>
                </div>

                <div className="flex flex-row items-center p-3 gap-3 border-b-[0.5px] border-gray-50">
                    <div className='text-gray-400 w-[20%]'>Bank</div>
                    <div>
                        <input type="text" onChange={handleChange} name='phoneNo' value={details.phoneNo}  className='outline-none' />
                    </div>
                </div>

                <div className="flex flex-row items-center p-3 gap-3 border-b-[0.5px] border-gray-50">
                    <div className='text-gray-400 w-[20%]'>Name</div>
                    <div>
                        <input type="text"  className='outline-none' onChange={handleChange} name='bankName' value={details.bankName} />
                    </div>
                </div>

                <div className="flex flex-row items-center p-3 gap-3 border-b-[0.5px] border-gray-50">
                    <div className='text-gray-400 w-[20%]'>Account</div>
                    <div>
                        <input type="text"  className='outline-none' onChange={handleChange} name='bankAccount' value={details.bankAccount} />
                    </div>
                </div>

                <div className="flex flex-row items-center p-3 gap-3 border-b-[0.5px] border-gray-50">
                    <div className='text-gray-400 w-[20%]'>IFSC</div>
                    <div>
                        <input type="text" className='outline-none'  onChange={handleChange} name='ifsc' value={details.ifsc}/>
                    </div>
                </div>

                <div className="flex flex-row items-center p-3 gap-3 border-b-[0.5px] border-gray-50">
                    <div className='text-gray-400 w-[40%]'>withdrawal password</div>
                    <div>
                        <input type="text" className='outline-none'  onChange={(e) => setPwd(e.target.value)} name='wpwd' value={wpwd}/>
                    </div>
                </div>
            </div>
            
            {/* <div className="box mx-3 bg-white text-black p-2  mt-1 gap-1 flex flex-col">
                <div className='flex gap-2 items-center bg-[#f9f9f9] rounded-sm  text-[15px] p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={handleChange} name='fullName' value={details.fullName}
                        className='outline-none text-bank_color font-semibold  w-full bg-inherit placeholder-gray-500' placeholder='Full name' />
                </div>

                <div className='flex gap-2 items-center bg-[#f9f9f9] text-[15px] p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={handleChange} name='phoneNo' value={details.phoneNo}
                        className='outline-none text-bank_color font-semibold w-full bg-inherit placeholder-gray-500' placeholder='Phone number' />
                </div>

                <div className='flex gap-2 items-center bg-[#f9f9f9] text-[15px] p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={handleChange} name='bankAccount' value={details.bankAccount}
                        className='outline-none text-bank_color font-semibold w-full bg-inherit placeholder-gray-500' placeholder='Bank Account' />
                </div>

                <div className='flex gap-2 items-center bg-[#f9f9f9] text-[15px] p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={handleChange} name='bankName' value={details.bankName}
                        className='outline-none text-bank_color font-semibold w-full bg-inherit placeholder-gray-500' placeholder='Bank name' />
                </div>

                <div className='flex gap-2 items-center bg-[#f9f9f9] text-[15px] p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={handleChange} name='ifsc' value={details.ifsc}
                        className='outline-none text-bank_color font-semibold w-full bg-inherit placeholder-gray-500' placeholder='IFSC' />
                </div>

                <div className='flex gap-2 items-center bg-[#f9f9f9] text-[15px] p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={(e) => setPwd(e.target.value)} name='wpwd' value={wpwd}
                        className='outline-none text-bank_color font-semibold  w-full bg-inherit placeholder-gray-500' placeholder='Withdrawal password' />
                </div>
            </div> */}

            <div className='mb-[1000px] mx-4'>
                <button onClick={handleSubmit} 
                className='bg-confirm text-white text-lg mt-5 mb-20 block w-full py-2 rounded-full'>
                Submit</button>
            </div>
        </div>
    )
}

export default Bank