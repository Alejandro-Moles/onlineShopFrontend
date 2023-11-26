import axios from "axios";

const API_URL = "http://localhost:8080/";

const createOrderProduct = (orderProductData) => {
    const url = `${API_URL}ordersProducts`;
    return axios.post(url, orderProductData);
};

const getOrderProductByOrder = (uuid) => {
    return axios.get(`${API_URL}ordersProducts/${uuid}`);
}


const OrderProductService = {
    createOrderProduct,
    getOrderProductByOrder
}; 


export default OrderProductService;