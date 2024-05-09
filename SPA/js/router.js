function Router(routes){
    try{
        if(!routes){
            throw 'error : no routes'; 
        }
        this.constructor(routes); 
        this.init(); 
    } catch(e){
        console.error(e)
    }
}

Router.prototype = {
    routes : undefined, 
    rootElem : undefined,
    constructor : function(routes){
        this.routes = routes; 
        this.rootElem = document.querySelector('#app'); 
    },

    init : function(){
        let r = this.routes; 
        document.addEventListener('click', (e)=>{
            this.hashChanged(this, r)
        })
    }, 

    hashChanged : function(scope, r){
        if(window.location.hash.length > 0){
            for(let i = 0; i < r.length; i++){
                var route = r[i]; 
                console.log(route)
            }
        }
    }
}

