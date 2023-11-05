import axios from "axios";

const API_URL = "http://localhost:8080/";

const getDeliveries = () => {
    return axios.get(API_URL + "deliveries");
};

const updateDelivery = (uuid, deliveryData) => {
    const url = `${API_URL}deliveries/${uuid}`;
    return axios.put(url, deliveryData);
}

const createDelivery = (deliveryData) => {
    const url = `${API_URL}deliveries`;
    return axios.post(url, deliveryData);
};


const DeliveriesService = {
    getDeliveries,
    updateDelivery,
    createDelivery
};

export default DeliveriesService;