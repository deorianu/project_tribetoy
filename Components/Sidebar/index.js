import React, { useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import sidebanner from "../../assets/images/side_banner1.jpg";
import { useParams } from 'react-router-dom';

const Sidebar =(props) =>{

    const [rangeSliderValue, setRangeSliderValue] = useState([100, 2000]);
    const [ productData, setProductData] = useState([]);
    const [ categoryId, setCategoryId ] =useState([]);

    const [filterCategory, setFilterCategory] = useState('');

  
    const {id}= useParams(); 

// useEffect(()=>{
//     setCategoryId(id)
// },[id])

    const handleChange = (event) => {
        setFilterCategory(event.target.value);
        
        props.filterData(event.target.value)
        setCategoryId(event.target.value)
      };

    
    // Trigger price filter on slider value change
    // useEffect(() => {
    //     props.filterByPrice(rangeSliderValue, id);
    // }, [rangeSliderValue, id]);
    
    return(
        <>
            <div className="sidebar">
                <div className='sticky'>

                
                <div className="filterBox">
                    <h6>PRODUCT CATEGORIES</h6>
                    <div className=''>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={filterCategory}
                        onChange={handleChange}
                    >
                        {props.catData?.categoryList?.length !== 0 &&
            props.catData?.categoryList.map((cat, index) => {
                
              return (
                <FormControlLabel key={index} value={cat?.id}  control={<Radio />} label={cat?.name} />
                            
                    )
                        })
                    }
                    
                    
                    </RadioGroup>
                        <ul>
                        
                            
                        </ul>                        
                    </div>
                </div>

                {/* <div className='filterBox'>
                    <h6>FILTER BY PRICE</h6>
                    <RangeSlider value={rangeSliderValue} onInput={setRangeSliderValue} min={100} max={2000} />
                    <div className='d-flex pt-2 pb-2 priceRange'>
                        <span><strong> {rangeSliderValue[0]}</strong></span>
                        <span className='ml-auto'><strong>{rangeSliderValue[1]}</strong></span>
                    </div>    
                </div> */}


                <br/>

                <Link to="#"><img src={sidebanner} alt='' className='w-100' ></img></Link>
                </div>

            </div>
        </>
    )
}

export default Sidebar;