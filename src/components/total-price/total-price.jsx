import {
    CurrencyIcon,
  } from "@ya.praktikum/react-developer-burger-ui-components";
import totalStylePrice from "./total-price.module.css";
import { totalPriceTypes } from "../../utils/prop-types";

 const TotalPrice = ({totalPrice}) => {
    return (
        <div className={`${totalStylePrice.price} pr-5`}>
          <p className="text text_type_digits-medium">
            {totalPrice}</p>
            <div>
              <CurrencyIcon type="primary" />
            </div>
        </div>
    )
}

export default TotalPrice;

TotalPrice.propTypes = {
  price: totalPriceTypes,
};