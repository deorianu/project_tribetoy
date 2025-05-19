import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import HomeBanner from "../../Components/HomeBanner";
import { IoMdArrowForward } from "react-icons/io";

import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { fecthDataFormApi } from "../../utils/api";

import ProductItem from "../../Components/ProductItem";
import HomeCat from "../../Components/HomeCat";
import { MyContext } from "../../App";
import Seminar from "../../assets/images/seminar.jpg";
import Alcheringa from "../../assets/images/alche1.jpeg";
import North from "../../assets/images/north1.jpeg";
import { IoIosArrowDown } from "react-icons/io";
import advantage_assam1 from "../../assets/images/advantage_assam1.jpeg";
import indo1 from "../../assets/images/indo1.jpeg";
import customize from "../../assets/images/customizing.mp4";
import comingsoon from "../../assets/images/comingsoon.mp4";

const Home= () =>{

const [catData, setCatData ] = useState([]);
const [ featuredProducts, setFeaturedProducts] = useState([]);
const [ productData, setProductData] = useState([]);

// const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

const context = useContext(MyContext)

useEffect(() => {
fecthDataFormApi('/api/category').then((res)=>{
    setCatData(res);
    
})

fecthDataFormApi('/api/product/featured').then((res)=>{
    setFeaturedProducts(res)
})
fecthDataFormApi('/api/product?perPage=8').then((res)=>{
    setProductData(res)
    
})

}, []);


    return(
        <>
           <HomeBanner />
            <div  >
            {catData?.length !== 0 && <HomeCat catData={catData} />}           
            </div>

            <section className="homeProducts " style={{ background: "#E0FFFF" }}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 productRow ">
              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0 hd">FEATURED PRODUCT</h3>
                  <p className="text-light text-lg mb-0">
                    Do not miss the current offers.
                  </p>
                </div>

                <Link to={"/allProduct"}>
                  <Button className="viewAll ml-auto">
                    View All
                    <IoMdArrowForward />
                  </Button>
                </Link>
              </div>

              {/* SWIPER FOR FEATURED PRODUCTS */}
              <div className="product_row w-100 mt-4">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  slidesPerGroup={1}
                  loop={true}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                 
                  modules={[ Autoplay]}
                  breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                  }}
                  className="productSwiper"
                >
                  {featuredProducts?.length !== 0 &&
                    featuredProducts?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <ProductItem item={item} />
                      </SwiperSlide>
                    ))}
                </Swiper>

              
              </div>
            </div>

            
          </div>
        </div>
      </section>

      {/* NEW PRODUCTS SECTION */}
      <section className="homeProducts" style={{ background: "#FFF0F5" }}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 productRow">
              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                  <p className="text-dark text-lg mb-0">
                    New products with updated stocks.
                  </p>
                </div>
                <Link to={"/allProduct"}>
                  <Button className="viewAll ml-auto">
                    View All
                    <IoMdArrowForward />
                  </Button>
                </Link>
              </div>

              {/* SWIPER FOR NEW PRODUCTS */}
              <div className="product_row w-100 mt-4">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  slidesPerGroup={1}
                  loop={true}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  
                  modules={[ Autoplay]}
                  breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                  }}
                  className="productSwiper"
                >
                  {productData?.products?.length !== 0 &&
                    productData?.products?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <ProductItem item={item} />
                      </SwiperSlide>
                    ))}
                </Swiper>

               
              </div>
            </div>

            
          </div>
        </div>
      </section>
            
    <div
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${Seminar})`, // Shared Background Image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Single Blur Overlay for Both Sections */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-6xl"></div>

      {/* Second Section */}
      <section className="efforts-section py-5 mt-4 relative z-10">
        <div className="container">
          <h3 className="mb-4 custom-heading">OUR EVENTS <IoIosArrowDown /></h3>
          <div className="efforts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="effort-card bg-white/5 p-4 rounded-lg shadow-lg backdrop-blur-md">
              <img src={Alcheringa} className="effort-image h-48 w-full object-cover rounded-lg" alt="Effort 1" />
              <div className="effort-content">
                <h5 className="effort-title">
                  Two-Day Event on Hand Painting & Beautification of Biodegradable Toys
                </h5>
                <div className="event-date">1st & 2nd February 2025</div>
                <div className="event-venue">Alcheringa, IIT Guwahati</div>
                 <a href="#" target="_blank" rel="noopener noreferrer">read more..</a>
              </div>
            </div>
            <div className="effort-card bg-white/5 p-4 rounded-lg shadow-lg backdrop-blur-md">
              <img src={North} className="effort-image h-48 w-full object-cover rounded-lg" alt="Effort 2" />
              <div className="effort-content">
                <h5 className="effort-title">
                  Green Putola Kendra Showcase at North Gauhati College
                </h5>
                <div className="event-date">16th February 2025</div>
                <div className="event-venue">North Gauhati College, Assam</div>
                 <a href="#" target="_blank" rel="noopener noreferrer">read more..</a>
              </div>
            </div>
            <div className="effort-card bg-white/5 p-4 rounded-lg shadow-lg backdrop-blur-md">
              <img src={advantage_assam1} className="effort-image h-48 w-full object-cover rounded-lg" alt="Effort 2" />
              <div className="effort-content">
                <h5 className="effort-title">
                  Showcasing our products at "Advantage Assam 2.0 - Investment and Infrastructure Summit 2025"
                </h5>
                <div className="event-date">25th-26th February 2025</div>
                <div className="event-venue">Veterinary Field, Khanapara, Guwahati.</div>
                 <a href="#" target="_blank" rel="noopener noreferrer">read more...</a>
              </div>
            </div>
            <div className="effort-card bg-white/5 p-4 rounded-lg shadow-lg backdrop-blur-md">
              <img src={indo1} className="effort-image h-48 w-full object-cover rounded-lg" alt="Effort 2" />
              <div className="effort-content">
                <h5 className="effort-title">
                Consignment of 51 pieces distributed at INDO-JAPAN symposium 2025 at IITG
                </h5>
                <div className="event-date">3th March 2025</div>
                <div className="event-venue">IIT Guwahati, Assam</div>
                 <a href="#" target="_blank" rel="noopener noreferrer">read more..</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    </>      
    )
    }
    
    export default Home;