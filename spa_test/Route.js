class Route{
    constructor(hashName, htmlName, defaultRoute = false){
        try{
            if(!hashName || !htmlName){
                throw new Error('이름이 없어요')
            }
            this.init(hashName, htmlName, defaultRoute)
        } catch (e) {
            console.error(e);
        }
    }

    init(hashName, htmlName, defaultRoute){
        this.hashName = hashName; 
        this.htmlName = htmlName; 
        this.defaultRoute = defaultRoute; 
    }

    isActiveRoute(hash){
        return hash.replace('#', '') == this.hashName
    }
}

export default Route; 

/*
htmlName, hashName, defaultBool
*/