let selector; 
let d ; 
let dragFlag = false;
let area;
let shiftX;

const drag = (dragSelector, dragArea, direction = 'x') =>{
    //const touchBool = 'ontouchstart' in document;
    selector =  dragSelector; 
    d = direction; 
    area = dragArea;
    console.log(selector)
    let max = area.offsetWidth - selector.offsetWidth; 


   selector.addEventListener('mousedown', (e)=>{
        const translateX = selector.getBoundingClientRect().left - selector.getBoundingClientRect().left; 
        shiftX = translateX - e.pageX;
        dragFlag = true; 
    }); 

    document.addEventListener('mousemove', (e)=>{
        if(!dragFlag) return; 
        const posX = shiftX + e.pageX; 
        const left = (posX <= 0)? 0 : (posX >= max)? max : posX; 
        selector.style.transform = `translateX(${left}px)`; 
    }); 

    document.addEventListener('click', (e)=>{
        dragFlag = false;
    }) 
}

export default drag;