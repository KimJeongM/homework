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

const timeShow = (time) =>{
    const minutes = addZero(Math.floor(time / 60)); 
    const seconds = addZero(Math.floor(time % 60));
    return `${minutes} : ${seconds}`; 
}

const addZero = (num) => num >= 10? num : '0' + num; 

export {getElement, getStorageItem, setStorageitem, timeShow, addZero}; 
