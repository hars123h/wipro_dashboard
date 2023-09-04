import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import BASE_URL from '../api_url';
import { AmountContext } from '../App';
import { useContext } from 'react';
import tuborg_logo from '../images/tuborg_logo.svg';
import asset35 from '../images/assets3/asset 5.avif';
import asset36 from '../images/assets3/asset 6.avif';
import asset37 from '../images/assets3/asset 7.avif';
import asset38 from '../images/assets3/asset 8.avif';
import lenskart_logo from '../images/lenskart_logo.png';
import asset5 from '../images/asml/asset 5.png';
import asset6 from '../images/asml/asset 6.png';
import asset7 from '../images/asml/asset 7.png';
import asset8 from '../images/asml/asset 8.png';
import boat_logo from '../images/dj/register_logo.png';


const Team = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [teamDetails, setTeamDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentVisible, setCurrentVisible] = useState('level1');
  const [level1, setLevel1] = useState([]);
  const [level2, setLevel2] = useState([]);
  const [level3, setLevel3] = useState([]);
  const amountDetails = useContext(AmountContext);
  const [assetValue, setAssetValue] = useState(0);


  useEffect(() => {
    document.body.style.backgroundColor = "#b2e7e4";
  }, []);


  const getUserDetails = async () => {
    const details = await axios.post(`${BASE_URL}/get_user`, { user_id: localStorage.getItem('uid') }).then(({ data }) => data);
    const arr1 = await axios.post(`${BASE_URL}/lvl1`, { user_id: localStorage.getItem('uid') }).then(({ data }) => data.level1);
    const arr2 = await axios.post(`${BASE_URL}/lvl2`, { user_id: localStorage.getItem('uid') }).then(({ data }) => data.level2);
    const arr3 = await axios.post(`${BASE_URL}/lvl3`, { user_id: localStorage.getItem('uid') }).then(({ data }) => data.level3);

    setUserDetails(details);
    setLevel1(arr1);
    setLevel2(arr2);
    setLevel3(arr3);
    for (let i = 0; i < arr1.length; i++) {
      setAssetValue((prev) => prev + arr1[i].balance);
    }
    for (let i = 0; i < arr2.length; i++) {
      setAssetValue((prev) => prev + arr2[i].balance);
    }
    for (let i = 0; i < arr3.length; i++) {
      setAssetValue((prev) => prev + arr3[i].balance);
    }
  }

  // const wSummary = async({user_id}) => {
  //   const datas = await axios.post(`${BASE_URL}//withdrawalSum`, {user_id:user_id})
  //   .then(({data})=>data.wSum)
  //   console.log(datas);
  // }

  const userTotalPlanBalance = (userinfo) => {
    let total_plan_amount = 0;
    if (userinfo.hasOwnProperty('plans_purchased')) {
      for (let i = 0; i < userinfo.plans_purchased.length; i++) {
        total_plan_amount += userinfo.plans_purchased[i].plan_amount;
      }
    }
    return total_plan_amount;
  }

  useLayoutEffect(() => {
    getUserDetails().then(() => {
      setLoading(false);
    })
  }, []);

  if (loading || userDetails === null) {
    return (
      <div className='bg-red-800'>
        {/* [#2e9afe] */}
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
          <div className='flex-grow text-md font-semibold'>My Teams</div>
          <div className=" font-bold text-sm text-confirm">Records</div>
        </div>


        <div className="flex w-full items-center justify-between">
        <div className="px-3 text-center font-bold">Total: {0}</div>
        <div className="px-3 text-center font-bold">Total Recharge: {0}</div>      
      </div>

        <div className='flex flex-col items-center w-full   bg-red-800 '>
          <div className="flex items-center w-full px-4 bg-red-800 font-[300] mt-3">
            <div className={`${currentVisible === 'level1' ? 'text-white border-b-2 border-red-800 bg-confirm' : 'bg-white border-b-[0.5px] border-l-[0.5px] border-r-[0.5px] border-confirm text-confirm'} px-1 py-[2px] text-center text-sm w-1/3 font-normal`} onClick={e => setCurrentVisible('level1')}>B-15% (0)</div>
            <div className={`${currentVisible === 'level2' ? 'text-white border-b-2 border-red-800 bg-confirm' : 'bg-white border-b-[0.5px] border-l-[0.5px] border-r-[0.5px] border-confirm text-confirm'} px-1 py-[2px] text-center text-sm w-1/3 font-normal`} onClick={e => setCurrentVisible('level2')}>C-3% (0)</div>
            <div className={`${currentVisible === 'level3' ? 'text-white border-b-2 border-red-800 bg-confirm' : 'bg-white border-b-[0.5px] border-l-[0.5px] border-r-[0.5px] border-confirm text-confirm'} px-1 py-[2px] text-center text-sm w-1/3 font-normal`} onClick={e => setCurrentVisible('level3')}>D-2% (0)</div>
          </div>


        </div>
        {/* <div className="fixed bottom-0 z-10 bg-gray-50 rounded-none text-gray-700  flex overflow-x-hidden  mx-auto mt-2 border-2 border-gray-100 w-full overflow-y-hidden">
          <div className="flex flex-row justify-around font-normal text-sm items-center w-full py-1">
            <div className=' cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/home')}>
              <img src={asset5} alt="online" className='w-7' />
              <div>Home</div>
            </div>

            <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/invite')}>
              <img src={asset6} alt="recharge" className='w-7' />
              <div>Invite</div>
            </div>
            <div className='cursor-pointer mx-2 flex flex-col justify-center items-center ' onClick={() => navigate('/team')}>
              <img src={asset7} alt="app_dwd" className='w-7' />
              <div>Team</div>
            </div>


            <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/mine')}>
              <img src={asset8} alt="invite" className='w-7' />
              <div>My</div>
            </div>
          </div>
        </div> */}

      </div>
    )
  }

  return (
    <div className='bg-red-800'>
      {/* [#2e9afe] */}
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
        <div className='flex-grow text-md font-semibold'>My Teams</div>
        <div className=" font-bold text-sm text-confirm">Records</div>
      </div>

      {/* <div className="flex flex-row justify-between items-center p-2 border-b-[0.5px] border-gray-200" >
        <div className='flex flex-row justify-between items-center flex-grow mx-2'>
          <input type="date" name="date_from" id="date_from"
            className=' outline-none rounded-full bg-gray-100 py-[2px] w-[100px]' />
          <div className='font-medium mx-1'>to</div>
          <input type="date" name="date_from" id="date_from"
            className='outline-none rounded-full bg-gray-100 py-[2px] w-[100px]' />
        </div>
        <div>
          <button className="bg-red-800 text-white text-xs px-2 rounded-full py-[3px] flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
              className="w-3 h-3 stroke-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <div>search for</div>
          </button>
        </div>
      </div> */}
      {/*userDetails.directRecharge * (amountDetails.level1_percent) / 100) + (userDetails.indirectRecharge * (amountDetails.level2_percent) / 100) + (userDetails.in_indirectRecharge * (amountDetails.level3_percent) / 100 */}
      {/* <div className="flex border-b-[0.5px] border-gray-200">
        <div className="flex flex-col w-1/3 pt-2 pb-4 px-2 border-r-[0.5px] border-gray-300">
          <div className='text-gray-500 text-[10px] leading-3 mt-1'>Team assets (&#8377;)</div>
          <div className='text-[#4169e1] text-xl mt-1'>&#8377;{Math.floor(assetValue)}</div>
        </div>
        <div className="flex flex-col w-1/3 pt-2 pb-4 px-2 border-r-[0.5px] border-gray-300">
          <div className='text-gray-500 text-[10px] leading-3 mt-1'>Team recharge (&#8377;)</div>
          <div className='text-[#4169e1] text-xl mt-1'>&#8377;{Math.floor(userDetails.directRecharge + userDetails.indirectRecharge + userDetails.in_indirectRecharge)}</div>
        </div>
        <div className="flex flex-col w-1/3 pt-2 pb-4 px-2">
          <div className='text-gray-500 text-[10px] leading-3 mt-1'>Team Number</div>
          <div className='text-[#4169e1] text-xl mt-1'>{Math.floor(userDetails.directMember.length + userDetails.indirectMember.length + userDetails.in_indirectMember.length)}</div>
        </div>
      </div> */}
      <div className="flex  items-center justify-between w-full">
        <div className="px-3 text-center font-bold">Total: {Math.floor(userDetails.directMember.length + userDetails.indirectMember.length + userDetails.in_indirectMember.length)}</div>
        <div className="px-3 text-center font-bold">Total Recharge: {Math.floor(userDetails.directRecharge + userDetails.indirectRecharge + userDetails.in_indirectRecharge)}</div>      
      </div>



      <div className='flex flex-col items-center w-full   bg-red-800 '>


        <div className="flex items-center w-full px-4 bg-red-800 font-[300] mt-3">
          <div className={`${currentVisible === 'level1' ? 'text-white border-b-2 border-red-800 bg-confirm' : 'bg-white border-b-[0.5px] border-l-[0.5px] border-r-[0.5px] border-confirm text-confirm'} px-1 py-[2px] text-center text-sm w-1/3 font-normal`} onClick={e => setCurrentVisible('level1')}>B-15% ({userDetails.directMember.length})</div>
          <div className={`${currentVisible === 'level2' ? 'text-white border-b-2 border-red-800 bg-confirm' : 'bg-white border-b-[0.5px] border-l-[0.5px] border-r-[0.5px] border-confirm text-confirm'} px-1 py-[2px] text-center text-sm w-1/3 font-normal`} onClick={e => setCurrentVisible('level2')}>C-3% ({userDetails.indirectMember.length})</div>
          <div className={`${currentVisible === 'level3' ? 'text-white border-b-2 border-red-800 bg-confirm' : 'bg-white border-b-[0.5px] border-l-[0.5px] border-r-[0.5px] border-confirm text-confirm'} px-1 py-[2px] text-center text-sm w-1/3 font-normal`} onClick={e => setCurrentVisible('level3')}>D-2% ({userDetails.in_indirectMember.length})</div>
        </div>

        {currentVisible === 'level1' && (
          <div className='flex text-red-800 items-center justify-center font-semibold flex-col w-full  text-lg  mt-0'>
            {/* <div className='flex flex-col w-full'>
              <div>Level 1 Member: {userDetails.directMember.length}</div>
              <div>Level 1 Earning: &#8377;{(userDetails.directRecharge) * (amountDetails.level1_percent / 100)}</div>
            </div> */}

            <div className="flex justify-center ml-4 items-center text-gray-400 font-normal text-sm w-full my-2">
              <div className='w-1/3'>Account</div>
              <div className='w-1/3'>Level</div>
              <div className='w-1/3'>Registration time</div>
            </div>

            {level1.length === 0 ? (<div className='text-center text-gray-400 font-medium mt-5 text-sm'>No record</div>) : null}

            {/*{Math.max(0,element.recharge_amount + element.earning - element.balance)} */}
            {level1.map((element, index) => {
              return (
                <div className="flex justify-center mx-6 my-1 items-center text-gray-800 font-normal text-sm py-2 px-2 shadow-md rounded-md  w-full" key={index}>
                  <div className='w-1/3'>{element.mobno}</div>
                  <div className='w-1/3'>B</div>
                  <div className='w-1/3'>{new Date(element.time).toDateString()}</div>
                </div>
              )
            })}
          </div>
        )}

        {currentVisible === 'level2' && (
          <div className='flex text-red-800 items-center font-semibold flex-col w-full  text-lg  mt-0'>
            {/* <div className='flex flex-col w-full'>
              <div>Level 2 Member: {userDetails.indirectMember.length}</div>
              <div>Level 2 Earning: &#8377;{(userDetails.indirectRecharge) * (amountDetails.level2_percent / 100)}</div>
            </div> */}

            <div className="flex justify-center ml-4 items-center text-gray-400 font-normal text-sm w-full my-2">
              <div className='w-1/3'>Account</div>
              <div className='w-1/3'>Level</div>
              <div className='w-1/3'>Registration time</div>
            </div>

            {level2.length === 0 ? (<div className='text-center text-gray-400 font-medium mt-5 text-sm'>No record</div>) : null}


            {level2.map((element, index) => {
              return (
                <div className="flex justify-center mx-6 my-1 items-center text-gray-800 font-normal text-sm py-2 px-2 shadow-md rounded-md  w-full" key={index}>
                  <div className='w-1/3'>{element.mobno}</div>
                  <div className='w-1/3'>C</div>
                  <div className='w-1/3'>{new Date(element.time).toDateString()}</div>
                </div>
              )
            })}
          </div>
        )}

        {currentVisible === 'level3' && (
          <div className='flex text-red-800 items-center font-semibold flex-col w-full text-lg  mt-0'>
            {/* <div className='flex flex-col w-full'>
              <div>Level 3 Member: {userDetails.in_indirectMember.length}</div>
              <div>Level 3 Earning: &#8377;{(userDetails.in_indirectRecharge) * (amountDetails.level3_percent / 100)}</div>
            </div> */}
            <div className="flex justify-center ml-4 items-center text-gray-400 font-normal text-sm w-full my-2">
              <div className='w-1/3'>Account</div>
              <div className='w-1/3'>Level</div>
              <div className='w-1/3'>Registration time</div>
            </div>

            {level3.length === 0 ? (<div className='text-center text-gray-400  font-medium mt-5 text-sm'>No record</div>) : null}




            {level3.map((element, index) => {
              return (
                <div className="flex justify-center mx-6 my-1 items-center text-gray-800 font-normal text-sm py-2 px-2 shadow-md rounded-md  w-full" key={index}>
                  <div className='w-1/3'>{element.mobno}</div>
                  <div className='w-1/3'>D</div>
                  <div className='w-1/3'>{new Date(element.time).toDateString()}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      {/* <div className="fixed bottom-0 z-10 bg-gray-50 rounded-none text-gray-700  flex overflow-x-hidden  mx-auto mt-2 border-2 border-gray-100 w-full overflow-y-hidden">
        <div className="flex flex-row justify-around font-normal text-sm items-center w-full py-1">
          <div className=' cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/home')}>
            <img src={asset5} alt="online" className='w-7' />
            <div>Home</div>
          </div>

          <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/invite')}>
            <img src={asset6} alt="recharge" className='w-7' />
            <div>Invite</div>
          </div>
          <div className='cursor-pointer mx-2 flex flex-col justify-center items-center ' onClick={() => navigate('/team')}>
            <img src={asset7} alt="app_dwd" className='w-7' />
            <div>Team</div>
          </div>


          <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/mine')}>
            <img src={asset8} alt="invite" className='w-7' />
            <div>My</div>
          </div>
        </div>
      </div> */}

    </div>
  )
}

export default Team