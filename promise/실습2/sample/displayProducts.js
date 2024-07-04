import { formatPrice } from "./util.js";
import { addToCart } from "./setupCart.js";

const display = (products, element, filters) =>{
    element.innerHTML = products.map(product => {
        const {id, name, image, price} = product; 
        return `
            <article>
                <div class="img-wrap">
                    <img src="${image}" alt="${name}" class="product-img">
                    <div class="btn-wrap">
                        <a href="product.html?id=${id}" class="btn">view</a>
                        <button type="button" class="btn product-cart-btn" data-id="${id}">cart</button>
                    </div>
                </div>
                <div class="desc-wrap">
                    <p class="name">${name}</p>
                    <p class="price">${formatPrice(price)}</p>
                </div>
            </article>
        `
    }).join(''); 

    element.addEventListener('click', (e) =>{
        const parent = e.target.parentElement; 
        if(parent.classList.contains('product-cart-btn') || e.target.classList.contains('product-cart-btn')){
            addToCart( e.target.dataset.id);
        }
    })
}

export default display;