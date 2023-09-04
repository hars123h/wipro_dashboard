import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import referralCodeGenerator from 'referral-code-generator'
import db from '../firebase/config.js';
import { setDoc, doc, updateDoc, query, collection, where, getDocs, getDoc, arrayUnion, increment } from "firebase/firestore";
import { useContext } from 'react';
import { AmountContext } from '../App';
import close_eye from '../images/close_eye.png';
import { RotatingLines } from 'react-loader-spinner';
import apache_logo from '../images/apache_logo.png';
import BASE_URL from '../api_url.js';
import axios from 'axios';
import amaz_logi from '../images/amaz_logi.png';
import { PhoneAndroid, VerifiedUserOutlined, LockOutlined } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import wind_login from '../images/wind_login.jpg'
import lenskart_logo from '../images/lenskart_logo.png';
import tuborg_logo from '../images/tuborg_logo.svg';
import jio from '../images/asml/jio.png';
import jlogo from '../images/asml/jlogo.jpg';
import boat_logo from '../images/asml/boat/boat_logo.jpg';
import register_logo from '../images/dj/register_logo.png';
import mobile from '../images/dj/mobile.png';
import password from '../images/dj/password.png';
import info from '../images/dj/info.png';


const Register = () => {

    const navigate = useNavigate();
    const auth = getAuth();
    const [otp, setOtp] = useState('');
    const [otpfield, setOTPfield] = useState('');
    const [mobno, setMobno] = useState('');
    const [pwd, setpwd] = useState('');
    const [cpwd, setCpwd] = useState('');
    const [wpwd, setwpwd] = useState('');
    const [invt, setInvt] = useState('');
    const amountDetails = useContext(AmountContext);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('Loading');
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

    useEffect(() => {
        document.body.style.backgroundColor = "#b2e7e4";
    }, []);

    const validatePassword = password => /[a-zA-Z]/.test(password) && /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);

    const handleRegister = async () => {

        if (mobno.length != 10) {
            toaster('Invalid Mobile Number');
            return;
        }

        if (pwd !== cpwd) {
            toaster('Passwords do not match!');
            return;
        }

        if (pwd.length < 6) {
            toaster('Password must contain at least 6 characters!');
            return;
        }

        if (validatePassword(pwd) === false) {
            toaster('Password must contain letters and numbers or special symbols');
            return;
        }

        // if (otp !== otpfield) {
        //     toaster('Wrong OTP entered!');
        //     return;
        // }
        //console.log({ mobno, pwd, cpwd, wpwd, invt });
        setLoading(true);
        await axios.post(`${BASE_URL}/register`, { mobno, pwd, wpwd, invt })
            .then(({ data }) => {
                if (data.message === 'Mobile Number already registered!') {
                    setText('Mobile Number already registered!');
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                } else if (data.message === 'invalid invite code') {
                    setText('invalid invite code!');
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                } else {
                    setText('registration success');
                    localStorage.setItem('uid', data.user_id);
                    setMobno('');
                    setpwd('');
                    setCpwd('');
                    setwpwd('');
                    setInvt('');
                    setTimeout(() => {
                        navigate('/login');
                        setLoading(false);
                    }, 2000);
                }
            })
            .catch((error) => {
                toaster('Something went wrong');
                console.error(error);
            });
    }

    const handleOTPSend = (otpGenerated) => {
        //console.log(referralCodeGenerator.alpha('lowercase', 6));
        if (mobno.length !== 10) {
            toaster('Invalid Mobile Number');
            return;
        }
        setOTPfield(otpGenerated)
        fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=27b58V4YOqBDMgWvNjapz1k9IHlrJfynC6w0hceRAZGoLimK3PuJC7OoiV4N2B6DjfwWKzb0lhgEetPH&variables_values=${otpGenerated}&route=otp&numbers=${mobno}`)
            .then((response) => {
                //console.log(response);
                toaster('OTP sent successfully');
            })
            .catch(error => toaster('Something went wrong'));
    }
    //[#0096D5]
    return (
        <div className='relative bg-red-800'>
            {toasterShow ? <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-2 items-center justify-center bg-black py-[10px] px-4  rounded-[4px] opacity-80 text-white '>
                    <div>{toasterText}</div>
                </div>
            </div> : null}
            {loading ? <div className='flex gap-2 items-center mt-[5px] justify-center bg-black text-white py-[10px] px-4  rounded-[4px] opacity-70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                {text === 'Loading' ? <div>
                    <RotatingLines strokeColor='white' width='16' />
                </div> : null}
                <div className='text-[16px]'>{text}</div>
            </div> : null}
            <div className='flex items-center text-center bg-red-800 font-sans text-white pt-2 text-lg pb-2'>
                <div className="flex flex-row items-center absolute left-2" onClick={() => navigate('/login')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>

                    <div className='text-gray-500 font-300 text-sm'>Back</div>
                </div>
                <div className='flex-grow font-[400] text-white'>Sign up</div>
            </div>
            <div className='text-center'>
                <img src={register_logo} alt="hp_logo" className='m-auto md:w-2/6 sm:w-1/6 mt-24 mb-2 ' width={"50%"} />
            </div>
            <div className=" box mb-20 gap-2 m-auto  rounded-xl lg:w-2/5 w-[95%] p-4 flex flex-col">
                <div className='outline-none flex items-center justify-between mb-2 rounded-md bg-white'>
                    <div className='flex flex-row text-xs items-center py-[10px] w-[35%] gap-2 justify-center'>
                        <div>
                            <img src={mobile} className='w-5 h-5' />
                        </div>
                        <div>+</div>
                        <div>91 <span className='ml-1'>|</span></div>
                    </div>
                    <div className='w-full flex flex-row items-center cstm_b rounded-md px-2 bg-white'>
                        <input value={mobno} onChange={e => setMobno(e.target.value)} type="text"
                            className=' px-[1px] py-[10px] outline-none rounded-md placeholder-gray-600 placeholder:text-[14px]' placeholder='please enter mobile number' name="phoneno" id="phoneno" />
                    </div>
                </div>

                <div className='outline-none flex items-center justify-between mb-2 rounded-md bg-white'>
                    <div className='flex flex-row items-center py-[10px] w-[10%] gap-2 justify-center'>
                        <div>
                            <img src={password} className='w-7 h-7' />
                        </div>
                    </div>
                    <div className='w-full flex flex-row items-center cstm_b rounded-md px-2 bg-white'>
                        <input value={pwd} onChange={e => setpwd(e.target.value)} type="text"
                            className=' px-[1px] py-[10px] w-full outline-none rounded-md placeholder-gray-600 placeholder:text-[14px]' placeholder='please enter login password' name="password" id="pass" />
                    </div>
                </div>

                <div className='outline-none flex items-center justify-between mb-2 rounded-md bg-white'>
                    <div className='flex flex-row items-center py-[10px] w-[10%] gap-2 justify-center'>
                        <div>
                            <img src={password} className='w-7 h-7' />
                        </div>
                    </div>
                    <div className='w-full flex flex-row items-center cstm_b rounded-md px-2 bg-white'>
                        <input value={cpwd} onChange={e => setCpwd(e.target.value)} type="text"
                            className=' px-[1px] py-[10px]  w-full outline-none rounded-md placeholder-gray-600 placeholder:text-[14px]' placeholder='please confirm the login password' name="cnfpass" id="cnfpass" />
                    </div>
                </div>

                <div className='outline-none flex items-center justify-between mb-2 rounded-md bg-white'>
                    <div className='flex flex-row items-center py-[10px] w-[10%] gap-2 justify-center'>
                        <div>
                            <img src={password} className='w-7 h-7' />
                        </div>
                    </div>
                    <div className='w-full flex flex-row items-center cstm_b rounded-md px-2 bg-white'>
                        <input value={wpwd} onChange={e => setwpwd(e.target.value)} type="text"
                            className=' px-[1px] py-[10px] w-full outline-none rounded-md placeholder-gray-600 placeholder:text-[14px]' placeholder='please enter the Withdrawal password' name="withpassword" id="wthpass" />
                    </div>
                </div>

                <div className='outline-none flex items-center justify-between mb-2 rounded-md bg-white'>
                    <div className='flex flex-row items-center py-[10px] w-[10%] gap-2 justify-center'>
                        <div>
                            <img src={info} className='w-7 h-7' />
                        </div>
                    </div>
                    <div className='w-full flex flex-row items-center cstm_b rounded-md px-2 bg-white'>
                        <input value={invt} onChange={e => setInvt(e.target.value)} type="text"
                            className=' px-[1px] py-[10px] outline-none rounded-md placeholder-gray-600 placeholder:text-[14px]' placeholder='Invitation code' name="invite_code" id="inv_code" />
                    </div>
                </div>

                <button onClick={handleRegister} className='bg-[#63d0d7] text-white text-center py-[10px]  rounded-md text-md mt-5'>Sign Up</button>
                {/* <div onClick={() => navigate('/login')} className='cursor-pointer text-center text-red-800  p-[7px] mb-2 bg-white  rounded-full border border-gray-200'>
                    Already have an account, log in
                </div> */}
            </div>
        </div>
    )
}

export default Register