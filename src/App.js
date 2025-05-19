import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Header from './components/header';
import Sidebar from './components/header/sidebar';
import { createContext, useEffect, useState } from 'react';
import ProductDetails from './pages/productDetails';
import ProductUpload from './pages/ProductUpload';
import CategoryUpload from './pages/CategoryUpload';
import CategoryList from "./pages/CategoryList";
import ProductList from './pages/ProductList';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CategoryEdit from './pages/categoryEdit';
import ProductEdit from './pages/ProductEdit';
import SignUp from './pages/SignUp';
import Login from './pages/SignIn';
import AdminOrdersPage from './pages/AdminOrderNotification';

const MyContext = createContext()



function App() {
const [baseUrl, setBaseUrl ] = useState("http://localhost:4000")
const [ isLogin, setIsLogin ] = useState(false);
const [ user, setUser ] = useState({
  name:"",
  email:"",
  userId:""
})
const [alertBox, setAlertBox] = useState({
  msg:'',
  error:false,
  open:false
})

const handleCloseAlert = () => {
  setAlertBox((prev) => ({ ...prev, open: false }));
};
  const values={
    alertBox,
    setAlertBox,
    baseUrl,
    setUser,
    user,
    isLogin,
    setIsLogin,
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

    
    <Header />
    <div className='main d-flex'> 
      <div className='sideWrapper'>
      <Sidebar />
      </div>

      <div className='content'>
      <Routes>
        <Route path='/' exact={true} element={<Dashboard />}></Route>
        <Route path='/signup' exact={true} element={<SignUp/>}></Route>
        <Route path='/login' exact={true} element={<Login/>}></Route>
        <Route path='/adminDashboard' exact={true} element={<Dashboard/>}></Route>
        <Route path='/product/list'exact={true} element={<ProductList/>} ></Route>
        <Route path='/product/details'exact={true} element={<ProductDetails/>} ></Route>
        <Route path='/product/upload'exact={true} element={<ProductUpload/>} ></Route>
        <Route path='/product/productEdit/:id'exact={true} element={<ProductEdit/>} ></Route>
        <Route path='/category/upload'exact={true} element={<CategoryUpload/>} ></Route>
        <Route path='/category/categoryList'exact={true} element={<CategoryList/>} ></Route>
        <Route path='/category/CategoryEdit/:id'exact={true} element={<CategoryEdit/>} ></Route>
        <Route path='/order'exact={true} element={<AdminOrdersPage/>} ></Route>

      </Routes>
      </div>
    </div>
    {/* Snackbar Component */}
    <Snackbar
          open={alertBox.open}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={alertBox.error ? 'error' : 'success'}
            sx={{ width: '100%' }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>
    </MyContext.Provider>
    
    </BrowserRouter>
  );
}

export default App;
export { MyContext};
