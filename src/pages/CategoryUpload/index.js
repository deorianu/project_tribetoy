import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {emphasize , styled} from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";

import 'react-lazy-load-image-component/src/effects/blur.css';
import { fetchDataFormApi, postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { FaRegImages } from "react-icons/fa";
import { useContext } from 'react';
import { MyContext } from '../../App';

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



const CategoryUpload = () => {
    
    // const [imgFiles, setImgFiles] = useState([]);
    // const [preview, setPreview] = useState(); 
    const [error_, setError ] = useState(false);
    const history = useNavigate(); //used to redirect to anoter page
    const [formFields, setformFields] = useState({
        name: '',
        // images: [],
        // color: ''
    });
    const[files, setFiles] = useState([]);

const context = useContext(MyContext)

const formData = new FormData();

//for preview
// useEffect(()=>{
//     if(!imgFiles) return;
  
//     let tmp = [];
  
//     for(let i=0; i<imgFiles.length; i++)
//     {
//       tmp.push(URL.createObjectURL(imgFiles[i]));
//     }
  
//     const objectUrls = tmp;
//     setPreview(objectUrls);
  
//     //free memory
//     for(let i=0; i<objectUrls.length; i++){
//       return() =>{
//         URL.revokeObjectURL(objectUrls[i])
//       }
//     }
//   },[imgFiles])


    //post images
  // const onChangeFile = async (e, apiEndPoint) =>{
  //   try{
  //     const imgArr =[];
  //     const files = e.target.files;
  //     // const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif']; // Allowed MIME types

  //     setImgFiles(e.target.files)
      
  //     for(var i=0; i< files.length; i++)
  //     {
  //       formData.append('images', files[i]);
        

  //     }
  //     setFiles(imgArr);

  //     console.log(imgArr);
      
  //     postData(apiEndPoint, formData).then((res)=>{
  //       console.log(res)
        
  //     })
     
  //   }catch(error)
  //   {
  //     console.log(error)
  //   }
  // }

  
  

    const changeInput = (e) => {
        setformFields({
            ...formFields,
            [e.target.name]: e.target.value,
        });
    };

    const addCategory = async (e) => {
        e.preventDefault();

        formData.append('name', formFields.name)
        formData.append('color', formFields.color)
       
    if(formFields.name !=="" && formFields.color!== "" )
    {
     postData('/api/category/create', formFields).then((res)=>{
      history('/category/categoryList');
     }) 
   
    }else{
        context.setAlertBox({
          open:true,
          error:true,
          msg:'please fill all the details'
        });
        return false;
    }
};
        
     
    return(
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
        </div>
    <form className='form' onSubmit={addCategory}>
    <div className="container">
            <div className="card shadow border-0 p-4">
                {error_===true && <p className='text-danger'>please fill all the fields.</p>}
                <div className="form-group">
                    <h5>Category Name</h5>
                    <input type="text" className="form-control" name='name' onChange={changeInput} />
                </div>
                {/* <div className="form-group">
                    <h5>Background Color</h5>
                    <input type="text" className="form-control" name='color' onChange={changeInput}/>
                </div>
                <div className="card p-3 ml-3 mr-3">
            <div className='imageUploadSec'>
              <h4 className='mb-4'>Images Publish</h4>

                <div className='imageUploadBox d-flex align-items-center'>
            
                  {

                    preview?.length !==0 && preview?.map((img, index)=>{
                      return(
                        <div className='uploadBox' key={index}>
                          <img src={img} className='w-100'></img>
                        </div>
                      )
                    })
                  }
                

                    <div className='uploadBox'>
                      <input type='file' multiple onChange={(e) => onChangeFile(e, '/api/category/upload')} name='images' />
                      <div className='info'>
                      <FaRegImages />
                      <h5>Image Upload</h5>
                      </div>
                    </div> 
                    
            </div>*/}
          </div>
          <br/>
          
          <Button type="submit" className="btn btn-primary btn-lg w-100 mb-3" 
          >
            <FaCloudUploadAlt className="publish_btn" /> &nbsp;
            <span>
              <h5>Publish and View</h5>
            </span>
          </Button>
      </div> 
                
    </form>
        
        <br/>
        <br/>
        <br/>
        </>
    )
}

export default CategoryUpload;