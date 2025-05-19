import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import logo from "../../assets/images/high_new_logo.png";
import { postData } from "../../utils/api";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

const Login = () => {
  const context = useContext(MyContext);
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setisShowPassword] = useState(false);

  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
    isAdmin: true,
  });

  const history = useNavigate();

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
      context.setAlertBox({ open: true, msg: "Please enter your email!", error: true });
      return;
    }
  
    if (formFields.password === "") {
      context.setAlertBox({ open: true, msg: "Please enter your password!", error: true });
      return;
    }
  
    postData("/api/user/signin", formFields)
      .then((res) => {
        console.log("Response received:", res);
        if (res && res.user && res.token) {
          localStorage.setItem("token", res.token);
  
          const user = {
            name: res.user.name,
            email: res.user.email,
            userId: res.user._id, // ✅ Use _id from backend
          };
  
          localStorage.setItem("user", JSON.stringify(user));
  
          context.setAlertBox({
            open: true,
            msg: "Login successfully completed!",
            error: false,
          });
  
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          context.setAlertBox({
            open: true,
            msg: "Unexpected response structure!",
            error: true,
          });
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        context.setAlertBox({
          open: true,
          msg: "Login failed. Please check your credentials!",
          error: true,
        });
      });
  };
  
  

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="shoppingBag">
          <span><img src={logo} alt="Shopping_Bag" /></span>
          <span><h5>Green Putola</h5></span>
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
              />
              I agree to the Terms and Conditions.
            </label>
          </div>

          <div className="form-group">
            <p className="forgot-password">
              Forgot your password?{" "}
              <Link to="/forgot-password" className="forgot-password-link">
                Reset it here
              </Link>
            </p>
          </div>

          <div className="align-items-center">
            <button type="submit" className="btn-primary col-4">Login</button>
          </div>
        </form>

        <div className="form-group mt-3">
          <p className="not-registered">
            Don't have an account?{" "}
            <Link to="/signup" className="register-link">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
