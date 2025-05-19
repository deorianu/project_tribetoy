import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductItem from '../../../Components/ProductItem';
import { Button } from '@mui/material';
import { IoMdArrowForward } from "react-icons/io";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const RelatedProduct =(props) =>{

const { id } =useParams();


    return(
        <>
        <div className="d-flex align-items-center">
            <div className="info w-75">
                <h4 className="mb-0 hd">{props.title}</h4>
                <p className="text-light text-sm mb-0">Do not miss the current offers.</p>
            </div>
                <Button className="viewAll ml-auto">
                    View All
                <IoMdArrowForward />
                </Button>
        </div>
            
        <div className="relatedProduct w-100 mt-4">
            <Swiper
            spaceBetween={10} 
            slidesPerView={1}
            navigation={false}
            slidesPerGroup={1} 
            autoplay={true}
            loop 
            modules={[Navigation, Autoplay]}
            breakpoints={{
                640: { slidesPerView: 1 }, // Small screens
                768: { slidesPerView: 2 }, // Tablets
                1024: { slidesPerView: 5 }, // Desktop
              }}
            className="relatedProductSwiper"
            >

        {
            props?.data?.length!==0 && props?.data?.map((item, index)=>{
        return(
        <SwiperSlide key={index}>
            <ProductItem item={item} />
        </SwiperSlide>
        )
            })
          }
        
                                      
    </Swiper>
    </div>

    </>
    )
}

export default RelatedProduct;