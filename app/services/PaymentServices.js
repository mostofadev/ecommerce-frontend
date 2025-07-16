// app/services/PaymentServices.js
import userAxios from "../lib/axiosUser";
export const initiatePayment = async ({ order_number, payment_method }) => {
  try {
    const response = await userAxios.post(`/initiate-payment`,
      {
        order_number,
        payment_method,
      }
    );
    // if (response.data.status === 'success' && response.data.redirect_url) {
    
    //     window.location.href = response.data.redirect_url;
    // }
    console.log(response.data.redirect_url);
    
    return response.data;
  } catch (error) {
    console.error('Payment initiation failed:', error);
    return {
      status: 'error',
      message: 'Something went wrong while initiating payment.',
    };
  }
};


export  const CodRedirect = async(orderNumber)=> {
const response = await userAxios.post(`/cod/success`,{
  tran_id:orderNumber
})
return response.data
}