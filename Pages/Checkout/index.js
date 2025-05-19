import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fecthDataFormApi, postData } from "../../utils/api";
import { MyContext } from "../../App";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const history = useNavigate();
  const context = useContext(MyContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    fecthDataFormApi(`/api/cart?userId=${user?.id}`).then((res) => {
      
      setCart(res);
      
      const cartTotal = res.length !== 0
        ? res.map((item) => parseFloat(item.price) * item.quantity)
          .reduce((total, value) => total + value, 0)
        : 0;
        
      setTotalAmount(cartTotal);
    });
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  
    if (name === "zip" && value.length === 6) {
      console.log("Fetching shipping charge for ZIP:", value);
      fetchShippingCharge(value);
    }
  };
  

  const fetchShippingCharge = async (zip) => {
    try {
      console.log("Sending request to fetch shipping charge for:", zip);
      const response = await fetch(`https://localhost:4000/api/shipping/${zip}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Shipping charge response:", data);
  
      if (data.shippingCharge !== undefined) {
        setShippingCharge(data.shippingCharge);
      } else {
        console.error("Shipping charge not found in response");
        setShippingCharge(0); // Set default value if shipping charge is not found
      }
    } catch (error) {
      console.error("Error fetching shipping charge:", error);
      setShippingCharge(0); // Handle error by setting default shipping charge
    }
  };
  

  const finalTotalAmount = totalAmount + shippingCharge;

  const handlePayment = async () => {
    // Step 1: Validate form fields
    for (const field in formData) {
      if (formData[field] === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: `Please fill ${field}!`,
        });
        return;
      }
    }
  
    const user = JSON.parse(localStorage.getItem("user"));
    const finalAmount = finalTotalAmount;
  
    try {
      // Step 2: Get order from backend
      const orderResponse = await postData("/api/payment/razorpay", {
        amount: finalAmount,
      });
  
      const options = {
        // key: "rzp_live_SEWEPVd2enHCNX", // ✅ Use only key_id
        amount: orderResponse.amount,
        currency: "INR",
        name: "TribeToy",
        description: "Product Purchase",
        order_id:  orderResponse.orderId, // ✅ Razorpay returns order ID as "id"
        handler: async (response) => {
          console.log("Payment successful:", response);
  
          const payLoad = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            userid: user?.id,
            products: cart.map(item => ({
              productId: item.productId,
              productTitle: item.productTitle,
              quantity: item.quantity,
              price: item.price,
              image: `https://localhost:4000/uploads/${item.image}`,
            })),
            shippingCharge,
            amount: finalAmount,
            paymentId: response.razorpay_payment_id,
          };
  
          // Step 3: Send order data to backend
          await postData(`/api/orders/create`, payLoad);
          history("/")
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error during Razorpay payment:", error);
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Something went wrong while initiating payment!",
      });
    }
  };
  

  return (
    <section className="checkout section px-4 py-6">
  <div className="container mx-auto">
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Billing Section */}
      <div className="w-full lg:w-2/3">
        <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
        <form className="space-y-4">
  {/* Row 1: Name & Email */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <input
      type="text"
      name="name"
      className="form-input w-full"
      placeholder="Full Name"
      onChange={handleInputChange}
      required
    />
    <input
      type="email"
      name="email"
      className="form-input w-full"
      placeholder="Email"
      onChange={handleInputChange}
      required
    />
  </div>

  {/* Row 2: Address (full width) */}
  <input
    type="text"
    name="address"
    className="form-input w-full"
    placeholder="Address"
    onChange={handleInputChange}
    required
  />

  {/* Row 3: State & City */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <input
      type="text"
      name="state"
      className="form-input w-full"
      placeholder="State"
      onChange={handleInputChange}
      required
    />
    <input
      type="text"
      name="city"
      className="form-input w-full"
      placeholder="City"
      onChange={handleInputChange}
      required
    />
  </div>

  {/* Row 4: Phone & Zip */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <input
      type="text"
      name="phone"
      className="form-input w-full"
      placeholder="Phone Number"
      onChange={handleInputChange}
      required
    />
    <input
      type="text"
      name="zip"
      value={formData.zip}
      className="form-input w-full"
      placeholder="ZIP Code"
      onChange={handleInputChange}
      required
    />
  </div>
</form>

      </div>

  <div className="w-full lg:w-2/3 bg-white p-4 rounded-lg shadow-md max-h-96 overflow-y-auto">
  <h2 className="text-xl font-bold mb-4 text-left" style={{ fontSize: "28px" }}>Order Summary</h2>

  <div className="w-full flex justify-center">
  <table className="table-auto">
    <tbody>
      {cart.map((item) => (
        <tr key={item.id} className="border-b">
          {/* Left: Product Details */}
          <td className="py-4 px-5 w-2/3 align-top">
            <div>
              <p className="font-semibold text-lg" style={{ fontSize: "20px" }}>
                {item?.productTitle}
              </p>
              <p className="text-base" style={{ fontSize: "20px" }}>
                Quantity: {item.quantity}
              </p>
              <p className="text-base" style={{ fontSize: "20px" }}>
                Price: ₹{item.price * item.quantity}
              </p>
            </div>
          </td>

          {/* Right: Product Image */}
          <td className="py-4 px-4 w-1/4 align-top text-right">
            <img
              src={`https://localhost:4000/uploads/${item?.image}`}
              alt={item?.productTitle}
              className="rounded-md inline-block"
              style={{ height: "250px", width: "250px", objectFit: "cover" }}
            />
          </td>
        </tr>
        
      ))}
    </tbody>
  </table>
</div>



  <div className="mt-4 px-5">
    <p className="text-md font-bold" style={{fontSize:"20px", color:"red"}}>Shipping Cost: ₹{shippingCharge}</p>
    <p className="text-md font-bold" style={{fontSize:"20px", color:"blue"}}>Total Cost: ₹{finalTotalAmount}</p>

    <button
      type="submit"
      onClick={handlePayment}
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition"
      style={{fontSize:"20px"}}
    >
      Pay with Razorpay
    </button>
  </div>
  </div>



    </div>
  </div>
</section>

  );
};

export default Checkout;
