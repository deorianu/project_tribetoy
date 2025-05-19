import { Link } from "react-router-dom";
import axios from 'axios';
import { MyContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { fecthDataFormApi } from "../../utils/api";
import { Pagination } from "@mui/material";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [ page, setPage ] = useState(1);
  const context = useContext(MyContext);
  const userId = localStorage.getItem('userId');
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0,0);

    fecthDataFormApi("/api/orders?page=1&perPage=8").then((res)=>{
      setOrders(res);
      console.log(orders)
    })
  }, []);

  const handleChange = (event, value)=>{
    setPage(value)
    fecthDataFormApi(`/api/orders?page=${value}&perPage=8`).then((res)=>{
      setOrders(res);
      window.scrollTo({
        top:200,
        behavior: 'smooth',
      })
    })
  };

  return (
    <section className="orders section px-4 py-6">
      <div className="container">
        <h2>Orders</h2>
        <table className="table table-responsive table-striped table-bordered" style={{overflowX:"scroll"}}>
          <thead className="thead-dark">
            <tr >
              <th>Payment Id</th>
              <th>Name</th>
              <th>Products</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Zipcode</th>
              <th>Address</th>
              <th>Total Amount</th>
              <th>Order Status</th>
              <th>User Id</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders?.orders?.length!== 0 ? (
              orders?.orders?.map((orders, index) => (
                <tr key={orders._id}>
                  <td>{orders.paymentId}</td>
                  <td>{orders.name}</td>
                  <td>
                    {orders.products.map((product, i) => (
                      <div key={product._id} className="mb-2">
                        
                        <img
                          src={product.image}
                          alt="product"
                          style={{ width: "40px", height: "40px", display: "inline-block", marginRight: "8px" }}
                        />
                        
                        <span className="text-danger">Quantity:{product.quantity}</span>
                        <br/>
                        ₹{product.price}
                      </div>
                    ))}
                  </td>
                  
                  <td>{orders.email}</td>
                  <td>{orders.phone}</td>
                  <td>{orders.zip}</td>
                  <td>{orders.address}</td>
                  <td>₹{orders.amount}</td>
                  <td>
                     {orders.status==="pending"? <span className="badge badge-danger">
                      {orders.status}</span>:
                      <span className="badge badge-success">
                      {orders.status}</span>
                     }</td>
                  <td>{orders.userid}</td>
                  <td>{new Date(orders.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    
       
      <div className="d-flex tableFooter">
        <Pagination count={orders?.orders?.totalPages } color="primary"
        className="pagination" showLastButton onChange={handleChange}></Pagination>
        </div>


    
    </section>
  );
};

export default Orders;
