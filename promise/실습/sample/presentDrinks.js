import fetchDrink from "./fetchDrink.js";
import displayDrinks from "./displayDrinks.js";
import setDrink from './setDrink.js'; 

const showDrink = async (url) =>{
    const data = await fetchDrink(url); 
    const section = await displayDrinks(data); 

    if(section){
        setDrink(section)
    }
}

export default showDrink; 