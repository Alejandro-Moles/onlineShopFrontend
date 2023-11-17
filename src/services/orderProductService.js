import axios from "axios";

const API_URL = "http://localhost:8080/";

const createOrderProduct = (orderProductData) => {
    const url = `${API_URL}ordersProducts`;
    console.log(orderProductData);
    return axios.post(url, orderProductData);
};

const OrderProductService = {
    createOrderProduct,
}; 


export default OrderProductService;