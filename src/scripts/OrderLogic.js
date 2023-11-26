import OrderService from "../services/orderService";
import OrderProductService from "../services/orderProductService";

const getOrderAndPaymentStatus = (selectedPayment) => {
    let paymentStatus;
    let orderStatus;
  
    if (selectedPayment == "Cash") {
      paymentStatus = false
      orderStatus = "PENDING_PAYMENT";
    } else {
      paymentStatus = true
      orderStatus = "PENDING_SHIPMENT";
    }
  
    return { paymentStatus, orderStatus };
};

const placeOrder = async (address, user, selectedDelivery, selectedPayment, cartItems) => {
    try {
        const { paymentStatus, orderStatus } = getOrderAndPaymentStatus(selectedPayment);

        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

        const orderResult = await OrderService.createOrder({
            payment: selectedPayment,
            status: orderStatus,
            delivery: selectedDelivery,
            apartament: address.apartament,
            home: address.home,
            street: address.street,
            mail: user.mail,
            payStatus: paymentStatus,
            isDeleted: false,
            orderDate: formattedDate
        });
        
        const orderUuid = orderResult.data.uuid;
        processOrderItems(cartItems, orderUuid);
        return { success: true, message: 'Order placed successfully' };
    } catch (error) {
      console.error('Error placing order:', error);
      return { success: false, message: 'Error placing order' };
    }
};

const processOrderItems = async (cartItems, orderUuid) => {
    for (const item of cartItems) {
        const orderProductData = {
            orderUUID: orderUuid,
            productTitle: item.title,
            quantity: item.quantity,
            isDeleted: false
        };
        await OrderProductService.createOrderProduct(orderProductData);
      }
};


export default { placeOrder };