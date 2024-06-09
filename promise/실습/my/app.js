/* 
1. 데이터 받는 모듈
2. 로딩관련 모듈
3. item을 그리는 모듈

*/
import presentDrink from './presentDrink.js'; 
import './searchForm.js';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a'; 

window.addEventListener('DOMContentLoaded', ()=>{
    presentDrink(url)
})



