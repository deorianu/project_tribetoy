import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProductModal from "./Components/ProductModal";
import { createContext, useEffect } from "react";
import { useState } from "react";
import Listing from "./Pages/Listing";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { fecthDataFormApi, postData } from "./utils/api";
import Blogs from "../../client/src/Pages/blogs";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MyList from "./Pages/MyList";
import Search from "./Pages/Search";
import MyAccount from "./Pages/MyAccount";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";
import OurEffort from "./Pages/ourEffort";
import EventsPage from "./Pages/events";
import About from "./Pages/about";
import Contact from "./Pages/Contact";
import OrderCancelReturnPolicy from "./Pages/cancel";
import PrivacyPolicy from "./Pages/privacy_policy";
import ShippingPolicy from "./Pages/Shipping_Policy";
import TermsAndCondition from "./Pages/terms_condition";

export const MyContext = createContext();

function App() {

  const [isOpenProductModal, setisOpenProductModal] = useState({
    id:'',
    open:false
  })
  const [isHeaderFooterShow, setisHeaderFooterShow] = useState(true)
  const [isLogin, setIsLogin] = useState(false)
  const [productData, setProductData ] = useState();
  const [categoryData, setCategoryData] = useState([]);
  const [ activeCategory, setActiveCategory ] = useState('');
  const [ addCart, setAddCart ] = useState([]);
  const [ searchData, setSearchData ] = useState([]);
  const [alertBox, setAlertBox] = useState({
    msg:'',
    error:false,
    open:false
  })
  const [ user, setUser ] = useState({
    name:"",
    email:"",
    userId:""
  });

  let [cartFields, setCartFields ] = useState({});

  const handleCloseAlert = () => {
    setAlertBox((prev) => ({ ...prev, open: false }));
  };



  useEffect(()=>{
    
    fecthDataFormApi(`/api/product/${isOpenProductModal.id}`).then((res)=>{
      setProductData(res);
    })
  },[isOpenProductModal])

  useEffect(()=>{
    fecthDataFormApi(`/api/cart`).then((res)=>{
      setAddCart(res)
      
    })
  })

  const getCartData = ()=>{
    fecthDataFormApi(`/api/cart`).then((res)=>{
      setAddCart(res)
      
    })
  }

  

  const addToCart = (data) => {
    postData(`/api/cart/add`, data).then((res) => {
        
      if(res.status!==false){
        setAlertBox({
          open: true,
          error: false,
          msg: "Item is added into the cart!",
        });
        
      }else{
        setAlertBox({
          open: true,
          error: true,
          msg: res.msg
        });
      }
      
    })

  };
  
  const values = {
    setisOpenProductModal,
    isOpenProductModal,
    isHeaderFooterShow,
    setisHeaderFooterShow,
    setIsLogin,
    isLogin,
    categoryData,
    setCategoryData,
    activeCategory,
    setActiveCategory,
    alertBox,
    setAlertBox,
    setUser,
    addToCart,
    addCart,
    setAddCart,
    searchData,
    setSearchData,
    getCartData
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token!=="" && token!==undefined && token!==null) {
      setIsLogin(true);
    
      setUser(user);

    } else {
      setIsLogin(false);
    }
  }, [isLogin]);


  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {
          isHeaderFooterShow === true && <Header />
        }
      
      <Routes>
        <Route path="/" exact={true} element={<Home />}></Route>
        <Route path="/cat/:id" exact={true} element={<Listing />}></Route>
        <Route path="/productDetails/:id" exact={true} element={<ProductDetails />}></Route>
        <Route path="/cart" exact={true} element={<Cart />}></Route>
        <Route path="/allProduct" exact={true} element={<Listing />}></Route>
        <Route path="/signIn" exact={true} element={<SignIn />}></Route>
        <Route path="/signUp" exact={true} element={<SignUp />}></Route>
        <Route path="/blogs" exact={true} element={<Blogs />}></Route>
        <Route path="/MyList" exact={true} element={<MyList />}></Route>
        <Route path="/search" exact={true} element={<Search />}></Route>
        <Route path="/checkout" exact={true} element={<Checkout />}></Route>
        <Route path="/orders" exact={true} element={<Orders />}></Route>
        <Route path="/profile" exact={true} element={<MyAccount />}></Route>
        <Route path="/efforts" exact={true} element={<OurEffort />}></Route>
        <Route path="/events" exact={true} element={<EventsPage />}></Route>
        <Route path="/about" exact={true} element={<About />}></Route>
        <Route path="/contact" exact={true} element={<Contact />}></Route>
        <Route path="/cancelReturns" exact={true} element={<OrderCancelReturnPolicy />}></Route>
        <Route path="/privacy_policy" exact={true} element={<PrivacyPolicy />}></Route>
        <Route path="/shipping_policy" exact={true} element={<ShippingPolicy />}></Route>
        <Route path="/terms_condition" exact={true} element={<TermsAndCondition />}></Route>


      </Routes>
      {
          isHeaderFooterShow === true && <Footer/>
        }
      
      {
        isOpenProductModal.open===true && <ProductModal data={productData} /> 
      }

      {/* Snackbar Component */}
    <Snackbar
          open={alertBox.open}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={alertBox.error ? 'error' : 'success'}
            sx={{ width: '100%',backgroundColor: alertBox.error ? 'red' : 'green',
            color: 'white',}}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>
    </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
