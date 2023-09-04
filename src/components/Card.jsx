import wind_turbines from '../images/wind-turbines.svg';
import wind from '../images/wind.jpg';
import React from 'react';
import asset9 from '../images/asml/asset 4.jpeg';
import ceat_slide from '../images/asml/ceat_slide.jpg';
import powerbank from '../images/dj/powerbank.png';


//[#0096D5] [#00bcd4]


const Card = ({ pre_sale, long_plan_state, product_type, product_image, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle, handleClick }) => {


  return (
    <div className='ml-1 mt-1  bg-white shadow-ceatShadow3 p-1 rounded-md' >
      {/* <div className="title text-[#464945] font-bold text-lg">{plan_name}</div>         */}
      <div className="info text-xs flex flex-col items-center">
        <img src={product_image} alt="comp_img" className=' h-[160px] w-full mb-1' />
        <div className="title text-black w-full px-1 ml-1 text-left text-lg">{plan_name}</div>
        {/* {product_type === 'long' && (<div className="text-xs font-black text-center px-1 ml-1 w-full  text-red-800 ">Daily Income, Daily Withdrawals</div>)} */}
        {/* {product_type==='short' && (<div className="text-xs p-1 w-full  text-red-500 font-extrabold">Daily Income, Daily Withdrawals</div>)} */}
        <div className=' w-full grid grid-cols-1 p-1 gap-1 text-[12px]'>
          <div className="basic_info  text-white flex justify-start gap-1   mx-1">
            <div className='opacity-80 text-black'>Price: </div>
            <div className=' text-confirm font-bold'>&#8377;{plan_amount}</div>
          </div>
          <div className="basic_info text-white flex justify-start gap-1  mx-1">
            <div className='opacity-80 text-black'>Daily Income: </div>
            <div className='text-confirm font-bold'>&#8377;{plan_daily_earning}</div>
          </div>
          <div className="basic_info text-white flex justify-start gap-1 mx-1">
            <div className='opacity-80 text-black'>Total earnings: </div>
            <div className='text-confirm font-bold'>&#8377;{plan_cycle * plan_daily_earning}</div>
          </div>
          <div className="basic_info text-white flex justify-start gap-1  mx-1">
            <div className='opacity-80 text-black'>Complete Cycle:</div>
            <div className='text-confirm font-bold'>{plan_cycle} days</div>
          </div>

          
          {pre_sale === true ? (
            <div className="cursor-pointer btn text-black font-semibold text-center  py-2  px-2 mt-5 text-md mb-2 shadow-md rounded-md  w-[85%] mx-auto bg-pre_sale">
              Pre-Sale
            </div>
          ) : null}

          {
            pre_sale === false ? (
              product_type === 'long' ? (
                <div className="cursor-pointer btn text-white font-semibold text-center  py-2  px-1 mt-5 text-sm mb-2 shadow-xs rounded-md  w-[85%] mx-auto bg-confirm border-white border"
                  onClick={() => handleClick(product_type, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle)}>
                  Get
                </div>
              ) : (long_plan_state === true) ? (
                <div className="cursor-pointer btn text-white font-semibold text-center  py-2  px-1 mt-5 text-sm mb-2 shadow-xs rounded-md  w-[85%] mx-auto bg-confirm border-white border">
                  Get
                </div>
              ) : (
                <div className="cursor-pointer btn text-white font-semibold text-center  py-2  px-1 mt-5 text-sm mb-2 shadow-xs rounded-md  w-[85%] mx-auto bg-confirm border-white border"
                  onClick={() => handleClick(product_type, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle)}>
                  Get
                </div>
              )
            ) : null
          }

        </div>
      </div>
      {/* {console.log(pre_sale, product_type, long_plan_state)} */}
    </div>
  )
}

export default Card