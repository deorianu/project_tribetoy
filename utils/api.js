import axios from "axios";

export const fecthDataFormApi=async(url)=>{
  try {
    const { data } = await axios.get("https://localhost:4000" + url);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postData = async (url, data) => {
  try {
    //const { data } = await axios.post("http://localhost:4000" + url, formData);
    const response = await fetch("https://localhost:4000" + url, 
      {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
      });
if(response.ok){
  const data = await response.json()
  return data; // Return the response data on success
}else{
  const errorData = await response.json();
  return errorData;
}
} catch (error) {
  console.error('Error:', error)
   
  }
};

export const editData = async (url, updateData) => {
  try {
    const { data } = await axios.put("https://localhost:4000" + url, updateData);
    return data; // Return the actual response data
  } catch (error) {
    console.error("Error during PUT request:", error);
    return error;
  }
};

export const deleteData = async (url) => {
  try {
    const { data } = await axios.delete("https://localhost:4000" + url);
    return data; // Return the actual response data
  } catch (error) {
    console.error("Error during DELETE request:", error);
    return error;
  }
};