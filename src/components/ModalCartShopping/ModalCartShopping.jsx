import React from "react";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import useTotalPrice from "../../hooks/useTotalPrice";
import styles from "./ModalCartShopping.module.scss";
import close from "../../assets/close.svg";
import ProductMainImage from "../../components/ProductMainImage/ProductMainImage";
import ProductPriceCartShopping from "../../components/ProductPriceCartShopping/ProductPriceCartShopping";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import cartImage from "../../assets/cart.png";

const ModalCartShopping = ({ open, onClose, token }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const total = useTotalPrice(cart, token); 
  const navigate = useNavigate();

  if (!open) return null;

  const handleOrder = () => {
    onClose();
    navigate("/order");
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeIcon}>
          <img src={close} alt="close" />
        </button>
        <h2 className={styles.modalTitle}>Ваш кошик</h2>
        {cart.length === 0 ? (
          <div className={styles.cartImage}>
            <img src={cartImage} alt="Cart" />
            <span className={styles.emptyCart}>Ваш кошик порожній</span>
          </div>
        ) : (
          <div>
            <ul className={styles.cartItems}>
              {cart.map((item) => (
                <li key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImageWrapper}>
                    <ProductMainImage product={item} />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemPrice}>
                      Ціна:
                      <ProductPriceCartShopping
                        token={token}
                        idProduct={item.id_bas}
                        className={styles.priceContainer}
                      />
                      ₴
                    </p>
                  </div>
                  <div className={styles.itemActions}>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className={styles.quantityInput}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                    <button
                      className={styles.removeButton}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className={styles.totalAmount}>
              Загальна сума: {total.toFixed(2)} ₴
            </h3>
            <div className={styles.orderBox}>
              <button className={styles.orderButton} onClick={handleOrder}>
                Замовити
              </button>
              <button className={styles.clearCartButton} onClick={clearCart}>
                Очистити кошик
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalCartShopping;
