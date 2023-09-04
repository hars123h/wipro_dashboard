import React from 'react';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, Timestamp, updateDoc } from 'firebase/firestore';
import db from '../firebase/config.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AmountContext } from '../App.js';
import DateDifference from '../utility/DateDifference.js';
import ReactModal from 'react-modal';
import axios from 'axios';
import BASE_URL from '../api_url.js';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


const Withdrawal = () => {

    const navigate = useNavigate();
    const loc = useLocation();
    const auth = getAuth();
    const amountDetails = useContext(AmountContext)
    const [otp, setOtp] = useState('');
    const [otpfield, setOTPfield] = useState('');
    const [balance, setBalance] = useState(0);
    const [wpassword, setWpassword] = useState('');
    const [wamount, setWamount] = useState(0);
    const [diffDays, setDiffDays] = useState(0);
    // const [btnActive, setBtnActive] = useState(true);
    const [details, setDetails] = useState({
        fullName: '',
        phoneNo: '',
        bankAccount: '',
        bankName: '',
        ifsc: '',
    });
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);

    const toaster = (text, arg = '') => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(() => {
            setToasterShow(false);
            if (arg === '/record') {
                setIsOpen(false);
                navigate('/record');
            }
            if (arg === '/bank') {
                navigate('/bank', { state: { withdrawalPassword: loc.state.withdrawalPassword, loginPassword: loc.state.loginPassword } });
            }
        }, 2000);
    }

    useEffect(() => {
        const getDetails = async () => {
            const docRef = await axios.post(`${BASE_URL}/get_user`, { user_id: localStorage.getItem('uid') }).then(({ data }) => data);
            if (docRef) {
                if (docRef.bank_details.bankAccount.length === 0) {
                    toaster('Unbound bank card, go to bind!', '/bank');
                } else {
                    setDetails(docRef.bank_details);
                    docRef.balance ? setBalance(docRef.balance) : setBalance(0);
                    setDiffDays(DateDifference(new Date(docRef.lastWithdrawal), new Date()));
                }
            } else {
                console.log('Something went wrong');
            }
        }
        getDetails();
        document.body.style.backgroundColor = "#b2e7e4";

    }, []);


    const handleWithdrawalAmount = (e) => {
        setWamount(e.target.value);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const handleWithdrawal = async () => {

        if (Number(wamount) === false || Number(wamount) <= 0) {
            toaster('Enter a valid number');
            return;
        }

        if ((Number(wamount)) < Number(amountDetails.mwamount)) {
            //console.log((Number(wamount)+Number(amountDetails.withdrawal_fee)), Number(amountDetails.mwamount));
            toaster(`Amount should be greater than ${amountDetails.mwamount}`);
            //console.log(wamount, amountDetails.amount);
            return;
        }

        if ((Number(wamount) > 50000)) {
            toaster('Amount should not be greatr than Rs 50,000');
            return;
        }

        if (((Number(wamount)) > Number(balance))) {
            toaster('You dont have enough balance');
            return;
        }
        //&& otp === otpfield
        if (wpassword === loc.state.withdrawalPassword) {
            try {
                //const docRef1 = 
                var temp_details = details;
                delete temp_details._id;
                await axios.post(`${BASE_URL}/place_withdrawal`, {
                    withdrawalAmount: (Number(wamount)),
                    ...temp_details,
                    afterDeduction: (Number(wamount) - (Number(amountDetails.withdrawal_fee) * Number(wamount) / 100)),
                    user_id: localStorage.getItem('uid'),
                    time: new Date(),
                    balance: balance,
                    status: 'pending'
                }).then(() => {
                    toaster('Withdrawal request placed successfully!', '/record');
                    setIsOpen(false);
                }).catch(e => {
                    console.log(e);
                })

            } catch (e) {
                console.error("Error adding document: ", e);

            }
        } else {
            toaster('Withdrawal Password is incorrect');
            //console.log(wpassword, loc.state.withdrawalPassword);
        }

    }

    const handleOTPSend = (otpGenerated) => {


        setOTPfield(otpGenerated);
        //console.log(otpGenerated);
        fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=27b58V4YOqBDMgWvNjapz1k9IHlrJfynC6w0hceRAZGoLimK3PuJC7OoiV4N2B6DjfwWKzb0lhgEetPH&variables_values=${otpGenerated}&route=otp&numbers=${details.phoneNo}`)
            .then((response) => {
                //console.log(response);
                toaster('OTP sent successfully');
            })
            .catch(error => toaster('Something went wrong'));
    }

    const handleWithdrawalAll = () => {
        document.getElementById('withdrawal_field').value = Math.floor(balance);
        setWamount(Math.floor(balance));
    }

    const isBetween = () => {
        var startTime = '8:00:00';
        var endTime = '18:00:00';

        var currentDate = new Date()

        var startDate = new Date(currentDate.getTime());
        startDate.setHours(startTime.split(":")[0]);
        startDate.setMinutes(startTime.split(":")[1]);
        startDate.setSeconds(startTime.split(":")[2]);

        var endDate = new Date(currentDate.getTime());
        endDate.setHours(endTime.split(":")[0]);
        endDate.setMinutes(endTime.split(":")[1]);
        endDate.setSeconds(endTime.split(":")[2]);


        var valid = startDate < currentDate && endDate > currentDate;
        //console.log(valid);
        return valid;
    }

    const handleLastButton = () => {
        openModal();
    }
    //[#2e9afe]
    return (
        <div className='bg-red-800 flex flex-col  sm:h-[1000px] md:h-[950px] relative'>
            {toasterShow ? <div className='absolute top-1/2 w-full left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-2 bg-black opacity-80 text-white mx-auto w-4/5 px-2 py-1 rounded-md'>
                    <div className='text-center w-full'>{toasterText}</div>
                </div>
            </div> : null}
            <div>
                <ReactModal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    contentLabel="Are You Sure"
                    ariaHideApp={false}

                >
                    <h1 className='text-gray-600 mb-3 text-xl'>Are you Sure?</h1>
                    <div>
                        <button onClick={() => handleWithdrawal()} className='bg-red-800 text-white px-2 py-1 rounded-lg shadow-md w-[64px]'>Yes</button>
                        <button onClick={() => setIsOpen(false)} className='bg-red-800 text-white px-2 py-1 rounded-lg shadow-md w-[64px] ml-2'>cancel</button>
                    </div>
                </ReactModal>
            </div>

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
                <div className='flex-grow text-md font-semibold'>Withdrawal</div>
                <div className=" font-bold text-sm">Records</div>
            </div>

            {/*| After Deduction} | Rs.{(Number(wamount) - (Number(amountDetails.withdrawal_fee) * Number(wamount) / 100))}*/}

            <div className="part1 bg-white p-3 rounded-lg mx-3 mt-3">
                {/* #87a1c3  border-[#87a1c3]*/}
                <div className='text-md text-black font-bold py-2'>
                    <div>Bank account</div>
                </div>

                <div className="balance flex items-center justify-between text-gray-600 text-md p-2 border-b border-gray-200">
                    <div className="bnkac text-[15px] text-gray-600">Bank :</div>
                    <div className='text-gray-400 text-sm'>{details.bankAccount}</div>
                </div>

                <div className="balance flex items-center justify-between text-gray-600 text-md p-2 border-b border-gray-200">
                    <div className="bnkac text-[15px] text-gray-600">RealName:</div>
                    <div className='text-gray-400 text-sm'>{details.fullName}</div>
                </div>

                <div className="balance flex items-center justify-between text-gray-600 text-md p-2 border-b border-gray-200">
                    <div className="phoneno text-[15px] text-gray-600">Phone Number:</div>
                    <div className='text-gray-400 text-sm'>{details.phoneNo.substring(0, 3) + "****" + details.phoneNo.substring(7)}</div>
                </div>

                <div className="balance flex items-center justify-between text-gray-600 text-md p-2 border-b border-gray-200">
                    <div className="bnkac text-[15px] text-gray-600">IFSC:</div>
                    <div className='text-gray-400 text-sm'>{details.ifsc}</div>
                </div>

                <div className='flex items-center justify-start gap-2 mt-4 mb-1'>
                    <div className="balance text-black font-bold text-[16px]">Balance: {Math.floor(balance)}</div>
                    <div onClick={handleWithdrawalAll} className="withdraw bg-confirm font-medium rounded-sm
                    text-white text-[10px] py-1 cursor-pointer text-center px-[4px]">All</div>
                </div>

                <div className='text-md text-black font-bold py-2'>
                    <div>Amount</div>
                </div>

                <div className='bg-[#f6f6f6] flex flex-row items-center py-2 px-1 rounded-md'>
                    <input type="number" id="withdrawal_field" onChange={handleWithdrawalAmount}
                        placeholder='Please enter the amount'
                        className='w-full bg-inherit text-red-800 outline-none font-normal text-lg 
                    placeholder:opacity-70
                    flex-row placeholder:text-black placeholder:text-sm' />
                    <div className='opacity-70 mx-1'>RS</div>
                </div>

                <div className='text-md text-black font-bold py-2'>
                    <div>Password</div>
                </div>

                <div className='bg-[#f6f6f6] flex flex-row items-center py-2 px-1 rounded-md'>
                    <input type="password" onChange={e => setWpassword(e.target.value)}
                        placeholder='Please enter the payment password'
                        className='w-full bg-inherit text-red-800 outline-none font-normal text-lg 
                    placeholder:opacity-70
                    flex-row placeholder:text-black placeholder:text-sm' />
                    {/* <div className='opacity-70 mx-1'>RS</div> */}
                </div>

                {/* <div className="balance flex justify-between items-center text-gray-600 sm:text-md md:text-md p-2">
                    <div className="wpwd w-2/3 text-[15px] text-gray-400">Withdrawal Password:</div>
                    <input type="password" onChange={e => setWpassword(e.target.value)} placeholder='Enter Password'
                        className='placeholder:text-xs outline-none w-1/3' />
                </div> */}

                {/* <div className="balance flex justify-between text-gray-600 sm:text-md md:text-xl p-3">
                    <div className="wpwd w-2/3">OTP: <span className='text-sm bg-red-800 text-white px-3 py-1 hover:cursor-pointer rounded-full' onClick={() => handleOTPSend(String(Math.floor(100000 + Math.random() * 900000)))}>Send OTP</span></div>
                    <input type="password" onChange={e => setOtp(e.target.value)} placeholder='Enter OTP' className='placeholder:text-xs outline-none bg-[#d3d6fe] w-1/3' />
                </div> */}

                {/* <div className='text-red-800 px-[4px] my-1 py-[2px] text-xs rounded-full border border-red-800 inline'>Tax {amountDetails.withdrawal_fee}% </div> */}
                {/* <div className='flex items-center justify-start gap-2 my-1'>
                    <div className='text-red-800 text-xl'>&#8377;</div>
                    <div className="value"> <input type="number" 
                    id="withdrawal_field" onChange={handleWithdrawalAmount} 
                    className='w-full text-xl outline-none bg-white py-2' placeholder='Amount' /></div>
                </div> */}

                {
                    isBetween() ?
                        <button onClick={handleLastButton} className='bg-confirm rounded-full text-white text-lg mt-3 mx-auto  
                        mb-2   block w-[95%] py-2 shadow-slate-400'>Submit</button>
                        :
                        <button onClick={() => toaster('You can withdraw only between 09:30 AM to 03:00 PM')} className='bg-confirm rounded-full 
                        text-white text-lg mt-3 mx-auto  mb-2  
                         block w-[95%] py-2 shadow-slate-400'>Submit</button>
                }
            </div>
        
            <div className="part1 bg-red-800  rounded-lg mx-3 flex flex-col gap-1 text-[14px]">
                <div className='text-gray-500 font-medium'><br />
                    1: Valid members can apply for withdrawal. The number of withdrawals is unlimited. The minimum withdrawal amount is 200rs.<br />
                    2: IFSC should be 11 characters and 5th character should be 0. If you fill in wrong bank information, your withdrawal will fail.<br />
                    3: Withdrawal fee: 10%<br />
                    4: Withdrawal time: 1-2 days
                </div>
                {/* <div className='text-gray-500 font-medium'>* Withdrawal time 09:00 - 18:00</div>
                <div className='text-gray-500 font-medium'>* Minimum withdrawal amount: {amountDetails.mwamount}.</div>
                <div className='text-gray-500 font-medium'>* Correctly fill in the bank information IFSC code, payee name, bank card number, otherwise the withdrawal will fail.</div>
                <div className='text-gray-500 font-medium'>* The actual arrival time of all withdrawals is subject to the processing time of the local bank.</div> */}
            </div>
            {/* [#2e9afe] */}
        </div>
    )
}

export default Withdrawal