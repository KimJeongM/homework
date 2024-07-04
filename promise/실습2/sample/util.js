const allProductsUrl = './url.json'; 

const  getElement = (elem) =>{
    const element = document.querySelector(elem); 
    if(element) return element; 
    throw new Error('no element');
}

const formatPrice = (price) =>{
    let formattedPrice = new Intl.NumberFormat('en-US', {
        style : 'currency', 
        currency : 'USD'
    }).format((price / 100).toFixed(2))
    return formattedPrice;
}

const getStorageItem = (item) =>{
    let storageItem = localStorage.getItem(item); 
    if(storageItem){
        storageItem = JSON.parse(localStorage.getItem(item)); 
    }else{
        storageItem = []
    }
    return storageItem; 
}

const setStorageItem = (name, item) =>{
    localStorage.setItem(name, JSON.stringify(item));
}

export {
    allProductsUrl, 
    getElement, 
    formatPrice, 
    getStorageItem, 
    setStorageItem
}