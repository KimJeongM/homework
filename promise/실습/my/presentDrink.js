import fetchData from './fetchData.js'; 
import displayDrinks from './displayDrinks.js'; 
import setDrink from './setDrink.js'; 

const presentDrink = async (url) =>{
    const data = await fetchData(url); 
    const list = await displayDrinks(data); 

    if(list){
        setDrink(list); 
    }
}

export default presentDrink; 
