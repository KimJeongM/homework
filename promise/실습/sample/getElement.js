const getElement = (elem) =>{
    const element = document.querySelector(elem); 
    if(element) return element; 
    throw new Error('no element selected')
}

export default getElement; 