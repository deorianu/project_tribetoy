import { useState, useEffect } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { fecthDataFormApi } from "../../../utils/api";

const Navigation = () => {
    const [catData, setCatData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        fecthDataFormApi('/api/category').then((res) => {
            setCatData(res);
            console.log(res);
        });
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <nav>
                <div className="container-fluid mt-3 mb-2">
                    
                    <div className="row">
                        <div className="col-sm-12 nav2 d-flex align-items-center justify-content-between">
                            <ul className="list list-inline">
                                <li className="list-inline-item"><Link to="/"><Button><h6>HOME</h6></Button></Link></li>
                                <li className="list-inline-item">
                                
                                <Button 
                                    onClick={handleClick}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <h6 className="m-0" style={{ color: "#121212" }}>
                                        CATEGORIES
                                    </h6>
                                </Button>
                                    <Menu
                                        id="category-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        {catData?.categoryList?.length !== 0 && catData?.categoryList?.map((item, index) => (
                                                <MenuItem 
                                                    key={index} 
                                                    onClick={handleClose}
                                                    component={Link} 
                                                    to={`/cat/${item?.id}`}
                                                >
                                                    {item?.name?.toUpperCase()}
                                                </MenuItem>
                                            ))
                                        }
                                    </Menu>

                                    </li>
                                
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </nav>

            
        </>
    );
};

export default Navigation;
