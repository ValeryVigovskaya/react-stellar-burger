import React, { useContext } from "react";
import {
    CurrencyIcon,
  } from "@ya.praktikum/react-developer-burger-ui-components";
import totalStylePrice from "./total-price.module.css"
import {TotalPriceContext} from "../../services/ingredientContext";

 const TotalPrice = () => {
  const { priceState } = useContext(TotalPriceContext);
    return (
        <div className={totalStylePrice.price}>
          <p className="text text_type_digits-medium">
            {priceState.price}</p>
          <CurrencyIcon type="primary" />
        </div>
    )
}

export default TotalPrice;