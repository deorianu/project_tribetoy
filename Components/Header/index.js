import { Link } from "react-router-dom";
import { Button, Avatar, Menu, MenuItem, ListItemIcon, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { useContext, useState } from "react";
import Logout from "@mui/icons-material/Logout";
import tribeToy from "../../assets/images/tribeToy.jpeg";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";

const Header = () => {
  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const isAccountMenuOpen = Boolean(anchorElAccount);
  const context = useContext(MyContext);
  const { user, isLogin } = context;
  const history = useNavigate();

  const handleAccountMenuOpen = (event) => setAnchorElAccount(event.currentTarget);
  const handleAccountMenuClose = () => setAnchorElAccount(null);

  const logout = () => {
    localStorage.clear();
    setAnchorElAccount(null);
    context.setAlertBox({ open: true, error: false, msg: "Logout success!" });

    setTimeout(() => {
      history("/signin");
    }, 2000);
  };

  return (
    <>
      <div className="headerWrapper">
        <header className="header">
          <div className="container-fluid">
            <div className="row align-items-center ">
              
              {/* Left - Logo & Tagline */}
              <div className="col-md-2 d-flex align-items-center">
                <Link to={"/"}>
                  <img src={tribeToy} alt="Logo" className="logo" />
                </Link>
                <div className="tagline ms-3">
                  <h3 className="mb-0">TribeToy</h3>
                  <p className="mb-0 d-flex justify-content-center">Eco-friendly, non-toxic toys</p> 
                  
                </div>
              </div>
              

              {/* Right - Navigation & User Actions */}
              <div className="col-md-6 d-flex justify-content-end ml-auto">
              <SearchBox />
                <Navigation />

                {/* User Actions */}
                <div className="user-actions d-flex align-items-center">
                  {!isLogin ? (
                    <Link to={"/signin"}>
                      <Button className="circleSign d-flex align-items-center justify-content-center" ><h6 style={{color:"#121212"}} className="m-0">Sign In / Register</h6></Button>
                    </Link>
                  ) : (
                    <Button onClick={handleAccountMenuOpen} className="d-flex align-items-center">
                      <Avatar>{user?.name?.charAt(0)?.toUpperCase()}</Avatar>
                    </Button>
                  )}

                  {/* Account Menu */}
                  <Menu
                    anchorEl={anchorElAccount}
                    id="account-menu"
                    open={isAccountMenuOpen}
                    onClose={handleAccountMenuClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Link to={"/profile"}>
                      <MenuItem>
                        <Avatar className="mr-2" /> Profile
                      </MenuItem>
                    </Link>
                    <Divider />
                    <Link to={"/orders"}>
                      <MenuItem>
                        <Avatar className="mr-2" /> My Orders
                      </MenuItem>
                    </Link>

                    <Link to={"/MyList"}>
                      <MenuItem>
                        <Avatar className="mr-2" /> My WishList
                      </MenuItem>
                    </Link>
                    <Link to={"/cart"}>
                      <MenuItem>
                        <Avatar className="mr-2" /> My Cart
                      </MenuItem>
                    </Link>
                    <Divider />
                    <MenuItem onClick={logout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </div>

            </div>
          </div>
        </header>
      </div>

      
    </>
  );
};

export default Header;
