const fetchData = async (url) =>{
    const response = await fetch(url); 
    let data = await response.json(); 
    return data.music; 
}

export default fetchData; 