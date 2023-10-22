import axios from "axios";

const API_URL = "http://localhost:8080/";

const getProducts = () => {
    return axios.get(API_URL + "products");
};

const ProductService = {
    getProducts,
};

export default ProductService;