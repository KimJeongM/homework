import { hideLoading } from './loading.js';

const displayDrinks = ({drinks}) =>{
    const list  = document.querySelector('.list'); 
    const title = document.querySelector('.title');
    if(!drinks){
        hideLoading()
        title.textContent = 'sorry!! no-data'; 
        list.innerHTML = null;
        return;
    }

    const drinkHTML = drinks.map((drink)=>{
        const {idDrink : id, strDrinkThumb : image, strDrink : name} = drink; 
        return `
            <li class="item" data-id="${id}">
                <a href="./drink.html">
                    <img src="${image}" alt="${name}">
                    <p class="name">${name}</p>
                </a>
            </li>
        `
    }).join(''); 
    hideLoading(); 
    title.textContent = ''; 
    list.innerHTML = drinkHTML; 
    return list
}

export default displayDrinks; 