import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLayoutEffect, useEffect } from 'react';
import { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import axios from 'axios';
import BASE_URL from '../api_url';
import setting from '../images/assets/asset 1.png';
import asset3 from '../images/assets/asset 3.png';
import asset4 from '../images/assets/asset 4.png';
import asset5 from '../images/asml/asset 5.png';
import asset6 from '../images/asml/asset 6.png';
import asset7 from '../images/asml/asset 7.png';
import asset8 from '../images/asml/asset 8.png';
import asset9 from '../images/assets/asset 9.png';
import asset10 from '../images/assets/asset 10.png';
import asset11 from '../images/assets/asset 11.png';
import asset12 from '../images/assets/asset 12.png';
import asset13 from '../images/assets/asset 13.png';
import ReactModal from 'react-modal';
import tuborg_logo from '../images/tuborg_logo.svg';
import asset35 from '../images/assets3/asset 5.avif';
import asset36 from '../images/assets3/asset 6.avif';
import asset37 from '../images/assets3/asset 7.avif';
import asset38 from '../images/assets3/asset 8.avif';

import asset41 from '../images/assets4/asset 1.png'
import asset42 from '../images/assets4/asset 2.png'
import asset44 from '../images/assets4/asset 4.png'
import asset45 from '../images/assets4/asset 5.png'
import lenskart_logo from '../images/lenskart_logo.png';

import DateDifference from '../utility/DateDifference.js';

import my1 from '../images/asml/my1.png';
import my2 from '../images/asml/my2.png';
import my3 from '../images/asml/my3.png';
import my4 from '../images/asml/my4.png';
import my5 from '../images/asml/my5.png';
import jio from '../images/asml/jio.png';
import jlogo from '../images/asml/jlogo.jpg';
import boat_logo from '../images/asml/boat/boat_logo.jpg';
import account_record from '../images/asml/account_record.png';
import personal_information from '../images/asml/personal_information.png';
import ceat_company from '../images/asml/ceat_company.png';
import app_download from '../images/asml/app_download.png';
import plan_details from '../images/asml/plan_details.png';

import setting_top from '../images/dj/setting.png';
import projects_me from '../images/dj/projects_me.png';
import bind_bank_account from '../images/dj/bind_bank_account.png';
import invitation from '../images/dj/invitation.png';
import bonux_box from '../images/dj/bonus_box.png';
import teams_me from '../images/dj/teams_me.png';
import records from '../images/dj/records.png';
import home from '../images/dj/normal_home.png';
import company from '../images/dj/company.png';
import me from '../images/dj/me_page_image.png';
import project from '../images/dj/Project.png';
import register_logo from '../images/dj/register_logo.png';

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

const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  //console.log(result);
  return result;
}

