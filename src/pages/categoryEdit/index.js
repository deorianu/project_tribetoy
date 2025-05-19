import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {emphasize , styled} from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { fecthDataFormApi, editData } from '../../utils/api';
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



const CategoryEdit = () => {
    // const[files, setFiles] = useState([]);
    // const [imgFiles, setImgFiles] = useState([]);
    // const [isSelectedImages, setIsSelectedImages] = useState(false);
    // const [preview, setPreview] = useState(); 
    const [error_, setError ] = useState(false);
    const history = useNavigate(); //used to redirect to anoter page
    const [category, setCategory] = useState([]);
    const [formFields, setformFields] = useState({
        name: '',
        // images: [],
        // color: ''
    });
    

let { id } = useParams();

const context = useContext(MyContext)

const formdata = new FormData();

//for image preview
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


  useEffect(()=>{
    fecthDataFormApi(`/api/category/${id}`).then((res)=>{
        setCategory(res);
        setformFields({
            name:res.name,
            // color:res.color
        })

        // setPreview(res.images);

    });
  },[id]);

    //post images
  // const onChangeFile = async (e, apiEndPoint) =>{
  //   try{
  //     const imgArr =[];
  //     const files = e.target.files;
  //     setImgFiles(e.target.files)
      
  //     for(var i=0; i< files.length; i++)
  //     {

  //       if(files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/jpg' || files[i].type === 'image/svg' || files[i].type === 'image/gif' || files[i].type === 'image/png' ))
  //       {
  //           setImgFiles(e.target.files)
  //           const file = files[i];
  //       imgArr.push(file);
  //       formdata.append(`images`,file);

  //       setFiles(imgArr);
  //       console.log(imgArr);

  //       setIsSelectedImages(true);

  //       }
        
        
  //     }

      
      

  //     postData(apiEndPoint, formdata).then((res)=>{
        
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


    const editCategory = async (e) => {
        e.preventDefault();

        formdata.append('name', formFields.name)
        // formdata.append('color', formFields.color)
       
        console.log("Submitting Form Data:", formFields);
    if(formFields.name !==""  ) //&& formFields.color!== ""
    {
      
            // Sending formdata to create category API
            editData(`/api/category/${id}`, formFields).then((res)=>{

            console.log("Category created successfully:", res);
            history('/category/categoryList');
            });
   
    }else{
        setError(true);
    }
};
        
     
    return(
        <>
        <div className="right-content w-100">
            <div className="card shadow border-0 w-100 flex row p-4">
                <h5 className="mb-0">Edit Category</h5> 
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
    <form className='form ' onSubmit={editCategory}>
        <div className="container">
            <div className="card shadow border-0 p-4">
                {error_===true && <p className='text-danger'>please fill all the fields.</p>}
                <div className="form-group">
                    <h5>Category Name</h5>
                    <input type="text" className="form-control" value={formFields.name} name='name' onChange={changeInput} />
                </div>
                {/* <div className="form-group">
                    <h5>Background Color</h5>
                    <input type="text" className="form-control" value={formFields.color} name='color' onChange={changeInput}/>
                </div> */}
                {/* <div className="card p-3 ml-3 mr-3">
            <div className='imageUploadSec'>
              <h4 className='mb-4'>Images Publish</h4>

                <div className='imageUploadBox d-flex align-items-center'>
            
                  {

                    preview?.length !==0 && preview?.map((img, index)=>{
                      return(
                        <div className='uploadBox' key={index}>
                          
                            <img src={img} alt='images' className='w-100' /> */}
                                
                            {/* <img src={`${context.baseUrl}/uploads/${img}`} alt='images' className='w-100'/> */}
                            
                          
                        {/* </div>
                      )
                    })
                  }
                 */}

                    {/* <div className='uploadBox'>
                      <input type='file' multiple onChange={(e) => onChangeFile(e, '/api/category/upload')} name='images' />
                      <div className='info'>
                      <FaRegImages />
                      <h5>Image Upload</h5>
                      </div>
                    </div> */}
                    
            </div>
          </div>
          <br/>
          
          <Button type="submit" className="btn btn-primary btn-lg w-100 mb-3" 
          >
            <FaCloudUploadAlt className="publish_btn" /> &nbsp;
            <span>
              <h5>Publish and View</h5>
            </span>
          </Button>
    
    </form>
        
        <br/>
        <br/>
        <br/>
        </>
    )
}

export default CategoryEdit;