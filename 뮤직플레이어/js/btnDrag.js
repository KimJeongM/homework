let selector; 
let dragFlag = false;
let area;
let shiftX = 0; 
let max;

const btnDrag = (dragSelector) =>{
    //const touchBool = 'ontouchstart' in document;
    selector = dragSelector.querySelector('.cir'); 
    area = dragSelector; 
    
    max = area.offsetWidth;
    selector.addEventListener('mousedown', startHandler); 
    document.addEventListener('mousemove', moveHandler); 
    document.addEventListener('mouseup', endHandler); 
    document.addEventListener('click', endHandler, {capture : false}); 
}

const startHandler = (e) =>{
    const translateX = selector.getBoundingClientRect().left - area.getBoundingClientRect().left; 
    shiftX = translateX - e.pageX; 
    dragFlag = true;
}

const moveHandler = (e) =>{
    if(!dragFlag) return;

    const posX = shiftX + e.pageX; 
    const left = (posX <= 0)? 0 : (posX >= max)? max : posX;
    selector.style.transform = `translateX(${left}px)`; 
    area.querySelector('.current').style.width = `${(left / area.offsetWidth) * 100}%`;
    console.log((left / area.offsetWidth) * 100)
}

const endHandler = (e) =>{
    e.stopPropagation();
    e.preventDefault();
    if(!dragFlag) return;

    const cirDragEnd = new CustomEvent('cirDragEnd', {detail : area } ); 
    document.dispatchEvent(cirDragEnd); 
    dragFlag = false;
}

export default btnDrag;