const Mine = () => {

  const navigate = useNavigate();
  const [mobileno, setMobileno] = useState('');
  const [recharge_amount, setRecharge_amount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [originalwpwd, setOriginalwpwd] = useState(null);
  const [originalpwd, setOriginalpwd] = useState(null);
  const [earning, setEarning] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toasterShow, setToasterShow] = useState(false);
  const [toasterText, setToasterText] = useState('');
  const [user_refer, setUser_refer] = useState(null);
  const [logout_popup, setLogout_popup] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [current_tab, setCurrent_tab] = useState('earning');
  const [investment_amount, setInvestment_amount] = useState(0);
  const [accumulated_income, setAccumulated_income] = useState(0);
  const [today_income, setToday_income] = useState(0);
  

  const toaster = (text) => {
    setToasterText(text);
    setToasterShow(true);
    setTimeout(() => {
      setToasterShow(false);
      //navigate('/mine');
    }, 5000);
  }

  const getUserDetails = async () => {
    // const docRef = doc(db, 'users', auth.currentUser.uid);
    await axios.post(`${BASE_URL}/get_user`, { user_id: localStorage.getItem('uid') }).then(async ({ data: document }) => {
      if (document) {
        setUserDetails(document);
        //console.log(document);
        if (('plans_purchased' in document) === false) {
          // toaster('Please buy a plan first!');
          return;
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

        await axios.post(`${BASE_URL}/get_user`, { user_id: localStorage.getItem('uid') }).then(({ data }) => {
          setEarning(data.earning);
          //console.log(data);
        });

      } else {
        console.log('Data not found');
      }

    }).then(() => {
      //console.log('This is working');
    })
      .catch(error => console.log('Some error occured', error));
  }

  useEffect(() => {
    getUserDetails();
  }, []);


  useLayoutEffect(() => {
    document.body.style.backgroundColor = "white";
    const getUserInfo = async () => {
      const docRef = await axios.post(`${BASE_URL}/get_user`, { user_id: localStorage.getItem('uid') }).then(({ data }) => data);
      if (docRef) {
        //console.log(docRef.data());
        setMobileno(docRef.mobno);
        setRecharge_amount(docRef.recharge_amount);
        setBalance(docRef.balance);
        setEarning(docRef.earning);
        setOriginalwpwd(docRef.wpwd);
        setOriginalpwd(docRef.pwd);
        setUser_refer(docRef.user_invite);
        //console.log(new Date(((docRef.data().time.toDate()))));
      } else {
        console.log('Document does not exits');
      }
    }
    setLoading(true);
    getUserInfo()
      .then(() => setLoading(false));
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/login');
  }

  const isBetween = () => {
    var startTime = '9:00:00';
    var endTime = '19:00:00';

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

  if (loading) {
    return (
      <div className='relative h-screen bg-confirm'>
      {toasterShow
        ?
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='flex gap-2 bg-black opacity-80 text-white px-2 mx-auto w-11/12 py-1 rounded-md'>
            <div className='text-center w-full'>{toasterText}</div>
          </div>
        </div> : null}

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


      <div className="flex flex-col bg-confirm gap-1 w-full">
        <div className='flex items-center justify-end pr-2 pt-2' onClick={() => navigate('/settings')}>
          <div><img src={setting_top} alt="setting_image" className='w-7 h-7' /></div>
        </div>
        <div className='flex flex-col justify-start items-center px-3 pb-3'>
          <img src={register_logo} alt="wind_login" width={125} className="pb-1 rounded-full" />
          <div className='text-[20px] font-semibold text-white'>{''}
            {/* <span className='border border-red-700 px-1 text-red-700 rounded-xl text-xs'>LV0</span> */}
          </div>
        </div>

        <div className="flex flex-row justify-center items-center text-white w-[90%] mx-auto ">
          <div className='flex flex-col items-center border-r-[0.5px] border-white pr-8'>
            <div className='font-bold'>{''}</div>
            <div className='font-semibold'>Recharge wallet</div>
          </div>
          <div className='flex flex-col items-center border-l-[0.5px] border-white pl-8'>
            <div className='font-bold'>{''}</div>
            <div className='font-semibold'>Balance wallet</div>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center bg-white text-black rounded-md w-[90%] mx-auto  mt-3">
          <div className="w-full grid grid-cols-3 p-3 gap-2">

            <div className="flex items-center gap-1 flex-col text-sm" onClick={() => navigate('/project')}>
              <div>
                <img src={projects_me} alt="" srcset="" className='w-10 h-10 mb-1' />
              </div>
              <div className='text-center'>My Projects</div>
            </div>

            <div className="flex items-center gap-1 flex-col text-sm" onClick={() => navigate('/bank')}>
              <div>
                <img src={bind_bank_account} alt="" srcset="" className='w-10 h-10 mb-1' />
              </div>
              <div className='text-center'>Bind Bank Account</div>
            </div>

            <div className="flex items-center gap-1 flex-col text-sm" onClick={() => navigate('/record')}>
              <div>
                <img src={records} alt="" srcset="" className='w-10 h-10 mb-1' />
              </div>
              <div className='text-center'>Funding details</div>
            </div>


            <div className="flex items-center gap-1 flex-col text-sm" onClick={() => navigate('/invite')}>
              <div>
                <img src={invitation} alt="" srcset="" className='w-10 h-10 mb-1' />
              </div>
              <div className='text-center'>Invitation</div>
            </div>


            <div className="flex items-center gap-1 flex-col text-sm" onClick={() => navigate('/team')}>
              <div>
                <img src={teams_me} alt="" srcset="" className='w-10 h-10 mb-1' />
              </div>
              <div className='text-center'>My teams</div>
            </div>


            <div className="flex items-center gap-1 flex-col text-sm" onClick={()=>navigate('/rewards')}>
              <div>
                <img src={bonux_box} alt="" srcset="" className='w-10 h-10 mb-1' />
              </div>
              <div className='text-center'>Bonus</div>
            </div>
          </div>
        </div>

        {/* <div className='flex shadow-myShadow flex-row w-full justify-between px-4 text-white items-center h-[104px] rounded-lg bg-red-800'>

          <div className="flex flex-col justify-center items-center gap-1 h-full">
            <div>Assets</div>
            <div className='text-xs'>{Math.floor(balance)}</div>
          </div>

          <div className="flex flex-col justify-center items-center gap-1  h-full">
            <div>Recharge</div>
            <div className='text-xs'>{Math.floor(recharge_amount)}</div>
          </div>

          <div className="flex flex-col  h-full justify-center items-center gap-1">
            <div>Income</div>
            <div className='text-xs'>{Math.floor(earning)}</div>
          </div>
        </div> */}
      </div>

      {/* <div className="grid grid-cols-2 p-2 gap-2 font-medium text-sm mt-10">

        <div className="flex flex-col items-center bg-recharge-bg py-1 rounded-[50%]" onClick={() => navigate('/project')}>
          <div className='w-[30%]'><img src={asset41} alt="setting" /></div>
          <div className='flex-grow text-lg font-semibold'>Plan Details</div>

        </div>

        <div className="flex flex-col items-center bg-recharge-bg py-1 rounded-[50%]" onClick={() => navigate('/record')}>
          <div className='w-[30%]'><img src={asset42} alt="setting" /></div>

          <div className='flex-grow text-lg font-semibold'>Account record</div>

        </div>

        <div className="flex flex-col items-center bg-recharge-bg py-1 rounded-[50%]" onClick={() => navigate('/settings', { state: { withdrawalPassword: originalwpwd, loginPassword: originalpwd } })}>
          <div className='w-[30%]'><img src={asset44} alt="setting" /></div>
          <div className='flex-grow text-sm font-semibold'>Personal Information</div>

        </div>

        <div className="flex flex-col items-center bg-recharge-bg  py-1 rounded-[50%]" onClick={() => navigate('/company')}>
          <div className='w-[30%]'><img src={asset45} alt="setting" /></div>
          <div className='flex-grow text-lg font-semibold'>Company</div>
        </div>

      </div> */}

      {/* <div className='grid grid-cols-2 grid-rows-3 px-2 gap-1 py-3 mt-2'>

        <div className='flex flex-col gap-[2px] items-center bg-[#f3f3f3] py-2' onClick={() => navigate('/company')}>
          <div>
            <img src={ceat_company} width={50} />
          </div>
          <div className='font-bold'>Company</div>
        </div>

        <div className='flex flex-col gap-[2px] items-center bg-[#f3f3f3] py-2' onClick={() => navigate('/settings', { state: { withdrawalPassword: originalwpwd, loginPassword: originalpwd } })}>
          <div>
            <img src={personal_information} width={50} />
          </div>
          <div className='font-bold'>personal information</div>
        </div>

        <div className='flex flex-col gap-[2px] items-center bg-[#f3f3f3] py-2' onClick={() => navigate('/project')}>
          <div>
            <img src={plan_details}  width={50} />
          </div>
          <div className='font-bold'>Plan Details</div>
        </div>

        <div className='flex flex-col gap-[2px] items-center bg-[#f3f3f3] py-2' onClick={() => navigate('/record')}>
          <div>
            <img src={account_record} width={50} />
          </div>
          <div className='font-bold'>Account Record</div>
        </div>

        <div className='flex flex-col gap-[2px] items-center bg-[#f3f3f3] px-6 py-2 center-box'>
          <div>
            <img src={app_download} width={50} />
          </div>
          <div className='font-bold'>APP download</div>
        </div>

      </div> */}

      {/* <div className="flex flex-col p-2  font-medium text-sm">

        <div className="flex items-center border-b border-gray-300 py-2" onClick={() => navigate('/settings', { state: { withdrawalPassword: originalwpwd, loginPassword: originalpwd } })}>
          <div className='w-[10%]'><img src={setting} alt="setting" className=' w-6 h-6' /></div>
          <div className='flex-grow'>Personal Information</div>
          <div className='w-[10%]'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-gray-300">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="flex items-center border-b border-gray-300 py-2" onClick={() => navigate('/invite')}>
          <div className='w-[10%]'><img src={asset3} alt="setting" className=' w-6 h-6' /></div>
          <div className='flex-grow'>Invite</div>
          <div className='w-[10%]'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-gray-300">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="flex items-center border-b border-gray-300 py-2" onClick={() => navigate('/project')}>
          <div className='w-[10%]'><img src={asset4} alt="setting" className=' w-6 h-6' /></div>
          <div className='flex-grow'>Transaction details</div>
          <div className='w-[10%]'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-gray-300">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="flex items-center border-b border-gray-300 py-2" onClick={() => navigate('/record')}>
          <div className='w-[10%]'><img src={asset5} alt="setting" className=' w-6 h-6' /></div>

          <div className='flex-grow'>Account record</div>
          <div className='w-[10%]'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-gray-300">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="flex items-center border-b border-gray-300 py-2" onClick={() => isBetween() ?
          navigate('/withdrawal', { state: { withdrawalPassword: originalwpwd, loginPassword: originalpwd } }) : toaster('You are not in the withdrawl time window')
        }>
          <div className='w-[10%]'><img src={asset6} alt="setting" className=' w-6 h-6' /></div>

          <div className='flex-grow'>Withdrawal</div>
          <div className='w-[10%]'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-gray-300">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <a href="https://t.me/TuborgbeerApp1" className=' no-underline  cursor-pointer'>
          <div className="flex items-center border-b border-gray-300 py-2" >
            <div className='w-[10%]'><img src={asset7} alt="setting" className=' w-6 h-6' /></div>

            <div className='flex-grow'>Telegram</div>
            <div className='w-[10%]'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-gray-300">
                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </a>


        <div className="flex items-center border-b border-gray-300 py-2" onClick={() => navigate('/team')} >
          <div className='w-[10%]'><img src={asset9} alt="setting" className=' w-6 h-6' /></div>

          <div className='flex-grow'>Team report</div>
          <div className='w-[10%]'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-gray-300">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

      </div> */}

      {/* <div onClick={() => setLogout_popup(true)} className="flex flex-row justify-center text-xl
        w-[80%] mx-auto py-1 mt-10 text-center rounded-md bg-red-800 text-white font-semibold">
        <div>Sign out</div>
      </div> */}

      <div className="fixed bottom-0 z-10 bg-gray-50 rounded-none text-gray-700  flex overflow-x-hidden  mx-auto mt-2 border-2 border-gray-100 w-full overflow-y-hidden">
        <div className="flex flex-row justify-around font-normal text-xs items-center w-full py-1">
          <div className=' cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={()=>navigate('/home')}>
            <img src={home} alt="online" className='w-6' />
            <div>Home</div>
          </div>

          <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'
            onClick={() => navigate('/financial')}>
            <img src={project} alt="recharge" className='w-6' />
            <div>Products</div>
          </div>
          <div className='cursor-pointer mx-2 flex flex-col justify-center items-center '
            onClick={() => navigate('/company')}>
            <img src={company} alt="app_dwd" className='w-6' />
            <div>Company</div>
          </div>


          <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'
            onClick={() => navigate('/mine')}>
            <img src={me} alt="invite" className='w-6' />
            <div>me</div>
          </div>
        </div>
      </div>



    </div>
    )
  }

  return (
    <div className='relative h-screen bg-confirm'>
      {toasterShow
        ?
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='flex gap-2 bg-black opacity-80 text-white px-2 mx-auto w-11/12 py-1 rounded-md'>
            <div className='text-center w-full'>{toasterText}</div>
          </div>
        </div> : null}

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


      <div className="flex flex-col bg-confirm gap-1 w-full">
        <div className='flex items-center justify-end pr-2 pt-2' onClick={() => navigate('/settings', { state: { withdrawalPassword: originalwpwd, loginPassword: originalpwd } })}>
          <div><img src={setting_top} alt="setting_image" className='w-7 h-7' /></div>
        </div>
        <div className='flex flex-col justify-start items-center px-3 pb-3'>
          <img src={register_logo} alt="wind_login" width={125} className="pb-1 rounded-full" />
          <div className='text-[20px] font-semibold text-white'>91{mobileno}
            {/* <span className='border border-red-700 px-1 text-red-700 rounded-xl text-xs'>LV0</span> */}
          </div>
        </div>

        <div className="flex flex-row justify-center items-center text-white w-[90%] mx-auto ">
          <div className='flex flex-col items-center border-r-[0.5px] border-white pr-8'>
            <div className='font-bold'>{Math.floor(recharge_amount)}</div>
            <div className='font-semibold'>Recharge wallet</div>
          </div>
          <div className='flex flex-col items-center border-l-[0.5px] border-white pl-8'>
            <div className='font-bold'>{Math.floor(balance)}</div>
            <div className='font-semibold'>Balance wallet</div>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center bg-white text-black rounded-md w-[90%] mx-auto  mt-3">
          <div className="w-full grid grid-cols-3 p-3 gap-2">

            <div className="flex items-center gap-1 flex-col text-sm" onClick={() => navigate('/project')}>
              <div>
                <img src={projects_me} alt="" srcset="" className='w-10 h-10 mb-1' />
              </div>
              <div className='text-center'>My Projects</div>                          
            </div>

            <div className="flex items-center gap-1 flex-col text-sm" onClick={() => navigate('/bank', { state: { withdrawalPassword: originalwpwd, loginPassword: originalpwd } })}>
              <div>
                <img src={bind_bank_account} alt="" srcset="" className='w-10 h-10 mb-1' />
              </div>
              <div className='text-center'>Bind Bank Account</div>
            </div>

            <div className="flex items-center gap-1 flex-col text-sm" onClick={() => navigate('/record')}>
              <div>
                <img src={records} alt="" srcset="" className='w-10 h-10 mb-1' />
              </div>
              <div className='text-center'>Funding details</div>
            </div>


            <div className="flex items-center gap-1 flex-col text-sm" onClick={() => navigate('/invite')}>
              <div>
                <img src={invitation} alt="" srcset="" className='w-10 h-10 mb-1' />
              </div>
              <div className='text-center'>Invitation</div>
            </div>


            <div className="flex items-center gap-1 flex-col text-sm" onClick={() => navigate('/team')}>
              <div>
                <img src={teams_me} alt="" srcset="" className='w-10 h-10 mb-1' />
              </div>
              <div className='text-center'>My teams</div>
            </div>


            <div className="flex items-center gap-1 flex-col text-sm" onClick={()=>navigate('/rewards')}>
              <div>
                <img src={bonux_box} alt="" srcset="" className='w-10 h-10 mb-1' />
              </div>
              <div className='text-center'>Bonus</div>
            </div>
          </div>
        </div>

        {/* <div className='flex shadow-myShadow flex-row w-full justify-between px-4 text-white items-center h-[104px] rounded-lg bg-red-800'>

          <div className="flex flex-col justify-center items-center gap-1 h-full">
            <div>Assets</div>
            <div className='text-xs'>{Math.floor(balance)}</div>
          </div>

          <div className="flex flex-col justify-center items-center gap-1  h-full">
            <div>Recharge</div>
            <div className='text-xs'>{Math.floor(recharge_amount)}</div>
          </div>

          <div className="flex flex-col  h-full justify-center items-center gap-1">
            <div>Income</div>
            <div className='text-xs'>{Math.floor(earning)}</div>
          </div>
        </div> */}
      </div>

      {/* <div className="grid grid-cols-2 p-2 gap-2 font-medium text-sm mt-10">

        <div className="flex flex-col items-center bg-recharge-bg py-1 rounded-[50%]" onClick={() => navigate('/project')}>
          <div className='w-[30%]'><img src={asset41} alt="setting" /></div>
          <div className='flex-grow text-lg font-semibold'>Plan Details</div>

        </div>

        <div className="flex flex-col items-center bg-recharge-bg py-1 rounded-[50%]" onClick={() => navigate('/record')}>
          <div className='w-[30%]'><img src={asset42} alt="setting" /></div>

          <div className='flex-grow text-lg font-semibold'>Account record</div>

        </div>

        <div className="flex flex-col items-center bg-recharge-bg py-1 rounded-[50%]" onClick={() => navigate('/settings', { state: { withdrawalPassword: originalwpwd, loginPassword: originalpwd } })}>
          <div className='w-[30%]'><img src={asset44} alt="setting" /></div>
          <div className='flex-grow text-sm font-semibold'>Personal Information</div>

        </div>

        <div className="flex flex-col items-center bg-recharge-bg  py-1 rounded-[50%]" onClick={() => navigate('/company')}>
          <div className='w-[30%]'><img src={asset45} alt="setting" /></div>
          <div className='flex-grow text-lg font-semibold'>Company</div>
        </div>

      </div> */}

      {/* <div className='grid grid-cols-2 grid-rows-3 px-2 gap-1 py-3 mt-2'>

        <div className='flex flex-col gap-[2px] items-center bg-[#f3f3f3] py-2' onClick={() => navigate('/company')}>
          <div>
            <img src={ceat_company} width={50} />
          </div>
          <div className='font-bold'>Company</div>
        </div>

        <div className='flex flex-col gap-[2px] items-center bg-[#f3f3f3] py-2' onClick={() => navigate('/settings', { state: { withdrawalPassword: originalwpwd, loginPassword: originalpwd } })}>
          <div>
            <img src={personal_information} width={50} />
          </div>
          <div className='font-bold'>personal information</div>
        </div>

        <div className='flex flex-col gap-[2px] items-center bg-[#f3f3f3] py-2' onClick={() => navigate('/project')}>
          <div>
            <img src={plan_details}  width={50} />
          </div>
          <div className='font-bold'>Plan Details</div>
        </div>

        <div className='flex flex-col gap-[2px] items-center bg-[#f3f3f3] py-2' onClick={() => navigate('/record')}>
          <div>
            <img src={account_record} width={50} />
          </div>
          <div className='font-bold'>Account Record</div>
        </div>

        <div className='flex flex-col gap-[2px] items-center bg-[#f3f3f3] px-6 py-2 center-box'>
          <div>
            <img src={app_download} width={50} />
          </div>
          <div className='font-bold'>APP download</div>
        </div>

      </div> */}

      {/* <div className="flex flex-col p-2  font-medium text-sm">

        <div className="flex items-center border-b border-gray-300 py-2" onClick={() => navigate('/settings', { state: { withdrawalPassword: originalwpwd, loginPassword: originalpwd } })}>
          <div className='w-[10%]'><img src={setting} alt="setting" className=' w-6 h-6' /></div>
          <div className='flex-grow'>Personal Information</div>
          <div className='w-[10%]'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-gray-300">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="flex items-center border-b border-gray-300 py-2" onClick={() => navigate('/invite')}>
          <div className='w-[10%]'><img src={asset3} alt="setting" className=' w-6 h-6' /></div>
          <div className='flex-grow'>Invite</div>
          <div className='w-[10%]'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-gray-300">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="flex items-center border-b border-gray-300 py-2" onClick={() => navigate('/project')}>
          <div className='w-[10%]'><img src={asset4} alt="setting" className=' w-6 h-6' /></div>
          <div className='flex-grow'>Transaction details</div>
          <div className='w-[10%]'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-gray-300">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="flex items-center border-b border-gray-300 py-2" onClick={() => navigate('/record')}>
          <div className='w-[10%]'><img src={asset5} alt="setting" className=' w-6 h-6' /></div>

          <div className='flex-grow'>Account record</div>
          <div className='w-[10%]'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-gray-300">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="flex items-center border-b border-gray-300 py-2" onClick={() => isBetween() ?
          navigate('/withdrawal', { state: { withdrawalPassword: originalwpwd, loginPassword: originalpwd } }) : toaster('You are not in the withdrawl time window')
        }>
          <div className='w-[10%]'><img src={asset6} alt="setting" className=' w-6 h-6' /></div>

          <div className='flex-grow'>Withdrawal</div>
          <div className='w-[10%]'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-gray-300">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <a href="https://t.me/TuborgbeerApp1" className=' no-underline  cursor-pointer'>
          <div className="flex items-center border-b border-gray-300 py-2" >
            <div className='w-[10%]'><img src={asset7} alt="setting" className=' w-6 h-6' /></div>

            <div className='flex-grow'>Telegram</div>
            <div className='w-[10%]'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-gray-300">
                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </a>


        <div className="flex items-center border-b border-gray-300 py-2" onClick={() => navigate('/team')} >
          <div className='w-[10%]'><img src={asset9} alt="setting" className=' w-6 h-6' /></div>

          <div className='flex-grow'>Team report</div>
          <div className='w-[10%]'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-gray-300">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

      </div> */}

      {/* <div onClick={() => setLogout_popup(true)} className="flex flex-row justify-center text-xl
        w-[80%] mx-auto py-1 mt-10 text-center rounded-md bg-red-800 text-white font-semibold">
        <div>Sign out</div>
      </div> */}

      <div className="fixed bottom-0 z-10 bg-gray-50 rounded-none text-gray-700  flex overflow-x-hidden  mx-auto mt-2 border-2 border-gray-100 w-full overflow-y-hidden">
        <div className="flex flex-row justify-around font-normal text-xs items-center w-full py-1">
          <div className=' cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={()=>navigate('/home')}>
            <img src={home} alt="online" className='w-6' />
            <div>Home</div>
          </div>

          <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'
            onClick={() => navigate('/financial')}>
            <img src={project} alt="recharge" className='w-6' />
            <div>Products</div>
          </div>
          <div className='cursor-pointer mx-2 flex flex-col justify-center items-center '
            onClick={() => navigate('/company')}>
            <img src={company} alt="app_dwd" className='w-6' />
            <div>Company</div>
          </div>


          <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'
            onClick={() => navigate('/mine')}>
            <img src={me} alt="invite" className='w-6' />
            <div>me</div>
          </div>
        </div>
      </div>



    </div>
  )
}


export default Mine;