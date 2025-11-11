import { instance } from "../api";

const useSubmitOrder = () => {
  const submitOrder = async (orderData) => {
    try {
      const response = await instance.post("/orders", orderData);
      return response;
    } catch (error) {
      console.error("Помилка при відправці замовлення:", error);
      throw error; 
    }
  };

  return { submitOrder };
};

export default useSubmitOrder;
