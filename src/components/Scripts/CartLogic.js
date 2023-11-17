import CartService from '../../services/cartService';

let itemCount = 0;

const addToCart = (uuid) => {
    CartService.addToCart(uuid)
            .then(response => {
            })
            .catch(error => console.error('Error al agregar al carrito', error));
};

const getCartItems = () => {
    return CartService.getCart()
        .then(items => {
            return items;
        })
        .catch(error => {
            console.error('Error al obtener el carrito', error);
            throw error;
        });
};


const createCart = () => {
    return CartService.createCart()
        .then(items => {
            return items;
        })
        .catch(error => {
            console.error('Error al obtener el carrito', error);
            throw error;
        });
};

const addToCartCount = () => {
    itemCount += 1;
};

const getItemCartCount = () =>{
    return itemCount;
}

const CartLogic = {
    addToCart,
    getCartItems,
    createCart,
    addToCartCount,
    getItemCartCount
};

export default CartLogic;