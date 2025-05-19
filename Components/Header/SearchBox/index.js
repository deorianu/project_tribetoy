import { IoIosSearch } from "react-icons/io";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { fecthDataFormApi } from "../../../utils/api";
import { MyContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const SearchBox = () =>{
const [ searchField, setSearchField ] = useState("");
const [ isLoading, setIsLoading ] = useState(false);

const context = useContext(MyContext);
const history = useNavigate();

const onchangeValue = (e)=>{
    setSearchField(e.target.value);
}

const searchProduct =()=>{
    setIsLoading(true);
    fecthDataFormApi(`/api/Search?q=${searchField}`).then((res)=>{
        context.setSearchData(res);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        
        history("/search")
    })
}
return(
    <div className="headerSearch ml-auto">
        <input type="text" placeholder="Search for products.."
        onChange={onchangeValue}
        ></input>
        <Button onClick={searchProduct}>
        {
            isLoading===true ?  <CircularProgress color="inherit" />
            :
            <IoIosSearch />
        } 
        </Button>                       
    </div>
)

}
export default SearchBox ;