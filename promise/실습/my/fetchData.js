import { showLoading } from "./loading.js";

const fetchData = async (url) =>{
    showLoading()
    try{
        const response = await fetch(url); 
        const data = await response.json(); 
        return data;
    }catch(error){  
        console.log(error)
    }
}

export default fetchData;