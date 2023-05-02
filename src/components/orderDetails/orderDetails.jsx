import orderDetails from "../orderDetails/orderDetails.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function OrderDetails() {
  return (
    <ul className={`${orderDetails.container} m-4 pb-15`}>
      <li className={`${orderDetails.item} pb-15`}>
        <p className={`${orderDetails.number} text text_type_digits-large pb-4`}>
          034536
        </p>
        <p className="text text_type_main-medium pt-4">идентификатор заказа</p>
      </li>
      <li className={`${orderDetails.item} pb-15`}>
        <CheckMarkIcon type="primary"/>
      </li>
      <li className={`${orderDetails.item} pb-15`}>
        <p className="text text_type_main-default">Ваш заказ начали готовить</p>
        <p className={`${orderDetails.text} text text_type_main-default`}>
          Дождитесь готовности на орбитальной станции
        </p>
      </li>
    </ul>
  );
}

export default OrderDetails;
