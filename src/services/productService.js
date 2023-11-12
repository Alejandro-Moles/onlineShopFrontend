import axios from "axios";

const API_URL = "http://localhost:8080/";

const getProducts = () => {
    return axios.get(API_URL + "products");
};

const getProduct = (uuid) => {
    return axios.get(`${API_URL}products/${uuid}`);
}

const updateProducts = (uuid, productData) => {
    const url = `${API_URL}products/${uuid}`;
    return axios.put(url, productData);
}

const createProduct = (productData) => {
    const url = `${API_URL}products`;
    return axios.post(url, productData);
};

const ProductService = {
    getProducts,
    getProduct,
    updateProducts,
    createProduct
}; 


export default ProductService;