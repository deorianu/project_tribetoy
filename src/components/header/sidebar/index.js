import { useState } from 'react';
import { Button } from "@mui/material";
import { MdArrowForward } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AdminOrdersPage from '../../../pages/AdminOrderNotification';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(null); // Set to `null` initially for no open submenu

  const isOpenSubmenu = (index) => {
    if (isToggleSubmenu === index) {
      setIsToggleSubmenu(null); // Close the submenu if it's already open
    } else {
      setIsToggleSubmenu(index); // Open the submenu if it's not open
    }
    setActiveTab(index);
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to={'/'}>
          <Button
            className={`w-100 ${activeTab === 0 ? 'active' : ''}`}
            onClick={() => setActiveTab(0)} // Allow changing active tab
          >
            Dashboard 
          </Button> 
          </Link>
          
        </li>
        {/* <li>
          <Button className="sidebar-btn">Authentication</Button>
        </li> */}
        <li>
          <Button
            className={`w-100 ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => isOpenSubmenu(1)} // Toggle the Product submenu
          >
            Products
            <span className="arrow"><MdArrowForward /></span>
          </Button>
          {/* Submenu for Product */}
          {isToggleSubmenu === 1 && (
            <div className="submenuWrapper">
              <ul className="submenu">
                <li><Link to={'/product/list'} >
                <Button className="sidebar-btn">Product List</Button></Link></li>
                {/* <li>
                <Link to={'/product/details'}>
                <Button className="sidebar-btn">Product View</Button>
                </Link></li> */}
                <li>
                <Link to={'/product/upload'}>
                <Button className="sidebar-btn"> Add Product </Button>
                </Link>
                  </li>
              </ul>
            </div>
          )}
        </li>

        <li>
          <Button
            className={`w-100 ${activeTab === 2 ? 'active' : ''}`}
            onClick={() => isOpenSubmenu(2)} // Toggle the Product submenu
          >
            Category
            <span className="arrow"><MdArrowForward /></span>
          </Button>
          {/* Submenu for Category */}
          {isToggleSubmenu === 2 && (
            <div className="submenuWrapper">
              <ul className="submenu">
                <li><Link to={'/category/categoryList'}>
                <Button className="sidebar-btn">Category List</Button></Link>
                </li>
                <li>
                <Link to={'/category/upload'}>
                <Button className="sidebar-btn">Add Category</Button>
                </Link>
                  </li>
              </ul>
            </div>
          )}
        </li>
        <li>
          <Link to={'/order'}>
          <Button
            className={`w-100 ${activeTab === 3 ? 'active' : ''}`}
            onClick={() => setActiveTab(2)} // Allow changing active tab
          >
            Orders
            <span className="arrow"><MdArrowForward /></span>
          </Button>
          </Link>
        </li>
        {/* <li>
          <Button
            className={`w-100 ${activeTab === 4 ? 'active' : ''}`}
            onClick={() => setActiveTab(3)} // Allow changing active tab
          >
            Users
            <span className="arrow"><MdArrowForward /></span>
          </Button>
        </li> */}
        
        
      </ul>
    </div>
  );
};

export default Sidebar;
