import React from 'react';

import {emphasize , styled} from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';

import Slider from "react-slick";
import ronghura from "../../assets/images/ronghura.png"
import LinearProgress from '@mui/material/LinearProgress';
import logo from "../../assets/images/logo.png";
import { Button } from '@mui/material';

const StyledBreadCrumb = styled(Chip)(({theme}) =>{

    const [progress, setProgress] = React.useState(0);


    const backgroundcolor = 
        theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[700];
    return{
        backgroundcolor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&hover, &:focus' : {
            backgroundcolor: emphasize(backgroundcolor, 0.06),
        },
        '&active':{
            boxShadow: theme.shadows[1],
            backgroundcolor: emphasize(backgroundcolor, 0.12),
        },
    };
});



const ProductDetails = () =>{
    var productSlider = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

      var productSlidersmall = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false
      };

    const goToSlide = (index) =>
    {
        productSlider.current.slickGoTo(index);   
    }
    
    return(
        <>
        <div className="right-content w-100">
            <div className="card shadow border-0 w-100 flex row p-4">
                <h5 className="mb-0">Product View</h5> 
                <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                <StyledBreadCrumb
                    component="a"
                    href={'/'}
                    label="Dashboard"
                    icon={<HomeIcon fontSize="small" />}
                >
                </StyledBreadCrumb>

                <StyledBreadCrumb
                    component="a"
                    href={'/'}
                    label="Products"
                    
                >
                </StyledBreadCrumb>
                <StyledBreadCrumb
                    component="a"
                    href="#"
                    label="Product View"
                    
                >
                </StyledBreadCrumb>


                </Breadcrumbs>  
            </div>
        </div>

        <div className='card'>
            <div className='col-md-12'>
            <div className='row'>
                <div className='col-md-4 p-3'>
                    <h4>Product Gallery</h4>
                    <div className='sliderWrapper'>
                    <Slider {...productSlider}>
                    <div className='item'>
                        <img src={ronghura} alt='ronghura' className='w-100'></img>
                    </div>
                </Slider>
                <Slider {...productSlidersmall}>
                    <div className='item'>
                        <img src={ronghura} alt='ronghura' className='w-100'></img>
                    </div>
                    <div className='item'>
                        <img src={ronghura} alt='ronghura' className='w-100'></img>
                    </div>
                    <div className='item'>
                        <img src={ronghura} alt='ronghura' className='w-100'></img>
                    </div>
                    <div className='item'>
                        <img src={ronghura} alt='ronghura' className='w-100'></img>
                    </div>
                    <div className='item'>
                        <img src={ronghura} alt='ronghura' className='w-100'></img>
                    </div>
                    <div className='item'>
                        <img src={ronghura} alt='ronghura' className='w-100'></img>
                    </div>
                </Slider>
                    </div>
                
                </div>
                <div className='col-md-8'>
                    <h4>Product Details</h4>
                    <h3>Ron Ghura</h3>

                    <div className='productInfo'>
                        <div className='row'>
                            <div className='col-sm-5 d-flex align-items-center'>
                            
                                <span className='icon'></span>
                                <span className='name'> Brand: </span>
                                
                            </div>
                            <div className='col-sm-7'>
                                <span><strong>Green Putola</strong></span>
                                
                                
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-5 d-flex align-items-center'>
                                
                                <span className='icon'></span>
                                <span className='name'> Category: </span>
                                
                            </div>
                            <div className='col-sm-7'>
                                
                                <span><strong>Historical Monuments</strong></span>
                                
                            </div>
                        </div>
                        
                        <div className='row'>
                            <div className='col-sm-5 d-flex align-items-center'>
                                
                                <span className='icon'></span>
                                <span className='name'> Price: </span>
                                
                            </div>
                            <div className='col-sm-7'>
                                <del className='old'><strong>₹300</strong></del>
                                <span className='new text-danger'><strong>₹200</strong></span>
                                
                                
                            </div>
                        </div>
                        
                        <div className='row'>
                            <div className='col-sm-5 d-flex align-items-center'>
                                
                                <span className='icon'></span>
                                <span className='name'> Stock: </span>
                                
                            </div>
                            <div className='col-sm-7'>
                            <strong>(10) Pieces</strong>
                                
                                
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-5 d-flex align-items-center'>
                                
                                <span className='icon'></span>
                                <span className='name'> Review: </span>
                                
                            </div>
                            <div className='col-sm-7'>
                            <span><strong>(20) Review</strong></span>
                                
                            </div>
                        </div>
                    </div>

                </div>

                
                
            </div>

            <div className='row mt-5 p-3 card ml-3 mr-3'>
                    <div className='col-md-12'>
                        <h4>Product Description</h4>
                        <p>djsjhfsd snmdbsnbsjds dsjkdhsjkdsnjdk jkdasjkdasjkdnas jdsjkdsjkd</p>
                    </div>
            </div>

            <div className="row mt-5 ml-3 mr-3 card p-3">
                <div className="ratingSection">
                    <h4>Ratings Analytics</h4>
                    {[
                    { stars: 5, value: 80 },
                    { stars: 4, value: 60 },
                    { stars: 3, value: 40 },
                    { stars: 2, value: 20 },
                    { stars: 1, value: 10 },
                    ].map((rating) => (
                    <div className="d-flex align-items-center mb-3" key={rating.stars}>
                        <span className="col1">{rating.stars} star</span>
                        <div className="col-md-8 px-3">
                        <LinearProgress variant="determinate" value={rating.value} />
                        </div>
                        <span className="col2">{rating.value}%</span>
                    </div>
                    ))}
                </div>
                </div>


                <div className="row mt-5 ml-3 mr-3 card p-3">
                <div className="reviewSection">
                    <h4>Customer Reviews</h4>
                    <div className="reviewsRow">
                    {[
                        {
                        username: "John Doe",
                        userImage: { logo },
                        rating: 4,
                        review: "Great product! Really loved the quality and the service was excellent.",
                        },
                        {
                        username: "Jane Smith",
                        userImage: "https://via.placeholder.com/50",
                        rating: 5,
                        review: "Amazing experience! Highly recommend to anyone looking for eco-friendly options.",
                        },
                    ].map((review, index) => (
                        <div className="reviewCard" key={index}>
                        
                        <div className="userInfo">
                            <img src={logo} alt={`${review.username} avatar`} />
                            <div className="userDetails">
                            <span className="username">{review.username}</span>
                            <span> 1 hour ago!</span>
                            <div className="ratingStars">
                                {"★".repeat(review.rating)}
                                {"☆".repeat(5 - review.rating)}
                            </div>
                            </div>
                        </div>
                        <p className="userReview">{review.review}</p>
                        <div className="replyButton ml-auto">
                            <button>
                            <span className="replyIcon">↩️</span> Reply
                            </button>
                        </div>
                        </div>
                    ))}

                    <h5>Review reply form</h5>

                    <form className='reviewForm'>
                        <textarea className='w-100 p-3' placeholder='write your review'>
                            
                        </textarea>
                        <Button className='btn btn-primary'>Drop your review</Button>
                    </form>
                    </div>

                </div>
                </div>



         </div>
        </div>
        </>
    )
}

export default ProductDetails;