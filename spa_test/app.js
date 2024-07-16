import Route from "./Route.js";
import Router from './Router.js'; 

;(function(){
    new Router([
        new Route('home', 'home.html', true),
        new Route('about', 'about.html')
    ]);

})();