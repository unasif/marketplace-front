import React, { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import ProductMainImage from "../../components/ProductMainImage/ProductMainImage";
import ProductPriceCartShopping from "../../components/ProductPriceCartShopping/ProductPriceCartShopping";
import useTotalPrice from "../../hooks/useTotalPrice";
import useSubmitOrder from "../../hooks/useSubmitOrder";
import { useNavigate } from "react-router-dom";
import styles from "./OrderPage.module.scss";

const OrderPage = ({ token }) => {
  const { cart, clearCart } = useCart();
  const total = useTotalPrice(cart, token);
  const { submitOrder } = useSubmitOrder(); 

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.phone) {
      alert("Будь ласка, заповніть всі обов'язкові поля.");
      return;
    }

    // Підготовка даних для відправки
    const orderData = {
      client_first_name: formData.firstName,
      client_second_name: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      total_price: total.toFixed(2),
      active: true,
      date_created: new Date().toISOString(), // Поточна дата у форматі ISO
      products: cart.map((item) => ({
        id_bas: item.id_bas,
        name: item.name,
        quantity: item.quantity,
      })),
    };

    try {
        const response = await submitOrder(orderData, token);
        if (response.status === 201) {
          clearCart(); 
          navigate("/order-success"); 
        } else {
          navigate("/order-failure", {
            state: {
              message: "Сталася помилка при оформленні замовлення.",
            },
          });
        }
      } catch (error) {
        navigate("/order-failure", {
          state: {
            message: "Не вдалося оформити замовлення. Спробуйте ще раз.",
          },
        });
      }
    };

  return (
    <div className={styles.pageOrder}>
      <div className={styles.order}>
        <div className={styles.orderTitle}>
          <h2>Оформлення замовлення</h2>
        </div>
        <form className={styles.orderForm} onSubmit={handleSubmit}>
          <div className={styles.formInfo}>
            <h3 className={styles.infoTitle}>Інформація про покупця</h3>
            <div className={styles.infoContainer}>
              <div className={styles.infoName}>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Прізвище"
                />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Ім'я"
                />
              </div>
              <div className={styles.infoContacts}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Контактний телефон"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                />
              </div>
            </div>
          </div>

          <div className={styles.cart}>
            <h3>Ваше замовлення:</h3>
            <ul className={styles.orderItems}>
              {cart.map((item) => (
                <li key={item.id} className={styles.orderItem}>
                  <div className={styles.itemImageWrapper}>
                    <ProductMainImage product={item} />
                  </div>
                  <div className={styles.itemDetails}>
                    <h4>{item.name}</h4>
                    <p>Кількість: {item.quantity}</p>
                    <p>
                      Ціна:{" "}
                      <ProductPriceCartShopping
                        token={token}
                        idProduct={item.id_bas}
                        className={styles.priceContainer}
                      />{" "}
                      ₴
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <h4 className={styles.totalAmount}>
              Загальна сума: {total.toFixed(2)} ₴
            </h4>
          </div>

          <button type="submit" className={styles.submitButton}>
            Підтвердити замовлення
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
