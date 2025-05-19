import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ProductZoom from "../../Components/ProductZoom";
import Rating from "@mui/material/Rating";
import QuantityBox from "../../Components/QuantityBox";
import { Button, Modal, Box, CircularProgress } from "@mui/material";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import RelatedProduct from "./RelatedProducts";
import cartoon from "../../assets/images/cartoon.jpg";
import { fecthDataFormApi } from "../../utils/api";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";


const ProductDetails = () => {

  const { id } = useParams(); // Get the product ID from the URL
  const [isModalOpen, setModalOpen] = useState(false);
  const [ProductData, setProductData] = useState(null);
  const [relatedProductData, setRelatedProductData] = useState([]);
  const [ recentelyViewProduct, setRecentlyViewProduct] = useState([]);
  const [ isloading, setIsLoading ] = useState();
  const [ reviewData, setReviewData ] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  let [cartFields, setCartFields ] = useState({});
  let [productQuantity, setProductQuantity ] = useState({});

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

const context = useContext(MyContext)
const user = JSON.parse(localStorage.getItem("user"));
  
  // Fetch product details when the component loads
  useEffect(() => {
    window.scrollTo(0,0);

    fecthDataFormApi(`/api/product/${id}`).then((res)=>{
      setProductData(res);
      console.log("Product Data:", res);

      fecthDataFormApi(`/api/reviews?productId=${id}`).then((res)=>{
        setReviewData(res);
      })
    
    fecthDataFormApi(`/api/product?categoryId=${res?.categoryId}`).then((res)=>{
      const filteredData = res?.products?.filter(item=> item.id !== id);
      setRelatedProductData(filteredData)

    })
    
      // fecthDataFormApi(`/api/product/recentlyViewProduct`).then((response)=>{ 
      //   setRecentlyViewProduct(response)
      // })
      // postData(`/api/product/recentlyViewProduct`,res);


  });
  
  if (user) {
    fecthDataFormApi(`/api/MyList?productId=${id}&userId=${user?.id}`)
        .then((res) => {
            if (res.length > 0) {
                setIsInWishlist(true);
            }
        })
        .catch((err) => console.error("Error fetching wishlist data:", err));
}

  },[id]);

  const quantity=(val)=>{

    setProductQuantity(val);
    
  }

  const addtoCart =()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    
      cartFields.productTitle = ProductData?.name
      cartFields.image = ProductData?.images[0]
      cartFields.rating = ProductData?.ratings
      cartFields.price = ProductData?.price
      cartFields.quantity = productQuantity
      cartFields.total = parseInt(ProductData?.price * productQuantity ) 
      cartFields.productId = ProductData?.id
      cartFields.userId = user?.id

    context.getCartData();
    context.addToCart(cartFields)
  }

  const selectedItem=()=>{

  }
const [rating, setRating] = useState(1);
const [ reviews , setReviews ] = useState({
  productId: "",
  customerName: "",
  customerId:"",
  review: "",
  customerRatings: 0
  
});

const onChangeInput = (e)=>{
  setReviews(()=>({
    ...reviews,
    [e.target.name]:e.target.value
  }))
}

const changeRating = (e)=>{
  setRating(e.target.value);
  reviews.customerRatings= e.target.value
}

const addReview = (e)=>{
e.preventDefault();



const user = JSON.parse(localStorage.getItem("user"));

reviews.customerName = user?.name;
reviews.customerId = user?.id;
reviews.productId = id;

setIsLoading(true)

postData('/api/reviews/add', reviews).then((res) => {
  setIsLoading(false)

  reviews.customerRatings = 1;
  setReviews({
  review:"",
  customerRatings:1
  })
  
  

  fecthDataFormApi(`/api/reviews?productId=${id}`).then((res)=>{
    setReviewData(res);
  })
}).catch((err) => {
  console.error("Error adding review:", err);
});



};

