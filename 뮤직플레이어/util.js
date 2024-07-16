const getElement = (elem) =>{
    const element = document.querySelector(elem); 
    if(element) return element; 
    throw new Error('no element'); 
}

const getStorageItem = (item) =>{
    let storageItem = localStorage.getItem(item); 
    if(storageItem){
        storageItem = JSON.parse(localStorage.getItem(item))
    }else{
        storageItem = []
    }
    return storageItem; 
}

const setStorageitem = (name, item) => {
    localStorage.setItem(name, JSON.stringify(item)); 
}



export {getElement, getStorageItem, setStorageitem}; 
