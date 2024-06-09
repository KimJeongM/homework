const setDrink = (list) =>{
    list.addEventListener('click', (e)=>{
        //e.preventDefault();
        const id = e.target.closest('.item').dataset.id
       localStorage.setItem(drink, id);
       console.log(id)
    })
}

export default setDrink; 