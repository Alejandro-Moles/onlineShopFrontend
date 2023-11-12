import axios from "axios";

const API_URL = "http://localhost:8080/";


const getCart = () => {
    return axios.get(API_URL + "cart", { withCredentials: true })
        .then(response =>{  
            return response.data;
        })
        .catch(error => {
            console.error('Error al obtener el carrito', error);
            throw error;
        });
};


const addToCart = (productUuid) => {
    const url = `${API_URL}cart/add`;
    return axios.post(url, { productUuid }, { withCredentials: true })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error al agregar al carrito', error);
            throw error;
        });
};

const removeFromCart = (productUuid) => {
    const url = `${API_URL}cart/remove`;
    return axios.post(url, { productUuid })
        .then(response => response.data)
        .catch(error => {
            console.error('Error al eliminar del carrito', error);
            throw error;
        });
};

const CartService = {
    getCart,
    addToCart,
    removeFromCart,
};

export default CartService;
