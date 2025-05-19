import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const QuantityBox = (props) =>{

    const [inputVal, setInputVal] = useState(1);
    useEffect(()=>{
        if(props?.value!==undefined && props?.value!==null && props?.value!==""){
            setInputVal(parseInt(props?.value))
        }
    },[props.value])

    const minus=() =>{
        if(inputVal!==1 && inputVal>0){
            setInputVal(inputVal-1);
        }  
    }

    const plus=() =>{
        setInputVal(inputVal+1);
    }

    useEffect(()=>{
        props.quantity(inputVal)
        props.selectedItem(props.item,inputVal)
    },[inputVal]);
    
    return(
        <div className="quantityDrop d-flex align-items-center">
            <Button onClick={minus}><FiMinus /></Button>
            <input type="text" value={inputVal}></input>
            <Button onClick={plus}><FiPlus /></Button>
        </div>
    )
}

export default QuantityBox;