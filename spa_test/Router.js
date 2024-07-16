class Router{
    constructor(routers){
        try{
            if(!routers){
                throw new Error('경로가 없어요'); 
            }
            this.init(routers); 
        }catch(e){
            console.error(e)
        }
    }

    init(routers){
        this.routers = routers; 
        this.rootElem = document.getElementById('app'); 

        window.addEventListener('hashchange', (e)=>{
            this.hashchanged(); 
        }); 
        dispatchEvent(new Event('hashchange'))
    }

    hashchanged(){
        const windowHash = window.location.hash;
        if(windowHash.length > 0){
            for(let r of this.routers){
                if(r.isActiveRoute(windowHash)){
                    this.gotoPage(r.htmlName)
                }
            }
        }else{
            for(let r of this.routers){
                if(r.defaultRoute){
                    this.gotoPage(r.htmlName)
                }
            }
        }
    }

    async gotoPage(page){
        const url = `view/${page}`; 
        let response = await fetch(url); 
        let html = await response.text(); 
        this.rootElem.innerHTML = html; 
    }
}

export default Router;