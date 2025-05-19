import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { MyContext } from "../../App";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { deleteData, fecthDataFormApi } from "../../utils/api";


const MyList = () => {
const [ myListData, setMyListData ] = useState([]);

 const context = useContext(MyContext)

 useEffect(()=>{
  const user = JSON.parse(localStorage.getItem("user"));
  fecthDataFormApi(`/api/MyList?userId=${user?.id}`).then((res)=>{
    setMyListData(res);

  })
 },[])


const removeProduct=(id)=>{
  deleteData(`/api/MyList/${id}`).then((res)=>{
    context.setAlertBox({
      msg:"item removed successfully from your MyList!",
    error:false,
    open:true
    })
    const user = JSON.parse(localStorage.getItem("user"));
    fecthDataFormApi(`/api/MyList?userId=${user?.id}`).then((res)=>{
      setMyListData(res);
    })

  })
}
  return (
    <section className="wishList section">
    
      <div className="container">
      {myListData?.length === 0 ? (
          <div className="text-center mt-5">
            <h3>Your WishList is empty!</h3>
            <p>Looks like you haven't added anything to your wish list yet.</p>
            <Link to="/" className="btn btn-danger">Continue Shopping</Link>
          </div>
        ) : (
      <div className="row">  
          <div className="col-8">
            <h3>Your WishList </h3>
            <p>There are <b>{myListData?.length}</b> products on your WishList</p>
            
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    myListData?.length!==0 && myListData?.map((item, index)=>{
                      return(
                    <tr>
                    <td>
                      <div className="d-flex align-items-center cartImageWrapper">
                        <div className="imageWrapper">
                          <Link to={`/productDetails/${item?.productId}`}>
                            <img src={`https://localhost:4000/uploads/${item?.image}`} alt={item?.productTitle} />
                          </Link>
                        </div>
                        <div className="info">
                          <Link to={`/productDetails/${item?.productId}`}>
                            <h5>{item?.productTitle?.substr(0,20)+'...'}</h5>
                            <Rating value={item?.rating} readOnly />
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td>Rs.{item?.price}</td>
                    
                    
                    <td>
                      <button className="btn btn-danger" onClick={()=> removeProduct(item?._id)}>Remove</button>
                    </td>
                  </tr>
                      )
                  
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

           
    </div>
    )}
  </div>
                
  </section>
  );
};

export default MyList;
