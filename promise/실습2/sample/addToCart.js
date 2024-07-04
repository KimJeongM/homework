import { formatPrice, getElement } from "./util";

const cartItemsDOM = getElement('.cart-items'); 
const addToCartDOM = ({id, name, price, image, amount})
