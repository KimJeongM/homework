import fetchData from './fetchData.js'; 
import { hideLoading } from './loading.js';

const presentDrink = async () =>{
    const id = localStorage.getItem('drink'); 
    console.log(id)
    if(!id){
        window.location.replace('index.html')
    }else{
        const drink = await fetchData(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`); 
        await displaySingleDrink(drink);
    }
}
const displaySingleDrink = (data) =>{
    hideLoading(); 
    const drink = data.drinks[0];
    const {strDrinkThumb:image, strDrink:name,  strInstructions : desc  } = drink; 
    const list = [
        drink.strIngredient1,
        drink.strIngredient2,
        drink.strIngredient3,
        drink.strIngredient4,
        drink.strIngredient5,
    ]; 

    const img = document.querySelector('.drink-img'); 
    const drinkName = document.querySelector('.name');; 
    const description = document.querySelector('.desc');
    const ingredients = document.querySelector('.drink-ingredients');

    console.log(image)
    img.src = image; 
    drinkName.textContent = name; 
    description.textContent = desc; 
    ingredients.innerHTML = list.map((item)=>{
        if(!item) return; 
        return `<li>${item}</li>`
    }).join('')





}


presentDrink()

