import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import elephant from "../../assets/images/elephant.png";
import InnerImageZoom from "react-inner-image-zoom";
import { Navigation } from "swiper/modules";
import { useRef, useState } from 'react';

import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

const ProductZoom = (props) =>{
    const [slideIndex, setSlideIndex] = useState(0);

    const zoomSliderBig = useRef();
    const zoomSlider = useRef();

    const goto = (index) =>{
        setSlideIndex(index);
        zoomSlider.current.swiper.slideTo(index);
        zoomSliderBig.current.swiper.slideTo(index);
    }
    return(
        <div className="productZoom">
            <div className="productZoom productZoom_height position-relative">

                            <div className="badge badge-primary">{props?.discount}%</div>
                            <Swiper 
                                slidesPerView={1}
                                spaceBetween={0}
                                navigation={false}
                                slidesPerGroup={1}
                                modules={[Navigation]}
                                className="zoomSliderBig" 
                                ref={zoomSliderBig}>

                        {
                            props?.images?.map((img,index)=>{
                                return(
                                <SwiperSlide key={index}>
                                <div className="item">
                                    <InnerImageZoom
                                        zoomType="hover" zoomScale={1}
                                        src={`https://tribetoy-server-4.onrender.com/uploads/${img}`}
                                    ></InnerImageZoom>
                                </div>
                            </SwiperSlide>
                                )
                            
                            })
                        }
                                  
                        </Swiper>

            </div>
            <div className="productZoom IneerProductZoom_height position-relative">
                    <Swiper 
                                slidesPerView={4}
                                spaceBetween={0}
                                navigation={{
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                }}
                                slidesPerGroup={1}
                                // modules={[Navigation]}
                                className="zoomSlider" 
                                ref={zoomSlider}>

                        {
                            props?.images?.map((img,index)=>{
                                return(
                                    <SwiperSlide >    
                                    <div className={`item ${slideIndex === index && 'item_active'}`} key={index}>
                                        <img src={`https://tribetoy-server-4.onrender.com/uploads/${img}`} alt={img.name} className="w-100 img" onClick={() => goto(index)}/>
                                    </div>
                                    </SwiperSlide>
                                )
                            
                            })
                        }
                            
                    </Swiper>
            </div>
        </div>
    )
}

export default ProductZoom;