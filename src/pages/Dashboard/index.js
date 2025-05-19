import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Button } from "@mui/material";
import { IoMdEye } from "react-icons/io";
import { TiPencil } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { MyContext } from '../../App';
import Rating from '@mui/material/Rating';
import { deleteData } from "../../utils/api";
import { fecthDataFormApi } from "../../utils/api";


export const data = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];

export const options = {
  'backgroundColor': 'transparent'
};

const Dashboard = () => {

  const context = useContext(MyContext);
  const [productList, setProductList] = useState([])

  //fetch product to frontend
  useEffect(() => {
    window.scrollTo(0, 0);
    fecthDataFormApi("/api/product").then((res)=>{
        setProductList(res)
    });
  }, []);

  const deleteProduct = (id) => {
    deleteData(`/api/product/${id}`).then((res) => {
        context.setAlertBox({
          open:true,
          error:false,
          msg:'Product Delted!'
        })
        fecthDataFormApi("/api/product").then((res)=>{
          setProductList(res)
      });
});
};

const handleChange = (event, value) =>{
fecthDataFormApi(`/api/product/?page=${value}`).then((res) =>{
  setProductList(res);
  
})
}

  return (
    <div className="right-content w-100">
      
    <div className="card shadow border-0 p-3">
        <h3 className="hd">Our Products</h3>

      <div className="table-responsive mt-3">
          <table className="table tabel-bordered v-align">
            <thead className="thead-dark">
              <tr>
                <th>UID</th>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>RATING</th>
                <th>ACTION</th>
              </tr>
              </thead>

              <tbody>

                {
                    productList?.products?.length!==0 && productList?.products?.map((item, index)=>{
                        return(
                            <tr>
                  <td>#{index+1}</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper"> 
                        <div className="img card shadow m-0">
                        <img src={`${context.baseUrl}/uploads/${item.images[0]}`} alt="" className='w-100'></img>
                        </div>
                        
                      </div>
                      <div className='info -pl-3'>
                      <h6>{item.name}</h6>
                      <p>{item.description}</p>
                      </div> 
                    </div>
                    </td>
                  <td>{item.category.name}</td>
                  <td>{item.brand}</td>
                  <td><del className="old">Rs.{item.oldPrice}</del>
                  <span className="new text-danger ml-2">Rs.{item.price}</span>
                  </td>
                  <td>{item.countInStock}</td>
                  <td><Rating name="read-only" defaultValue={item.ratings} precision={4.5} readOnly /></td>
                  
                  <td>
                    <div className="actions d-flex align-items-center">

                      <Link to="/product/details">
                      <Button variant='contained'><IoMdEye /></Button>
                      </Link>
                      <Link to="/product/details">
                      <Button variant='contained' color='success'><TiPencil /></Button></Link>
                      
                      <Button color="error" variant='contained'
                      onClick={()=>deleteProduct(item.id)}><MdDelete /></Button>
                    </div></td>                 
                </tr>
                        )
                    })
                }
                
              </tbody>

              
              
            
          </table>
          <div className="d-flex tableFooter">
            {/* <p>showing <b>{page}</b> of <b>{catData?.length}</b> results </p> */}
              <Pagination count={productList?.totalPages} color="primary" className="pagination" onChange={handleChange}/>
          </div>
        </div>

      </div>


    </div>
  );
};

export default Dashboard;