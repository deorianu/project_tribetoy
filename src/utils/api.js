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

export const postData = async (url, formData) => {
  try {
    // Axios returns data in the 'data' field
    const { data } = await axios.post("https://localhost:4000" + url, formData);
    return data; // Return the actual response data
  } catch (error) {
    console.error("Error during POST request:", error);
    return error;
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


