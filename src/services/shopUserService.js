import axios from "axios";

const API_URL = "http://localhost:8080/";

const getShopUsers = () => {
    return axios.get(API_URL + "shopUsers");
};

const updateShopUser = (uuid, shopUserData) => {
    const url = `${API_URL}shopUsers/${uuid}`;
    return axios.put(url, shopUserData);
}

const getActualShopUser = (token) => {
    try{
        return axios.get(`${API_URL}shopUsers/actual`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }catch (err){
        console.log(err);
        return null;
    }
    
};

const getShopUser = (uuid) => {
    return axios.get(`${API_URL}shopUsers/profile/${uuid}`);
}

const updatePassword = (uuid, passwordData) => {
    const url = `${API_URL}shopUsers/${uuid}`;
    return axios.put(url, passwordData);
}

const getShopUserStatistic = (uuid) => {
    return axios.get(`${API_URL}shopUsers/statistic/${uuid}`);
}

const updateShopUserRoles = (uuid, listRoles) => {
    const url = `${API_URL}shopUsers/assignRoles/${uuid}`;
    return axios.put(url, listRoles);
}

const updateData = (uuid, shopUserData) => {
    console.log(uuid)
    console.log(shopUserData)
    const url = `${API_URL}shopUsers/profileData/${uuid}`;
    return axios.put(url, shopUserData);
}

const ShopUserService = {
    getShopUsers,
    updateShopUser,
    getShopUser,
    getActualShopUser,
    updatePassword,
    getShopUserStatistic,
    updateShopUserRoles,
    updateData
};


export default ShopUserService;