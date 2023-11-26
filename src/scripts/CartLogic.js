import CartService from '../services/cartService';
import ProductService from '../services/productService';
import { OutOfStockError } from './Errors/error'
let itemCount = 0;

const addToCart = async (uuid) => {
    try {
        const product = await ProductService.getProduct(uuid);
        if (product.data.stock > 0) {
            const addedProduct = await CartService.addToCart(uuid);
            const isSuccess = await ProductService.updateProductStock(addedProduct.productUuid, 1, false);
            if (!isSuccess) {
                throw new Error("Failed to update stock");
            }
        } else {
            throw new OutOfStockError("Product out of stock. Cannot add to cart.");
        }
    } catch (error) {
        console.error('Error al agregar al carrito', error);
        throw error;
    }
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

const clearCart = () => {
    console.log("limpiando");
    CartService.clearCart();
};

const addToCartCount = () => {
    itemCount += 1;
};

const getItemCartCount = () =>{
    return itemCount;
}

const updateProductStock = async (productUuid, quantity, isAdding) => {
    try {
        const isSuccess = await ProductService.updateProductStock(productUuid, quantity, isAdding);
        return isSuccess;
    } catch (error) {
        console.error("Error updating product stock:", error);
        throw error;
    }
};

const CartLogic = {
    addToCart,
    getCartItems,
    createCart,
    addToCartCount,
    getItemCartCount,
    clearCart,
    updateProductStock
};

export default CartLogic;