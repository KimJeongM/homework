import get from './getElement.js'; 
import presentDrinks from './presentDrinks.js'; 

const baseURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const input = get('input'); 

input.addEventListener('keyup', (e)=>{
    e.preventDefault(); 
    const value = input.value ; 
    if(!value) return; 
    presentDrinks(`${baseURL}${value}`)
})