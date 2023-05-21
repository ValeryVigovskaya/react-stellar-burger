import orderDetails from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { orderDetailsTypes } from "../../utils/prop-types";
import { useContext } from "react";
import {
  OrderContext
} from "../../services/ingredientContext";

function OrderDetails() {
  const order = useContext(OrderContext);
  return (
    <ul className={`${orderDetails.container} m-4 pb-15`}>
      <li className={`${orderDetails.item} pb-15`}>
        <p className={`${orderDetails.number} text text_type_digits-large pb-4`}>
        {order}
        </p>
        <p className="text text_type_main-medium pt-4">идентификатор заказа</p>
      </li>
      <li className={`${orderDetails.item} pt-15 pb-15`}>
          <CheckMarkIcon type="primary"/>
          <div className={`${orderDetails.done}`}>
        </div>
      </li>
      <li className={`${orderDetails.item} pb-15 pt-15`}>
        <p className="text text_type_main-default">Ваш заказ начали готовить</p>
        <p className={`${orderDetails.text} text text_type_main-default`}>
          Дождитесь готовности на орбитальной станции
        </p>
      </li>
    </ul>
  );
}

export default OrderDetails;

OrderDetails.propTypes = {
  order: orderDetailsTypes,
};