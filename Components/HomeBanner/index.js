import React from "react";
import { Navigation, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import welcome_banner from "../../assets/images/Banner1.png"
import souvenir_banner from "../../assets/images/Banner2.png"
import home_decor from "../../assets/images/Shop Now.png"
import { Link } from "react-router-dom";

const HomeBanner = () =>{


    return(
        <div className="container">
            <div className=" homeBannerSection">
            <Swiper
                spaceBetween={15} 
                slidesPerView={1}
                
                loop={false}
                autoplay={
                   {
                    delay: 3000,
                    disableOnInteraction: true,
                   } 

                }
                modules={[ Autoplay]}
                className="mySwiper"
                // breakpoints={{
                //     640: { slidesPerView: 1 }, // For smaller screens
                //     768: { slidesPerView: 2 }, // For tablets
                //     1024: { slidesPerView: 4 }, // For desktops
                //     }}
                >
            <SwiperSlide>
                <div className="item">
                <Link to={'/allProduct'}>
                <img src={welcome_banner} className="w-100 " alt="welcome_banner" />
                </Link>
                                    
                    
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                <Link to={'/allProduct'}>
                    <img src={home_decor} className="w-100" alt="home_decor" />
                </Link>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">  
                <Link to={'/allProduct'}>                  
                <img src={souvenir_banner} className="w-100"  alt="souvenir_banner"/>
                </Link>
                </div>
            </SwiperSlide>
            </Swiper>  
            
            </div>
        </div>
    );
}

export default HomeBanner;