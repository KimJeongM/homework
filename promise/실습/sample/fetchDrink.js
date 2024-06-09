// 데이터 받아오기 


const fetchDrink = async (url) =>{
    try{
        const response = await fetch(url); 
        const data = await response.json(); 
        return data; 
    }catch(error){
        console.log(error)
    }
}


export default fetchDrink; 