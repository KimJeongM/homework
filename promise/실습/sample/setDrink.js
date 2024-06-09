const setCocktail = async (section) =>{
    section.addEventListener('click', (e)=>{
        e.preventDefault();
        const id = e.target.closest('.item').dataset.id; 
        console.log(id)
        //localStorage.setItem('drink', id); 
    })
}

export default setCocktail;