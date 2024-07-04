
import { getElement, getStorageItem, setStorageItem, formatPrice} from "./util.js";
import {findProduct} from './store.js';
import addToCartDOM from './addToCartDOM.js';

const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart'); 

const addToCart = (id) => {
    // 카트에 동일한 제품이 있으면 수량만 늘리고 없으면 돔을 추가한다. 
    
    let item = cart.find((cartItem) => cartItem.id == id); 
    console.log(cart)
    if(!item){
        let product = findProduct(id); 
        product = {...product, amount : 1};
        cart = [...cart, product]; 
        addToCartDOM(product)
    } else{
        const amount = increaseAmount(id); 
        const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')]
        const newAmount = items.find((value) => value.dataset.id == id); 
        //newAmount.textContent = amount
        console.log(cartItemsDOM)
    }
    setStorageItem('cart', cart);
}

const increaseAmount = (id) =>{
    let newAmount; 
    cart = cart.map((cartItem) =>{
        if(cartItem.id == id){
            newAmount = cartItem.amount + 1; 
            cartItem = {...cartItem, amount : newAmount}
        }
        return cartItem; 
    }); 
    return newAmount;
}

function displayCartItemsDOM() {
    cart.forEach((cartItem) => {
      addToCartDOM(cartItem);
    });
  }

const init = () =>{
    displayCartItemsDOM()

}

init()
export {addToCart}
