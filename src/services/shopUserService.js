import axios from "axios";

const API_URL = "http://localhost:8080/";

const getShopUser = () => {
    return axios.get(API_URL + "shopUsers");
};

const updateShopUser = (uuid, shopUserData) => {
    const url = `${API_URL}shopUsers/${uuid}`;
    return axios.put(url, shopUserData);
}

const ShopUserService = {
    getShopUser,
    updateShopUser
};


export default ShopUserService;