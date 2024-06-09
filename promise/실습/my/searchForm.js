import presentDrink from './presentDrink.js'

const input = document.querySelector('input');
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='; 

input.addEventListener('keyup', (e)=>{
    e.preventDefault();
    const value = e.target.value; 
    if(!value) return; 
    presentDrink(`${url}${value}`)

})