import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import tuborg_slide1 from '../images/tuborg_slide1.jpg';
import tuborg_slide2 from '../images/tuborg_slide2.jpg';
import tuborg_slide3 from '../images/tuborg_slide3.jpg';

import lenscart_slide1 from '../images/lenscart_slide1.webp'
import lenscart_slide2 from '../images/lenscart_slide2.gif'
import lenscart_slide3 from '../images/lenscart_slide3.webp'
import lenscart_slide4 from '../images/lenscart_slide4.webp'
import lenscart_slide5 from '../images/lenscart_slide5.gif'

import asset11 from '../images/asml/asset 11.jpeg';
import asset12 from '../images/asml/asset 12.jpeg';

import s1 from '../images/dj/slide1.jpg';
import s2 from '../images/dj/slide2.jpg';
import s3 from '../images/dj/slide3.jpg';
import s4 from '../images/dj/slide4.jpg';

import slide1 from '../images/dj/slide1.png';
import slide2 from '../images/asml/slide2.jpg';
import slide3 from '../images/asml/slide3.jpg';
import slide4 from '../images/asml/slide4.jpg';
import slide5 from '../images/asml/slide5.jpg';
import slide6 from '../images/asml/slide6.jpg';
import slide7 from '../images/asml/slide7.png';
import slide8 from '../images/asml/slide8.png';
import ceat_slide from '../images/asml/ceat_slide.jpg';
import boat_logo from '../images/asml/boat/boat_logo.jpg';
import boat_slide1 from '../images/asml/boat/boat_slide1.png';
import boat_slide2 from '../images/asml/boat/boat_slide2.png';
import boat_slide3 from '../images/asml/boat/boat_slide3.png';
import boat_slide4 from '../images/asml/boat/boat_slide4.png';

const Slider = () => {
  return (
    <div className='sm:w-3/5 lg:w-3/5 mx-2 py-2'>
        {/* <div className='w-full'>
          <img src={boat_logo} className="h-[180px] w-full" alt="img_2" />
        </div> */}
        <Carousel showThumbs={false} autoPlay showArrows={true} infiniteLoop statusFormatter={()=>''}>
        <div>
          <img src={s1} className="h-[190px] rounded-md" alt="img_2" />
        </div>

        <div>
          <img src={s2} className="h-[190px] rounded-md" alt="img_1" />
        </div>

        <div>
          <img src={s3} className="h-[190px] rounded-md" alt="img_1" />
        </div>

        <div>
          <img src={s4} className="h-[190px] rounded-md" alt="img_1" />
        </div>

      </Carousel>
    </div>
  )
}

export default Slider;
