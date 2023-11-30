import axios from "axios";

const API_URL = "http://localhost:8080/";

const getProducts = () => {
    return axios.get(API_URL + "products");
};

const getAvaliableProducts = () => {
    return axios.get(API_URL + "products/availableProducts");
};

const getProduct = (uuid) => {
    return axios.get(`${API_URL}products/${uuid}`);
}

const updateProducts = (uuid, productData) => {
    const url = `${API_URL}products/updateProduct/${uuid}`;
    return axios.put(url, productData);
}

const deleteProducts = (uuid) => {
    const url = `${API_URL}products/deleteProduct/${uuid}`;
    return axios.put(url);
}

const createProduct = (productData) => {
    const url = `${API_URL}products`;
    return axios.post(url, productData);
};

const getTopProducts = () => {
    return axios.get(API_URL + "products/topProducts");
};

const getTopAvaliableProducts = () => {
    return axios.get(API_URL + "products/availableTopProducts");
};

const updateProductStock = async (productUuid, quantity, isAddingStock) => {
    try {
        const product = await getProduct(productUuid);
        const newStock = isAddingStock ? product.data.stock + quantity : product.data.stock - quantity;
        await updateProducts(productUuid, { 
            category: product.data.category,
            platform: product.data.platform,
            title: product.data.title,
            price: product.data.price,
            weight: product.data.weight,
            stock: newStock,
            pegi: product.data.pegi,
            isDigital: product.data.isDigital,
            description: product.data.description,
            image: product.data.image,
            isDeleted: product.data.isDeleted,
        });

        return true;
    } catch (error) {
        console.error("Error updating product stock:", error);
        return false;
    }
};

const ProductService = {
    getProducts,
    getProduct,
    updateProducts,
    createProduct,
    getTopProducts,
    updateProductStock,
    getAvaliableProducts,
    getTopAvaliableProducts,
    deleteProducts
}; 


export default ProductService;