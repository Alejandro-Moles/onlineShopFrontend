import axios from "axios";

const API_URL = "http://localhost:8080/";

const getOrder = () => {
    return axios.get(API_URL + "orders");
};

const createOrder = (orderData) => {
    const url = `${API_URL}orders`;
    return axios.post(url, orderData);
};

const OrderService = {
    getOrder,
    createOrder,
}; 


export default OrderService;