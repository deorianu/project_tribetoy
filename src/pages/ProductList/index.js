import React, { useContext, useEffect, useState } from 'react';
import {emphasize , styled} from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { fecthDataFormApi } from '../../utils/api';
import { Button } from '@mui/material';
import { TiPencil } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { MyContext } from '../../App';
import Rating from '@mui/material/Rating';
import { deleteData } from '../../utils/api';



const StyledBreadCrumb = styled(Chip)(({theme}) =>{
    const backgroundcolor = 
        theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[700];
    return{
        backgroundcolor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&hover, &:focus' : {
            backgroundcolor: emphasize(backgroundcolor, 0.06),
        },
        '&active':{
            boxShadow: theme.shadows[1],
            backgroundcolor: emphasize(backgroundcolor, 0.12),
        },
    };
});



const ProductList = () =>{

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
    return(
        <>
        <div className="right-content w-100">
            <div className="card shadow border-0 w-100 flex row p-4">
                <h5 className="mb-0">Product View</h5> 
                <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                <StyledBreadCrumb
                    component="a"
                    href={'/'}
                    label="Dashboard"
                    icon={<HomeIcon fontSize="small" />}
                >
                </StyledBreadCrumb>

                <StyledBreadCrumb
                    component="a"
                    href={'/product/list'}
                    label="Product List"
                    
                >
                </StyledBreadCrumb>
                <StyledBreadCrumb
                    component="a"
                    href="/product/details"
                    label="Product View"
                    
                >
                </StyledBreadCrumb>


                </Breadcrumbs>  
            </div>
        </div>
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
                <th>DISCOUNT</th>
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
                  <td>{item.discount}</td>
                  <td>{item.countInStock}</td>
                  <td><Rating name="read-only" defaultValue={item.ratings} precision={4.5} readOnly /></td>
                  
                  <td>
                    <div className="actions d-flex align-items-center">

                      {/* <Link to="/product/details">
                      <Button variant='contained'><IoMdEye /></Button>
                      </Link> */}
                      <Link to={`/product/productEdit/${item.id}`}>
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

      </>
    )
}

export default ProductList;