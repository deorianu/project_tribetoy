import React, { useState, useEffect, use } from "react";
import { Link } from "react-router-dom";
import {emphasize , styled} from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';

import { Button } from "@mui/material";
import { TiPencil } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { fecthDataFormApi } from "../../utils/api";
import { editData } from "../../utils/api";
import { deleteData } from "../../utils/api";

// import CircularProgress from '@mui/material/CircularProgress';

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



const CategoryList = () => {

  const [catData, setCatData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editFields, setEditFields] = useState({})
  const [editId, setEditId] = useState(null);
  const [formFields, setformFields] = useState({
    name: '',
    // images: [],
    // color: ''
});

  const [page, setPage] = useState(1);


  useEffect(()=>{
    window.scrollTo(0,0);

    fecthDataFormApi('/api/category').then((res)=>{
      setCatData(res)
      console.log(res);
    })
  },[])

  

  const editCategory = (id) =>{
    setformFields({
      name:'',
      // images:'',
      // color:''
      
    });
    setOpen(true);
    setEditId(id)


    fecthDataFormApi(`/api/category/${id}`).then((res)=>{
      setformFields({
        name:res.name,
        // images:res.images,
        // color:res.color
        
      });
      
    })
  }


const deleteCategory = (id) =>{

  deleteData(`/api/category/${id}`).then(res =>{

    
    fecthDataFormApi('/api/category').then((res)=>{
      setCatData(res)
      
    })

  })
}

const handleChange = (event, value) =>{
  fecthDataFormApi(`/api/category/?page=${value}`).then((res) =>{
    setCatData(res);
    console.log(res);
  })
}

  return (
    <>
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex row p-4">
                <h5 className="mb-0">Add Category</h5> 
                <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                <StyledBreadCrumb
                    component="a"
                    href='/adminDashboard'
                    label="Dashboard"
                    icon={<HomeIcon fontSize="small" />}
                >
                </StyledBreadCrumb>

                <StyledBreadCrumb
                    component="a"
                    href={'/'}
                    label="Categories"
                    
                >
                </StyledBreadCrumb>
                <StyledBreadCrumb
                    component="a"
                    href={'/product/details'}
                    label="Category View"
                    
                >
                </StyledBreadCrumb>
                <StyledBreadCrumb
                    component="a"
                    href="#"
                    label="Category Upload"                    
                >
                </StyledBreadCrumb>
                </Breadcrumbs>  
      </div>


      <div className="card shadow border-0 p-3">
        <h3 className="hd">Categories</h3>

        <div className="table-responsive mt-3">
          <table className="table tabel-bordered v-align">
            <thead className="thead-dark">
              <tr>
                <th>UID</th>
                <th>CATEGORY_NAME</th>
                {/* <th>BACKGROUND_COLOR</th>
                <th>IMAGE_URL</th> */}
                <th>ACTION</th>
              </tr>
              </thead>

              <tbody>
                {

                  catData.categoryList?.length !==0 && catData.categoryList?.map((item, index) =>{
                    return(
                      <tr>
                      <td>#{index +1}</td>
                      <td>{item.name}</td>
                      {/* <td>{item.color}</td>
                      <td><img src={item.images[0]} alt="images" className="w-100"></img></td> */}
                      <td>
                        <div className="actions d-flex align-items-center">
    
                          <Link to={`/category/CategoryEdit/${item.id}`}><Button color="success" variant="contained" ><TiPencil /></Button></Link>
                          <Button color="error" onClick={()=>deleteCategory(item.id)} variant="contained" ><MdDelete /></Button>
                        </div></td>                 
                    </tr>
                    )
                  })
                }
               
                
              </tbody>

              
              
            
          </table>
          <div className="d-flex tableFooter">
            {/* <p>showing <b>{page}</b> of <b>{catData?.length}</b> results </p> */}
              <Pagination count={catData?.totalPages} color="primary" className="pagination" onChange={handleChange}/>
          </div>
        </div>

      </div>


    </div>


</>
  );
};

export default CategoryList;