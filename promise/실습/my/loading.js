const loading = document.querySelector('.loading'); 

export const showLoading = () =>{
    loading.classList.remove('hide-loading'); 
}

export const hideLoading = () =>{
    loading.classList.add('hide-loading'); 
}