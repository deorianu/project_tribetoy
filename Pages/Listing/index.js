import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Button from '@mui/material/Button';
import { IoMdMenu } from "react-icons/io";
import { TfiLayoutGrid4Alt, TfiLayoutGrid3Alt } from "react-icons/tfi";
import Pagination from '@mui/material/Pagination';
import { useParams } from "react-router-dom";
import { fecthDataFormApi } from "../../utils/api";
import ProductItem from "../../Components/ProductItem";

const Listing = () => {
    const [productData, setProductData] = useState([]);
    const [catData, setCatData] = useState([]);
    const [productView, setProductView] = useState('grid-four');  

    const { id } = useParams();

    useEffect(() => {
        fecthDataFormApi('/api/category').then((res) => {
            setCatData(res || []);
        });
    }, []);


    useEffect(() => {
        if (id) {
            fecthDataFormApi(`/api/product?categoryId=${id}`).then((res) => {
                setProductData(res?.products || []);
            });
        } else {
            fecthDataFormApi('/api/product').then((res) => {
                setProductData(res?.products || []);
            });
        }
    }, [id]);


    return (
        <>
            <section className="product_Listing_Page">
                <div className="container">
                    <div className="productListing d-flex">
                        {catData?.length !== 0 && <Sidebar filterData={setProductData} catData={catData} />}
                        <div className="content-right">
                            
                                
                            <div className={`productListing ${productView}`}>
                                {Array.isArray(productData) && productData.length > 0 ? (
                                    productData.map((item, index) => (
                                        <ProductItem itemView={productView} key={index} item={item} />
                                    ))
                                ) : (
                                    <p>No products found.</p>
                                )}
                            </div>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <Pagination count={10} color="primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Listing;
