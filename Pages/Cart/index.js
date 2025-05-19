import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import QuantityBox from "../../Components/QuantityBox";
import { MyContext } from "../../App";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { deleteData, editData, fecthDataFormApi } from "../../utils/api";
import { IoBagCheckOutline } from "react-icons/io5";

const Cart = () => {
  const [ addCart, setAddCart ] = useState([]);
  const [productQuantity, setProductQuantity ] = useState();
  const [cartFields, setCartFields ] = useState({});
  const [ selectedQuantity, setSelectedQuantity] = useState();
  const [ changeQuantity, setChangeQuantity ] = useState(0);
 const context = useContext(MyContext)

 useEffect(()=>{
  const user = JSON.parse(localStorage.getItem("user"));
  fecthDataFormApi(`/api/cart?userId=${user?.id}`).then((res)=>{
    setAddCart(res);
    setSelectedQuantity(res?.quantity);
  })
 },[])

const quantity=(val)=>{
setProductQuantity(val);
setChangeQuantity(val)
}


const selectedItem=(item, quantityVal)=>{
  if(changeQuantity!==0){
    const user = JSON.parse(localStorage.getItem("user"));
    
    cartFields.productTitle = item?.name
    cartFields.image = item?.image
    cartFields.rating = item?.rating
    cartFields.price = item?.price
    cartFields.quantity = quantityVal
    cartFields.total = parseInt(item?.price * quantityVal ) 
    cartFields.productId = item?.productId
    cartFields.userId = user?.id

    editData(`/api/cart/${item._id}`, cartFields).then((res)=>{
      fecthDataFormApi(`/api/cart`).then((res)=>{
        setAddCart(res);
      })
    })
  }


  
}

const removeProduct=(id)=>{
  deleteData(`/api/cart/${id}`, cartFields).then((res)=>{
    context.setAlertBox({
      msg:"item removed successfully from your cart!",
    error:false,
    open:true
    })
    const user = JSON.parse(localStorage.getItem("user"));
    fecthDataFormApi(`/api/cart?userId=${user?.id}`).then((res)=>{
      setAddCart(res);
    })

    context.getCartData();
  })
}
  return (
    <section className="cart section py-4">
  <div className="container">
    {addCart?.length === 0 ? (
      <div className="text-center mt-5">
        <h3>Your cart is empty!</h3>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="btn btn-danger mt-3">
          Continue Shopping
        </Link>
      </div>
    ) : (
      <div className="row">
        {/* Cart Items */}
        <div className="col-md-12 mb-4">
          <h3>Your Shopping Cart</h3>
          <p>
            There are <b>{addCart?.length}</b> products in your cart
          </p>
          <div className="table-responsive" style={{ overflowX: "auto" }}>
            <table className="table" style={{ minWidth: "600px" }}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {addCart.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center cartImageWrapper">
                        <div className="me-md-3 mb-2 mb-md-0">
                          <Link to={`/productDetails/${item?.productId}`}>
                            <img
                              src={`https://localhost:4000/uploads/${item?.image}`}
                              alt={item?.productTitle}
                              style={{ width: "80px", height: "auto" }}
                              className="img-fluid"
                            />
                          </Link>
                        </div>
                        <div className="info">
                          <Link to={`/productDetails/${item?.productId}`}>
                            <h6 className="mb-1">
                              {item?.productTitle?.substr(0, 20) + "..."}
                            </h6>
                            <Rating value={item?.rating} readOnly />
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td>Rs.{item?.price}</td>
                    <td>
                      <QuantityBox
                        quantity={quantity}
                        item={item}
                        selectedItem={selectedItem}
                        value={item?.quantity}
                      />
                    </td>
                    <td>Rs.{item?.total}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeProduct(item?._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
<hr/>
        {/* Order Summary */}
  <div className="col-sm-6 mb-4">
  <div className="border p-3 rounded shadow-sm">
    <h4 className="mb-3 text-center">Order Summary</h4>
    
    <div className="d-flex justify-content-center">
      <table className="table table-borderless mb-3 w-auto">
        <tbody>
          <tr>
            <td><strong>Total</strong></td>
            <td>
              Rs.
              {addCart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Link to="/checkout" className="w-100 d-block mt-3">
      <button className="btn btn-primary w-100">
        <IoBagCheckOutline /> &nbsp;Proceed to Checkout
      </button>
    </Link>
  </div>
</div>
</div>
    )}
  </div>
</section>

  );
};

export default Cart;