const addToMyList = (id) =>{
  const user = JSON.parse(localStorage.getItem("user"));
  if(user!==undefined && user!==null && user!==""){
      const data = {
          productTitle: ProductData?.name,
          image: ProductData?.images[0],
          rating: ProductData?.ratings,
          price: ProductData?.price,
          productId: id,
          userId: user?.id
      }
      postData(`/api/MyList/add`, data).then((res)=>{
          if(res.status!==false){
              console.log(data)
              context.setAlertBox({
                  open:true,
                  error:false,
                  msg:'Product added in your wishList!'
              })
          }else{
              context.setAlertBox({
                  open:true,
                  error:true,
                  msg:res.msg
              })
          }
          
      })
  }else{
      context.setAlertBox({
          open:true,
          error:true,
          msg:'Please login to continue!'
      })
  }
  
}
  return (
    <>
      <section className="productDetails section">
        <div className="container card bg-light p-4 ml-8">
          <h2 className="hd text-capitalize text-dark mb-4 ml-4">{ProductData?.name}</h2>

          <div className="d-flex align-items-center mb-3">
            <h5 className="text-secondary mr-2 ml-4">Brand:</h5>
            <span><h5 className="text-dark font-weight-bold">{ProductData?.brand}</h5></span>
          </div>

          <hr />

          <div className="row">
            <div className="col-md-4 sticky-section">
            <ProductZoom images={ProductData?.images} discount={ProductData?.discount}/>
            </div>

            <div className="col-md-6 ml-md-5 scrollable-content">
              <div className="row card">
              <h3 className="hd text-capitalize font-weight-bold">{ProductData?.name}</h3>
              <div className="productAbout">
                <ul className="list-unstyled mt-3">
                  <li className="mb-3">
                    <span className="text-secondary font-weight-bold">
                      Offer Price:
                    </span>{" "}
                    <span className="text-success font-weight-bold ml-2">
                    ₹{ProductData?.price}
                    </span>
                    <span className="price text-muted ml-2">
                      <del>₹{ProductData?.oldPrice}</del>
                    </span>
                    <span className="text-success font-weight-bold ml-2">
                    {ProductData?.discount}% off
                    </span>
                  </li>

                  <li className="mb-2">
                    <span className="badge bg-success">
                    {ProductData?.discount}% off
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="badge bg-success">In Stock ({ProductData?.countInStock})</span>
                  </li>
                  <li className="mb-3">
                    <Rating
                      name="half-rating-read"
                      value={parseInt(ProductData?.ratings)}
                      precision={1}
                      readOnly
                      size="small"
                    />
                    
                  </li>
                </ul>
                <div className="d-flex align-items-center mt-2 ml-2">
                  <QuantityBox className="quantity-box" quantity={quantity} selectedItem={selectedItem}/>
                  <Button className="btn-blue btn-lg btn-big btn-round ml-3"
                  onClick={()=>addtoCart(ProductData)}>
                    <BsCart2 /> &nbsp; ADD TO CART
                  </Button>
                  <Button
                    className="btn-lg btn-big btn-round ml-3 "
                    variant="outlined"
                    onClick={()=>addToMyList(id)}
                  >
                    {isInWishlist ? (
                            <IoIosHeart style={{ fontSize: '20px', color: 'red' }} /> 
                        ): (
                            <IoIosHeartEmpty style={{ fontSize: '20px' }} />
                        )}Add to WishList
                  </Button>
                </div>
              </div>
              
              </div>

              <div className="details mt-5">

                <div className="row card mt-5 about_product">
                  <h4>About product</h4>
                  <p>{ProductData?.description}</p>
                </div>
                

                <div className=" row card reviewsCard mt-5">
                  <h2 className="hd text-capitalize ml-4 mt-3">Reviews({reviewData?.length})</h2>
                  {
                    //here slice(0)?.reverse() used to recently added review is display first
                  reviewData?.length!==0 && reviewData?.slice(0)?.reverse()?.map((review, index) => {
                    return(
                      <div className="review mt-3 ml-4 d-flex" key={index}>
                      <div>
                        <h5 className="text-dark font-weight-bold">{review?.customerName}</h5>
                        <h6 className="text-light">
                        {new Date(review?.dateCreated).toISOString().split("T")[0]} 
                        </h6>
                        <div className="mt-2">
                          <Rating
                            name="size-small"
                            value={review?.customerRatings}
                            precision={0.5}
                            readOnly
                            size="small"
                          />
                        </div>
                        <p className="mt-2">{review?.review}</p>
                      </div>
                    </div>
                    )
                  }
                    
                  )}
                </div>

                <div className="row card mt-5">
                <h2 className="hd text-capitalize mt-3 ml-3">
                  Write your review{" "}
                  <Button onClick={handleOpen}>
                    <AiOutlinePlus size={24} />
                  </Button>
                </h2>
              </div>
              <br/>

              </div>
              
            </div>
          </div>
        </div>

        <Modal
          open={isModalOpen}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "40%",
              left: "70%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",             
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <h2 id="modal-title">Write your review</h2>
            <form className="reviewForm" onSubmit={addReview}>
              <div className="mb-3">
                <label htmlFor="review" className="form-label">
                  Review:
                </label>
                <textarea
                  id="review"
                  className="form-control"
                  rows="4"
                  placeholder="Write your review here.."
                  name="review" onChange={onChangeInput}
                  value={reviews?.review}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Rating:
                </label>
                <Rating
                      name="customerRatings"
                      value={rating}
                      precision={1}
                      onChange={changeRating}
                    />    
              </div>
              <button type="submit" className="btn btn-primary">
                {
                  isloading === true ? <CircularProgress  color="inherit" className="loder" /> 
                  :
                  'Submit Review'
                }
                
              </button>
            </form>
          </Box>
        </Modal>

        <div className="container card bg-light p-4 mt-3 ">

          {
            relatedProductData?.length!==0 && 
            <RelatedProduct title="Simillar Products" data={relatedProductData}/>
          }
          
        </div>
        {/* <div className="container card bg-light p-4 mt-3 ">
        {
            recentelyViewProduct?.length!==0 && 
            <RelatedProduct title="Recently Viewed Products" itemView={"recentelyView"} data={recentelyViewProduct} />
          }
     
        </div> */}
      </section>
    </>
  );
};

export default ProductDetails;
