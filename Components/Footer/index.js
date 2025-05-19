import { Link } from "react-router-dom";
import stamp_logo from "../../assets/images/stamp.png";
import { FaFacebook, FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer text-light py-5 text-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-2">
            <h4 className="footer-title">Links</h4>
            <ul className="footer-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
          <div className="col-sm-2">
            <h4 className="footer-title">Product Category</h4>
            <ul className="footer-list">
              
              <li><Link to="/">Action/Cartoon</Link></li>
              <li><Link to="/">Religious Figure</Link></li>
              <li><Link to="/">Educational Toys</Link></li>
              <li><Link to="/">Historical Monuments</Link></li>
            </ul>
          </div>
          <div className="col-sm-2">
            <h4 className="footer-title">Consumer Policy</h4>
            <ul className="footer-list">
              
              <li><Link to="/privacy_policy">Privacy Policy</Link></li>
              <li><Link to="/shipping_policy">Shipping Policy</Link></li>
              <li><Link to="/cancelReturns">Cancellation & Returns</Link></li>
              <li><Link to="/terms_condition">Terms and Conditions</Link></li>
            </ul>
          </div>
          <div className="col-sm-2">
            <h4 className="footer-title">Related Sites</h4>
            <ul className="footer-list">
              <li>
                <a href="https://greenputola.cfsuspol.com/" target="_blank" rel="noreferrer">
                  Green Putola Kendra
                </a>
              </li>
              <li>
                <a href="https://iitg.ac.in/" target="_blank" rel="noreferrer">
                  Indian Institute of Technology Guwahati
                </a>
              </li>
              <li>
                <a href="https://www.cfsuspol.com/" target="_blank" rel="noreferrer">
                  Centre For Sustainable Polymers
                </a>
              </li>
            </ul>
          </div>
          <div className="col-sm-2">
            <h4 className="footer-title">Address</h4>
            <ul className="footer-list">
              <li>Technology Incubation Centre, IIT Guwahati,</li>
              <li>Indian Institute of Technology Guwahati,</li>
              <li>Guwahati - 781039</li>
              
            </ul>
          </div>
          <div className="col-sm-2">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-list">
              <li>Phone: +91 </li>
              <li>Email: tribetoy2025@gmail.com</li>
              <li>
                <FaSquareInstagram className="social-icon" />
                <a href="https://www.instagram.com/green_toy_axom/profilecard/?igsh=czQ4YWJ60DE2aHZr" target="_blank" rel="noreferrer">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center mt-4 pt-3">
        <p className="mb-0">
          Copyright © 2025 <Link to="/">TribeToy Private Limited</Link>. All Rights Reserved. Powered by TribeToy Private Limited.
        </p>
        <p><span className="d-block">Designed by Anuradha</span></p>
      </div>
    </footer>
  );
};

export default Footer;
