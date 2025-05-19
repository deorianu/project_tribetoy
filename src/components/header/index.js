import React, { useContext, useState } from 'react';
import { Button, Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, Typography } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import TribeToy from "../../assets/images/tribeToy.jpeg"
import { MyContext } from '../../App';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [anchorElAccount, setAnchorElAccount] = useState(null);
    const [anchorElNotification, setAnchorElNotification] = useState(null);
    const [anchorElEmail, setAnchorElEmail] = useState(null);
    const [anchorElCart, setAnchorElCart] = useState(null);

    const isAccountMenuOpen = Boolean(anchorElAccount);
    const isNotificationOpen = Boolean(anchorElNotification);
    const isEmailMenuOpen = Boolean(anchorElEmail);
    const isCartMenuOpen = Boolean(anchorElCart);

    const history = useNavigate()
    const context = useContext(MyContext);
    const { user, isLogin } = context; // Get user and isLogin from context
    // Account Menu Handlers
    const handleAccountMenuOpen = (event) => setAnchorElAccount(event.currentTarget);
    const handleAccountMenuClose = () => setAnchorElAccount(null);

    const logout = () =>{
        localStorage.clear();
        
        setAnchorElAccount(null)
        context.setAlertBox({
            open:true,
            error: false,
            msg:'Logout success!'
        })

        setTimeout(() => {
            history("/login");
        }, 2000);
    }


    return (
        <header>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-3">
                        <Link to={'/'}>
                            <img src={TribeToy} alt="logo" style={{ width: '50px', marginRight: '10px' }} />
                        </Link>
                        <span>TribeToy</span>
                    </div>
                    <div className="col-sm-10 d-flex justify-content-end align-items-center">
                        

                         {/* Sign In Button */}
                         {!isLogin && (
                            <Link to={'/login'}>
                                <Button >Sign In</Button>
                            </Link>
                        )}

                        {/* Account Button (Only shown if logged in) */}
                        {isLogin && (
                            <Button onClick={handleAccountMenuOpen} className="d-flex align-items-center">
                                 <Avatar fontSize="small"><span className='rounded-circle' >{context.user?.name?.charAt(0)}</span></Avatar> 
                                <Box ml={1}>
                                    <Typography variant="body1">{context.user?.name}</Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {context.user?.email}
                                    </Typography>
                                </Box>
                            </Button>
                        )}
                        {/* Account Menu */}
                        <Menu
                            anchorEl={anchorElAccount}
                            id="account-menu"
                            open={isAccountMenuOpen}
                            onClose={handleAccountMenuClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                                <Avatar /> Profile
                            </MenuItem>
                            <MenuItem>
                                <Avatar /> My account
                            </MenuItem>
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
        </header>
    );
};

export default Header;
