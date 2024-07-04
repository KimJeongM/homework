import fetchProducts from "./fetchProducts.js";
import { getElement } from "./util.js";
import {setupStore, store} from './store.js'; 
import display from './displayProducts.js';

const init = async() =>{
    const products = await fetchProducts(); 
    if(products){
        setupStore(products); 
        const featured = store.filter((product) => product.featured == true); 
        display(featured, getElement('.product-container'))
    }
}

init()