import axios from "axios";

const API_URL = "http://localhost:8080/";


const createCart = () => {
    return axios.get(API_URL + "createCart", { withCredentials: true })
        .then(response =>{  
            return response.data;
        })
        .catch(error => {
            console.error('Error al obtener el carrito', error);
            throw error;
        });
};

const getCart = () => {
    return axios.get(API_URL + "getCart", { withCredentials: true })
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
            console.log(error)
            throw error;
        });
};

const updateCart = (cartList) => {
    const url = `${API_URL}cart/update`;
    return axios.post(url, cartList, { withCredentials: true })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error al actualizar al carrito', error);
            throw error;
        });
};


const CartService = {
    createCart,
    addToCart,
    removeFromCart,
    getCart,
    updateCart
};

export default CartService;
