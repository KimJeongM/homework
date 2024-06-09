import test from './presentDrinks.js'; 
import './searchForm.js'; 



const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a";

window.addEventListener('DOMContentLoaded', ()=>{
    test(URL)
})
