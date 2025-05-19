import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import tribeToy from "../../assets/images/tribeToy.jpeg";
import { postData } from "../../utils/api";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

const SignIn = () => {
    const context = useContext(MyContext)
    const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setisShowPassword] = useState(false);

  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

    useEffect(() =>{
        context.setisHeaderFooterShow(false);
    });


    const focusInput = (index) => {
      setInputIndex(index);
    };
  
    const OnChangeInput = (e) => {
      setFormFields({
        ...formFields,
        [e.target.name]: e.target.value,
      });
    };
  
    const login = (e) => {
      e.preventDefault();
    
      if (formFields.email === "") {
        context.setAlertBox({
          open: true,
          msg: 'Please add your email!',
          error: true,
        });
        return false;
      }
    
      if (formFields.password === "") {
        context.setAlertBox({
          open: true,
          msg: 'Please create your password!',
          error: true,
        });
        return false;
      }
    
      postData('/api/user/signin', formFields)
    .then((res) => {
      console.log("Response received:", res);  // Check the structure of the response
      if (res && res.user && res.token) {
        // Save user data and token to localStorage
        
        localStorage.setItem('token', res.token);
  
        const user= {
          name: res.user?.name,
          email: res.user?.email,
          userId: res.user?.id
        
        };
          
        localStorage.setItem('user', JSON.stringify(res.user));
  
        context.setAlertBox({
          open: true,
          msg: 'Login successfully completed!',
          error: false,
        });
  
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        // Handle unexpected response structure
        context.setAlertBox({
          open: true,
          msg: 'Unexpected response structure!',
          error: true,
        });
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      context.setAlertBox({
        open: true,
        msg: 'Login failed. Please check your credentials!',
        error: true,
      });
    });
  }



    return (
      <div className="signup-container">
      <div className="signup-card">
        <div className="shoppingBag mt-5">
          <span><img src={tribeToy} alt="Shopping_Bag" /></span>
          <span><h5>TribeToy</h5></span>
        </div>
        <h2 className="signup-title">Login</h2>
        <form className="signup-form" onSubmit={login}>
          <div className={`form-group position-relative ${inputIndex === 0 && 'focus'}`}>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="form-input"
              onFocus={() => focusInput(0)}
              onBlur={() => setInputIndex(null)}
              name="email"
              onChange={OnChangeInput}
            />
          </div>

          <div className={`form-group position-relative ${inputIndex === 1 && 'focus'}`}>
            <input
              type={`${isShowPassword === true ? 'text' : 'password'}`}
              placeholder="Enter your password"
              className="form-input"
              onFocus={() => focusInput(1)}
              onBlur={() => setInputIndex(null)}
              name="password"
              onChange={OnChangeInput}
            />
            <span className="toggleShowPassword" onClick={() => setisShowPassword(!isShowPassword)}>
              {isShowPassword === true ? <IoMdEyeOff /> : <IoMdEye />}
            </span>
          </div>

          <div className="form-group">
            <label className="form-label">
              <input
                type="checkbox"
                name="agreeToTerms"
                className="form-checkbox"
                style={{fontSize:"18px"}}
              />
              I agree to the Terms and Conditions.
            </label>
          </div>

          <div className="form-group">
            {/* <p className="forgot-password">
              Forgot your password?{" "}
              <Link to="/forgot-password" className="forgot-password-link">
                Reset it here
              </Link>
            </p> */}
            <Link to={"/"}>
           <p style={{fontSize:"18px"}}> Back to Home</p></Link>
          
          </div>
      
          <div className="align-items-center">
            <button type="submit" className="btn-primary col-4" style={{fontSize:"18px"}}>Login</button>
          </div>
          
        </form>

        <div className="form-group mt-3">
          <p className="not-registered" style={{fontSize:"18px"}}>
            Don't have an account?{" "}
            <Link to="/signup" className="register-link" style={{fontSize:"18px"}}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
    );
  };
  

export default SignIn;
