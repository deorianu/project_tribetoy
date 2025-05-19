import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Button from '@mui/material/Button';
import { IoMdMenu } from "react-icons/io";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ProductItem from "../../Components/ProductItem";
import Pagination from '@mui/material/Pagination';

import { useParams } from "react-router-dom";
import { fecthDataFormApi } from "../../utils/api";
import { MyContext } from "../../App";


const Search = () =>{
    const [ productData, setProductData] = useState([]);
    const [catData, setCatData ] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [productview, setproductview] = useState('four');
    const openDrop = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


const context = useContext(MyContext);

useEffect(()=>{

    window.scrollTo(0,0);

    fecthDataFormApi('/api/category').then((res)=>{
        setCatData(res);
        
    })

    setTimeout(()=>{
        setProductData(Array.isArray(context.searchData) ? context.searchData : []);   
    },2000);
    
},[context.searchData])

const filterData = (categoryId) =>{
    fecthDataFormApi(`/api/product?categoryId=${categoryId}`).then((res)=>{
        setProductData(Array.isArray(res.products) ? res.products : []);

    })
}



    return(
        <>
            <section className="product_Listing_Page">
                <div className="container">
                    <div className="productListing d-flex">
                    {catData?.length !== 0 && <Sidebar filterData={filterData} catData={catData} />}
                        
                    <div className="content-right">
                            <div className="showBy mt-3 mb-3 d-flex align-items-center">
                                <div className="d-flex btnWrapper align-items-center">
                                    <Button className={productview === 'one' && 'active'} onClick={() => setproductview('one')}>
                                        <IoMdMenu />
                                    </Button>
                                    <Button className={productview === 'three' && 'active'} onClick={() => setproductview('three')}>
                                        <TfiLayoutGrid3Alt />
                                    </Button>
                                    <Button className={productview === 'four' && 'active'} onClick={() => setproductview('four')}>
                                        <TfiLayoutGrid4Alt />
                                    </Button>
                                </div>
                            </div>
                            <div className={`productListing ${productview === 'one' ? 'view-one' : productview === 'three' ? 'view-three' : 'view-four'}`}>
                                {productData?.length!==0 && productData?.map((item, index) => (
                                    <ProductItem itemView={productview} key={index} item={item} />
                                ))}
                            </div>
                    <div className="d-flex align-items-center justify-content-center mt-4">
                    <Pagination count={10} color="primary" />
                    </div>
                        
                    </div>
                    </div>   
                </div>

            </section>
        </>
    )
}

export default Search ;