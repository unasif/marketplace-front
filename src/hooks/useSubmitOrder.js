import { instance } from "../api";

const useSubmitOrder = () => {
  const submitOrder = async (orderData, token) => {
    try {
      const response = await instance.post("/orders", orderData, {
        headers: {
          Authorization: token, 
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.error("Помилка при відправці замовлення:", error);
      throw error; 
    }
  };

  return { submitOrder };
};

export default useSubmitOrder;
