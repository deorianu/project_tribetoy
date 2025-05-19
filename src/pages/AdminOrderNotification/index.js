import { useEffect, useState } from 'react';
import { editData, fecthDataFormApi } from '../../utils/api';
import { Pagination } from '@mui/material';
import axios from 'axios';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const fetchOrders = (pageNum) => {
    window.scrollTo(0, 0);
    fecthDataFormApi(`/api/orders?page=${pageNum}&perPage=8`).then((res) => {
      setOrders(res.orders || []);
      setTotalPages(res.totalPages || 1);
    });
  };

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const updateOrderStatus = async (id, status) => {
    fecthDataFormApi(`/api/orders/${id}`, { status }).then((res)=>{
      const order = {
      name: res.name,
      email: res.email,
      phone: res.phone,
      address: res.address,
      city: res.city,
      state: res.state,
      zip: res.zip,
      
      products: res.products.map(item => ({
        productId: item.productId,
        productTitle: item.productTitle,
        quantity: item.quantity,
        price: item.price,
        image: item.image.startsWith("http")
`https://localhost:4000/uploads/${item.image}`,
      })),
      amount: parseInt(res.amount),
      status: status
    }

    console.log(order)

    editData(`/api/orders/${id}`, order).then((res)=>{
      fecthDataFormApi(`/api/orders?page=${1}&perPage=8`).then((res) => {
        setOrders(res.orders || []);
        setTotalPages(res.totalPages || 1);
        
      });
    })
  });
  }
    

  return (

      <section className="admin-orders px-1 py-6" style={{ marginTop: "5rem" }}>
        <div className="container">
          <h2 className="text-3xl font-bold mb-6 p-5">🛎️ Admin Order Management</h2>
    
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders to display.</p>
          ) : (
            <div className="order" style={{overflowX:"scroll"}}>
              <table className="min-w-full bg-white border border-gray-200 text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-2 px-4 border">Order ID</th>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Email</th>
                    <th className="py-2 px-4 border">Phone</th>
                    <th className="py-2 px-4 border">Address</th>
                    <th className="py-2 px-4 border">Products</th>
                    <th className="py-2 px-4 border">Total</th>
                    <th className="py-2 px-4 border">Date</th>
                    <th className="py-2 px-4 border">Status</th>
                    <th className="py-2 px-4 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border">{order._id}</td>
                      <td className="py-2 px-4 border">{order.name}</td>
                      <td className="py-2 px-4 border">{order.email}</td>
                      <td className="py-2 px-4 border">{order.phone}</td>
                      <td className="py-2 px-4 border">{order.address}, {order.zip}</td>
                      <td className="py-2 px-4 border">
                        
                          {order.products.map((product, i) => (
                            <div key={i} className="flex items-center gap-1 mb-1">
                              <img src={product.image} alt={product.name} className="w-6 h-6" 
                              style={{ width: "40px", height: "40px", display: "inline-block", marginRight: "8px" }}/>
                              {product.name} (Qty: {product.quantity}) ₹{product.price}
                            </div>
                          ))}
                        
                      </td>
                      <td className="py-2 px-4 border">₹{order.amount}</td>
                      <td className="py-2 px-4 border">{new Date(order.date).toLocaleString()}</td>
                      <td className="py-2 px-4 border font-semibold capitalize" style={{color:"red"}}>{order.status}</td>
                      <td className="py-2 px-4 border">
                        {order.status === 'pending' && (
                          <>
                            <button
                              className=" text-white px-2 py-1 rounded mb-1"
                              style={{backgroundColor:"green"}}
                              onClick={() => updateOrderStatus(order._id, 'Accepted')}
                            >
                              Accept
                            </button>
                            <button
                              className=" text-white px-2 py-1 rounded "
                              style={{backgroundColor:"red"}}
                              onClick={() => updateOrderStatus(order._id, 'Cancelled')}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {order.status === 'Accepted' && (
                          <button
                            className=" text-white px-2 py-1 rounded "
                            style={{backgroundColor:"blue"}}
                            onClick={() => updateOrderStatus(order._id, 'Shipped')}
                          >
                            Ship
                          </button>
                        )}
                        {order.status === 'Shipped' && (
                          <span className="font-semibold">✔ Shipped</span>
                        )}
                        {order.status === 'Cancelled' && (
                          <span className="text-red-600 font-semibold">❌ Cancelled</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
    
          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <Pagination
              count={totalPages}
              color="primary"
              page={page}
              onChange={handleChange}
              showFirstButton
              showLastButton
            />
          </div>
        </div>
      </section>
    
  );
};

export default AdminOrdersPage;
