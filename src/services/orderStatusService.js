import axios from "axios";

const API_URL = "http://localhost:8080/";

const getStatus = () => {
    return axios.get(API_URL + "status");
};


const OrderStatusService = {
    getStatus,
}; 


export default OrderStatusService;