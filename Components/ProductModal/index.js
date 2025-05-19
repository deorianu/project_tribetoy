import { Button } from "@mui/material";
import { Dialog } from "@mui/material";
import { MdClose } from "react-icons/md";
import { Rating } from "@mui/material";
import 'swiper/css';
import 'swiper/css/navigation';
import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import QuantityBox from "../QuantityBox";
import { IoIosHeartEmpty } from "react-icons/io";
import ProductZoom from "../ProductZoom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ProductModal = (props) =>{
    const context = useContext(MyContext);

    const { id } = useParams();

    

    useEffect(() => {
        
        window.scrollTo(0,0)


      }, [id]);

    return(
        <div>
            <Dialog className="productModal" open={true} onClose={()=>context.setisOpenProductModal(false)}>
            <Button className='close_' onClick={() => context.setisOpenProductModal({ id: '', open: false })}>
            <MdClose /></Button>
                <h4 className="mb-2 font-weight-bold">{props?.data?.name}</h4>
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center mr-4">
                        <span>Brand:</span>
                        <span className="ml-2"><b>{props?.data?.brand}</b></span>
                    </div>                                            
                    <Rating name="read-only" value={parseInt(props?.data?.ratings)}  size="small" precision={0.5} readOnly />
                    
                </div>
                <hr />
                <div className="row mt-2 productDetailsModal">
                    <div className="col-md-5">
                        
                        <ProductZoom images={props?.data?.images} discount={props?.data?.discount}/>
                    </div>
                    
                    <div className="col-md-7">
                    <h4 className="mb-2 font-weight-bold">{props?.data?.name}</h4>
                    <div className="d-flex align-items-center mr-4">
                        <span>Brand:</span>
                        <span className="ml-2"><b>{props?.data?.brand}</b></span>
                    </div>
                        <div className=" d-flex align-items-center ProductInfo mb-3">
                            <span className="oldprice lg">Rs.{props?.data?.oldPrice}</span>
                            <span className="newprice text-danger ml-3 lg">Rs.{props?.data?.price}</span>
                        </div>
                        <span className="badge bg-success">In Stock &nbsp; ({props?.data?.countInStock})</span>
                        {/* Short description directly in JSX */}
                        <Link to={`/ProductDetails/${props?.data?.id}`} onClick={() => context.setisOpenProductModal(false)}>
                            <p className="mt-4">
                                <h5>
                                    {props?.data?.description?.length > 100 
                                        ? `${props?.data?.description.substring(0, 100)}...` 
                                        : props?.data?.description}
                                </h5>
                            </p>
                        </Link>
                        <div className="d-flex align-items-center mt-5">
                            <QuantityBox />
                            <Button className="btn-blue btn-lg btn-big btn-round ml-3"> ADD TO CART</Button>
                            <span className="ml-4"><Button className="btn-round btn-small" variant="outlined"> <IoIosHeartEmpty /> &nbsp; ADD TO WISHLIST</Button></span>
                        </div>

                        
                       
                    </div>

                    

                </div>
            </Dialog>
        </div>
    )
}

export default ProductModal;