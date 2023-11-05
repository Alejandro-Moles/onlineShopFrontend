import axios from "axios";

const API_URL = "http://localhost:8080/";

const getPayment = () => {
    return axios.get(API_URL + "payments");
};

const updatePayment = (uuid, paymentData) => {
    const url = `${API_URL}payments/${uuid}`;
    return axios.put(url, paymentData);
}

const createPayment = (paymentData) => {
    const url = `${API_URL}payments`;
    return axios.post(url, paymentData);
};

const PaymentService = {
    getPayment,
    updatePayment,
    createPayment 
};

export default PaymentService;