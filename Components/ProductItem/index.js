import Rating from '@mui/material/Rating';
import { SlSizeFullscreen } from "react-icons/sl";
import { Button } from '@mui/material';
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { useContext, useEffect, useState } from 'react';
import { MyContext } from "../../App";
import { Link } from 'react-router-dom';
import { fecthDataFormApi, postData } from '../../utils/api';

const ProductItem= (props)=>{
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);

    const context = useContext(MyContext);
    const user = JSON.parse(localStorage.getItem("user"));
    
    const viewProductDetails = (id)=>{
        context.setisOpenProductModal({
            id:id,
            open:true
        });

    }

  

    useEffect(() => {
        
        window.scrollTo(0,0)
       if (user) {
            fecthDataFormApi(`/api/MyList?productId=${props?.item?.id}&userId=${user?.id}`)
                .then((res) => {
                    if (res.length > 0) {
                        setIsInWishlist(true);
                    }
                })
                .catch((err) => console.error("Error fetching wishlist data:", err));
        }
    }, [props.item]);

    const addToMyList = (id) =>{
        const user = JSON.parse(localStorage.getItem("user"));
        if(user!==undefined && user!==null && user!==""){
            const data = {
                productTitle: props.item?.name,
                image: props.item?.images[0],
                rating: props?.item?.ratings,
                price: props?.item?.price,
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
    
    return(
        <>
        <div className={`productItem transition-all duration-300 ease-in-out rounded-lg overflow-hidden shadow-lg hover:shadow-xl bg-white ${props?.itemView}`}
        
        onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>

            <div className="imageWrapper">
            <Link to={`/ProductDetails/${props?.item?.id}`}>
            <img src={` https://localhost:4000/uploads/${props.item?.images[0]}`} alt={props.item?.name} className="w-full h-64 object-cover rounded-t-lg" /></Link>
                
                    <span className="badge badge-primary">{props?.item?.discount}%</span>
                    <div className="actions">
                    <Button onClick={() => addToMyList(props?.item?.id)}>
                        {isInWishlist ? (
                            <IoIosHeart style={{ fontSize: '20px', color: 'red' }} />
                        ) : (
                            <IoIosHeartEmpty style={{ fontSize: '20px' }} />
                        )}
                    </Button>
                </div>
            </div>
                     
            <div className="ProductInfo">
            <Link to={`/ProductDetails/${props?.item?.id}`}> 
                <h4>{props?.item?.name?.substr(0,30)+'...'}</h4></Link>
                    <span className="d-block text-success">In stock &nbsp; ({props?.item?.countInStock})</span>
                    
                        <Rating className="mt-2 mb-2" name="read-only" value={parseInt(props?.item?.ratings)} readOnly size="small" />
                            <div className="d-flex">
                                <span className="oldprice">Rs.{props?.item?.oldPrice}</span>
                                <span className="newprice text-danger ml-3">Rs.{props?.item?.price}</span>
                            </div>                                              
            </div>           
        </div> 
    </>
    );
};

export default ProductItem;