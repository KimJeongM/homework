import { allProductsUrl } from "./util.js";

const fetchProducts =  async () =>{
    const response = await fetch(allProductsUrl);
    if(response){
        return response.json(); 
    }

   //return response;
    
}

export default fetchProducts