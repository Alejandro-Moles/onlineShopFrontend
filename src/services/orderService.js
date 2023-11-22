import axios from "axios";

const API_URL = "http://localhost:8080/";

const getOrders = () => {
    return axios.get(API_URL + "orders");
};

const getOrder = (uuid) => {
    return axios.get(`${API_URL}orders/${uuid}`);
}

const getAllOrderforUser = (userUuid) => {
    return axios.get(`${API_URL}orders/user/${userUuid}`);
}

const createOrder = (orderData) => {
    const url = `${API_URL}orders`;
    return axios.post(url, orderData);
};

const updateOrder = (uuid, status) => {
    const url = `${API_URL}orders/${uuid}/${status}`;
    return axios.put(url);
}

const getRevenueStatistic = (dateSelector) => {
    const url = `${API_URL}orders/revenueStatistic`;
    return axios.post(url, dateSelector);
}

const OrderService = {
    getOrders,
    createOrder,
    getOrder,
    updateOrder,
    getAllOrderforUser,
    getRevenueStatistic
}; 


export default OrderService;