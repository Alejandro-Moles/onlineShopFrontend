import axios from "axios";

const API_URL = "http://localhost:8080/";

const getPayment = () => {
    return axios.get(API_URL + "payments");
};

const PaymentService = {
    getPayment,
};

export default PaymentService;