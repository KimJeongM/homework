

class BtnDrag{
    constructor(dragSelector){
        this.area = dragSelector
        this.selector = dragSelector.querySelector('.cir');
        this.dragFlag = false;
        
        this.shiftX = 0; 
        this.max = this.area.offsetWidth;

        this.startHandler =  this.startHandler.bind(this)
        this.moveHandler = this.moveHandler.bind(this); 
        this.endHandler = this.endHandler.bind(this); 

        this.selector.addEventListener('mousedown', this.startHandler); 
        document.addEventListener('mousemove', this.moveHandler); 
        document.addEventListener('mouseup', this.endHandler); 
        document.addEventListener('click', this.endHandler, {capture : false}); 
    }

    startHandler(e){
        const translateX = this.selector.getBoundingClientRect().left - this.area.getBoundingClientRect().left; 
        this.shiftX = translateX - e.pageX; 
        this.dragFlag = true;
    }

    moveHandler (e){
        if(!this.dragFlag) return;
    
        const posX = this.shiftX + e.pageX; 
        const left = (posX <= 0)? 0 : (posX >= this.max)? this.max : posX;
        this.selector.style.transform = `translateX(${left}px)`; 
        this.area.querySelector('.current').style.width = `${(left / this.area.offsetWidth) * 100}%`;

        const cirDragMove = new CustomEvent('cirDragMove', {detail : this.area } ); 
        document.dispatchEvent(cirDragMove);
    }

    endHandler(e){
        e.stopPropagation();
        e.preventDefault();
        if(!this.dragFlag) return;
    
        const cirDragEnd = new CustomEvent('cirDragEnd', {detail : this.area } ); 
        document.dispatchEvent(cirDragEnd); 
        this.dragFlag = false;
    }
}

export default BtnDrag;