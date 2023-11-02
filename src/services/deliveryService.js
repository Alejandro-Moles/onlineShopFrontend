import axios from "axios";

const API_URL = "http://localhost:8080/";

const getDeliveries = () => {
    return axios.get(API_URL + "deliveries");
};

const DeliveriesService = {
    getDeliveries,
};

export default DeliveriesService;