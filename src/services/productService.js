import axios from "axios";

const API_URL = "http://localhost:8080/";

const getProducts = () => {
    return axios.get(API_URL + "products");
};

const getProduct = (uuid) => {
    return axios.get(`${API_URL}products/${uuid}`);
}

const ProductService = {
    getProducts,
    getProduct
};


export default ProductService;