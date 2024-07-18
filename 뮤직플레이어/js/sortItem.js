class SortItem{
    constructor(selector){
        this.selector = selector; 
        this.startHandler = this.startHandler.bind(this); 
        this.moveHandler = this.moveHandler.bind(this); 
        this.endHandler = this.endHandler.bind(this); 
        this.dragFlag = false;
        this.animation = false;
        this.items = [...this.selector.getElementsByTagName('li')];
        
        this.selector.addEventListener('mousedown', this.startHandler); 
        
    }

    startHandler(e){
        let target = e.target; 
        this.dragFlag = true; 
        while(target.className !== 'sort-btn'){
            target = target.parentElement;
            if(target.tagName == 'BODY'){
                target = null; 
                return; 
            }
        }
        this.handler = target; 
        if(!this.handler) return;

        this.item = this.handler.closest('.item'); 
        this.startDragY = e.pageY;
        this.itemTop = this.item.offsetTop;
        this.listHeight = this.selector.offsetHeight;
        this.itemsTop = this.items.map((item)=>item.offsetTop); 
        this.positions = this.items.map((_, index)=> index);
        this.position = Math.round((this.itemTop / this.listHeight) * this.items.length);

        this.itemHeight = this.items[0].offsetHeight;
        this.selector.style.height = `${this.listHeight}px`; 
        this.item.classList.add('is-drag');
        this.items.forEach((item, index)=>{
            item.style.cssText = `position:absolute; 
                                            top:0; left:0; width:100%; 
                                            transform:translateY(${this.itemsTop[index]}px);
                                            z-index: ${(item == this.item)? 2 : 1}`; 
        }); 
        setTimeout(()=>{
            this.items.forEach((item, index) =>{
                if(this.item == item) return; 
                item.style.transition = `transform 0.3s ease-in`; 
            });
        });

        document.addEventListener('mousemove', this.moveHandler);
        document.addEventListener('mouseup', this.endHandler);
    }
    
    moveHandler(e){
        if(!this.dragFlag) return; 

        const top = this.itemTop + e.pageY - this.startDragY; 
        const newPosition = Math.round((top / this.listHeight) * this.items.length);
       
        this.item.style.transform = `translateY(${top}px)`;

         this.positions.forEach((index) =>{
            if(index == this.position || index != newPosition) return; 
            this.swapElements(this.positions, this.position, index); 
            this.position = index;
        }); 

        this.items.forEach((item, index) =>{
            if(item == this.item) return; 
            item.style.transform = `translateY(${this.positions.indexOf(index) * this.itemHeight}px)`
        })

    }

    endHandler(e){
        if(!this.dragFlag) return; 
        console.log('sortendHandler')
        this.item.classList.remove('is-drag');
        let songIndex;
        setTimeout(() =>{
            this.selector.style = ''; 
            this.items.forEach((item, index) => {
                item.style = '';
            }) ; 
            
            this.positions.map((i)=>{
                this.selector.appendChild(this.items[i])
            }); 

            this.items = [...this.selector.getElementsByTagName('li')];
            this.items.forEach((item, index)=>{
                if(item.classList.contains('now')){
                    songIndex = index
                }
            })
            const sortEnd = new CustomEvent('sortEnd', {detail : {positions: this.positions, songIndex }}); 
            document.dispatchEvent(sortEnd);

            this.dragFlag = false;
            document.removeEventListener('mousemove', this.moveHandler);
            document.removeEventListener('mouseup', this.endHandler);
        }); 

       
    }

    swapElements(array, a, b){
        const temp = array[a]; 
        array[a] = array[b]; 
        array[b] = temp;
    }
} 



export default SortItem;