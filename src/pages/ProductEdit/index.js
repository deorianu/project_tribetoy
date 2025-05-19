import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { editData, fecthDataFormApi, postData } from '../../utils/api';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { FaRegImages } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';

const StyledBreadCrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[700];

  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const ProductEdit = () => {
const [categoryVal, setCategoryVal] = useState('');
const [ratingsVal, setRatingsVal] = useState(1);
const [isFeaturedValue, setIsFeaturedValue] = useState(false);
const[files, setFiles] = useState([]);
const [imgFiles, setImgFiles] = useState([]);
const [preview, setPreview] = useState();
const history = useNavigate(); //used to redirect to anoter page
const [product, setProduct ] = useState([]);
const [catData, setCatData] = useState([]);
const [isSelectedImages, setIsSelectedImages] = useState(false);

  const [formFields, setFormFields] = useState({
    name: '',
    description:'',
    brand:'',
    price:null,
    oldPrice:null,
    discount:null,
    catName:'',
    categoryId:'',
    category:'',
    countInStock:null,
    ratings:0,
    isFeatured:false,
  });

// const productImages =useRef;

let { id } =useParams();

const context = useContext(MyContext)

const formdata = new FormData();

const fetchCategories = async () => {
  try {
      let allCategories = [];
      let page = 1;
      let totalPages = 1;

      while (page <= totalPages) {
          console.log(`Fetching categories for page: ${page}`); // Debug log

          const res = await fecthDataFormApi(`/api/category?page=${page}`);
          console.log(`API Response for page ${page}:`, res); // Debug log

          // Validate response structure
          if (!res || !Array.isArray(res.categoryList)) {
              console.error("Invalid categoryList in response:", res);
              break; // Stop fetching if response structure is invalid
          }

          // Accumulate categories
          allCategories = [...allCategories, ...res.categoryList];

          // Update totalPages
          totalPages = res.totalPages || 1;
          

          page++;
      }

      // Update state with fetched categories
      
      setCatData({ categoryList: allCategories });
  } catch (error) {
      console.error("Error fetching categories:", error.message);
  }
};

// Call fetchCategories in useEffect
useEffect(() => {
  window.scrollTo(0, 0);
  fetchCategories();
}, []);


useEffect(()=>{
    fecthDataFormApi(`/api/product/${id}`).then((res)=>{
        setProduct(res);
        setFormFields({
            name:res.name,
            description:res.description,
            brand:res.brand,
            price:res.price,
            oldPrice:res.oldPrice,
            discount:res.discount,
            catName:res.catName,
            categoryId:res.categoryId,
            category:res.category,
            countInStock:res.countInStock,
            ratings:res.ratings,
            isFeatured:res.isFeatured

        })

        setRatingsVal(res.ratings);
        setIsFeaturedValue(res.isFeatured);
        setCategoryVal(res.category);
        setPreview(res.images);     

    });
},[]);


useEffect(()=>{
  if(!imgFiles) return;

  let tmp = [];

  for(let i=0; i<imgFiles.length; i++)
  {
    tmp.push(URL.createObjectURL(imgFiles[i]));
  }

  const objectUrls = tmp;
  setPreview(objectUrls);

  //free memory
  for(let i=0; i<objectUrls.length; i++){
    return() =>{
      URL.revokeObjectURL(objectUrls[i])
    }
  }
},[imgFiles])


const selectCategory=(cat)=>{
  formFields.catName=cat;
}


  const handleChangeCategory = (event) => {
    setCategoryVal(event.target.value);

    setFormFields(()=>({
      ...formFields,
      category: event.target.value
      
  }));
  formFields.categoryId=event.target.value
  alert(event.target.value) //this for getting categoryID
};

  const handleChangeIsFeaturedValue = (event) => {
    const value = event.target.value;
    setIsFeaturedValue(value);
    setFormFields({ ...formFields, isFeatured: value });
  };

  //post images
  const onChangeFile = async (e, apiEndPoint) =>{
    try{
      const imgArr =[];
      const files = e.target.files;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif']; // Allowed MIME types

      setImgFiles(e.target.files)
      
      for(var i=0; i< files.length; i++)
      {
        const file = files[i];

        // Validate file type
        if (!allowedTypes.includes(file.type)) {
          console.error(`File type not allowed: ${file.name}`);
          alert(`Invalid file type: ${file.name}. Please upload jpg, png, svg, or gif files.`);
          continue;
      }
      
        imgArr.push(file);
        formdata.append(`images`,file);
      }

      setFiles(imgArr);
      console.log(imgArr);
      setIsSelectedImages(true);
      postData(apiEndPoint, formdata).then((res)=>{
        context.setAlertBox({
            open:true,
            error:false,
            msg:'sucessfully update images! into uploads folder'
        })
      })
    }catch(error)
    {
      console.log(error)
    }
  }

  // const removeImage = (index) => {
  //   setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Remove image by index
  // };

  const changeInput = (e) => {
    setFormFields({
        ...formFields,
        [e.target.name]: e.target.value,
    });
};

//submit form and click publish button then data should post

const editProduct = async (e) => {
  e.preventDefault();

  formdata.append('name', formFields.name)
  formdata.append('description', formFields.description)
  formdata.append('brand', formFields.brand)
  formdata.append('price', formFields.price)
  formdata.append('oldPrice', formFields.oldPrice)
  formdata.append('discount', formFields.discount)
  formdata.append('catName', formFields.catName)
  formdata.append('categoryId', formFields.categoryId)
  formdata.append('category', formFields.category)
  formdata.append('countInStock', formFields.countInStock)
  formdata.append('ratings', formFields.ratings)
  formdata.append('isFeatured', formFields.isFeatured)
  
  
  
  editData(`/api/product/${id}`, formFields).then((res)=>{

    context.setAlertBox({
        open:true,
        error:false,
        msg:'Product updated successfully!'
    })
    history('/product/list'); //after publish product its redirect to product list page
    });

    setFormFields({
        name:'',
        description:'',
        brand:'',
        price:'',
        oldPrice:'',
        discount:'',
        category:'',
        countInStock:'',
        ratings:'',
        isFeatured:'',
        images:[]
    })
  
}


  return (
    <>
      {/* Breadcrumb Section */}
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex row p-4">
          <h5 className="mb-0">Product Update</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadCrumb
              component="a"
              href="/adminDashboard"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadCrumb component="a" href="/" label="Products" />
            <StyledBreadCrumb component="a" href="/product/details" label="Product View" />
            <StyledBreadCrumb component="a" href="#" label="Product Upload" />
          </Breadcrumbs>
        </div>
      </div>
<form className='form' onSubmit={editProduct}>
      {/* Product Details Form */}
      <div className="row">
        <div className="col-md-12">
          <div className="card p-3 ml-4 mr-3">
            <h4>Basic Information</h4>

            <div className="form-group">
              <h5>PRODUCT NAME</h5>
              <input type="text" name="name" value={formFields.name} onChange={changeInput} />
            </div>

            <div className="form-group">
              <h5>DESCRIPTION</h5>
              <textarea rows={5} className="w-100" name="description" value={formFields.description} onChange={changeInput}> </textarea>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <h5>CATEGORY</h5>
                  <Select
                    value={categoryVal}
                    onChange={handleChangeCategory}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    className="w-100"
                    name="category"
                    
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                        catData.categoryList?.length !==0 && catData.categoryList?.map((cat, index) =>{
                            return(
                                <MenuItem value={cat.id} key={index}
                                onClick={()=>selectCategory(cat.name)}>{cat.name}</MenuItem>
                            )
                        })
                    }
                  </Select>
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <h5>BRAND</h5>
                  <input type='text' name='brand' value={formFields.brand} onChange={changeInput}></input>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <h5>IS FEATURED</h5>
                  <Select
                    value={isFeaturedValue}
                    onChange={handleChangeIsFeaturedValue}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    className="w-100"
                    name="isFeatured"
                    
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={true}>True</MenuItem>
                    <MenuItem value={false}>False</MenuItem>
                  </Select>
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <h5>REGULAR PRICE</h5>
                  <input type="text" name="oldPrice" value={formFields.oldPrice} onChange={changeInput} />
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <h5>DISCOUNT PRICE</h5>
                  <input type="text" name="price" value={formFields.price} onChange={changeInput}/>
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <h5>DISCOUNT </h5>
                  <input type="text" name="discount" value={formFields.discount} onChange={changeInput}/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <h5>PRODUCT STOCK</h5>
                  <input type="text" name="countInStock" value={formFields.countInStock} onChange={changeInput} />
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <h5>RATINGS</h5>
                  <Rating
                    name="simple-controlled"
                    value={ratingsVal}
                    onChange={(event, newValue) => {
                      setRatingsVal(newValue);
                      setFormFields({
                        ...formFields,
                        ratings:event.target.value
                    });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-3 ml-3 mr-3">
        <div className='imageUploadSec'>
              <h4 className='mb-4'>Images Publish</h4>
            <div className='imageUploadBox d-flex align-items-center'>            
                  {
                    preview?.length !==0 && preview?.map((img, index)=>{
                      return(
                        <div className='uploadBox' key={index}>
                            {
                                isSelectedImages === true ?
                                <img src={`${img}`} alt='name' className='w-100'></img>
                                :
                                <img src={`${context.baseUrl}/uploads/${img}`} alt='name' className='w-100'></img>

                            }
                          
                        </div>
                      )
                    })
                  }
                

                    <div className='uploadBox'>
                      <input type='file' multiple onChange={(e) => onChangeFile(e, '/api/product/upload')} name='images' />
                      <div className='info'>
                      <FaRegImages />
                      <h5>Image Upload</h5>
                      </div>
                    </div>
                    
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
      </div> 
</form>
    </>
  );
};

export default ProductEdit;
