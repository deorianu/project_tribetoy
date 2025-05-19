import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import tribeToy from "../../assets/images/tribeToy.jpeg";
import { postData } from "../../utils/api";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";


const SignUp = () => {
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setisShowPassword] = useState(false);
  // const [isShowConfirmPassword, setisShowConfirmPassword] = useState(false);
    const [formFields, setFormFields] = useState({
      name: '',
      phone: '',
      email: '',
      password: '',
      isAdmin: false,
    });

    const history = useNavigate();
    const context = useContext(MyContext)


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
  
    const signup = (e) => {
      e.preventDefault();
  console.log(formFields)
      if (formFields.name === "") {
        context.setAlertBox({ open: true, msg: "Please add your name!", error: true });
        return false;
      }
  
      if (formFields.phone === "") {
        context.setAlertBox({ open: true, msg: "Please add your phone number!", error: true });
        return false;
      }
  
      if (formFields.email === "") {
        context.setAlertBox({ open: true, msg: "Please add your email!", error: true });
        return false;
      }
  
      if (formFields.password === "") {
        context.setAlertBox({ open: true, msg: "Please create your password!", error: true });
        return false;
      }
  
      // if (formFields.confirmPassword === "") {
      //   context.setAlertBox({ open: true, msg: "Please confirm your password!", error: true });
      //   return false;
      // }
  
      // if (formFields.confirmPassword !== formFields.password) {
      //   context.setAlertBox({ open: true, msg: "Passwords do not match!", error: true });
      //   return false;
      // }
  
      postData("/api/user/signup", formFields).then((res) => {
        context.setAlertBox({ open: true, msg: "Registration successful!", error: false });
        setTimeout(() => {}, 2000);
      });
  
      history("/signIn");
    };

    


  return (
    <div className="signup-container">
    <div className="signup-card">
      <div className="shoppingBag mt-5">
        <span><img src={tribeToy} alt="Shopping_Bag" className="logo" /></span>
        <span><h5>TribeToy</h5></span>
      </div>
      <h2 className="signup-title">Register for a New Account</h2>
      <form className="signup-form" onSubmit={signup}>
        {/* Full Name */}
        <div className={`form-group position-relative ${inputIndex === 0 && 'focus'}`}>
          <input
            type="text"
            id="full-name"
            placeholder="Enter your full name"
            className="form-input"
            onFocus={() => focusInput(0)}
            onBlur={() => setInputIndex(null)}
            name="name"
            onChange={OnChangeInput}
          />
        </div>
        {/* Email */}
        <div className={`form-group position-relative ${inputIndex === 1 && 'focus'}`}>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="form-input"
            onFocus={() => focusInput(1)}
            onBlur={() => setInputIndex(null)}
            name="email"
            onChange={OnChangeInput}
          />
        </div>
        {/* Phone Number */}
        <div className={`form-group position-relative ${inputIndex === 2 && 'focus'}`}>
          <input
            type="number"
            id="phone"
            placeholder="Enter your phone number"
            className="form-input"
            onFocus={() => focusInput(2)}
            onBlur={() => setInputIndex(null)}
            name="phone"
            onChange={OnChangeInput}
          />
        </div>
        {/* Password */}
        <div className={`form-group position-relative ${inputIndex === 3 && 'focus'}`}>
          <input
            type={isShowPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="form-input"
            onFocus={() => focusInput(3)}
            onBlur={() => setInputIndex(null)}
            name="password"
            onChange={OnChangeInput}
          />
          <span className="toggleShowPassword" onClick={() => setisShowPassword(!isShowPassword)}>
            {isShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
          </span>
        </div>
        {/* Confirm Password */}
        {/* <div className={`form-group position-relative ${inputIndex === 4 && 'focus'}`}>
          <input
            type={isShowConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="form-input"
            onFocus={() => focusInput(4)}
            onBlur={() => setInputIndex(null)}
            name="confirmPassword"
            onChange={OnChangeInput}
          />
          <span className="toggleShowPassword" onClick={() => setisShowConfirmPassword(!isShowConfirmPassword)}>
            {isShowConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
          </span>
        </div> */}
        {/* Terms & Conditions */}
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
        {/* Submit Button */}
        <div className="align-items-center">
          <button type="submit" className="btn-primary col-4">Sign Up</button>
        </div>
      </form>
      <p className="signin-link mt-3" style={{fontSize:"18px"}}>
        Already have an account? <Link to="/signIn" style={{fontSize:"18px"}}>Sign In</Link>
      </p>
    </div>
  </div>
);
};

export default SignUp;
