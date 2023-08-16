import {
    CurrencyIcon,
  } from "@ya.praktikum/react-developer-burger-ui-components";
import totalStylePrice from "./total-price.module.css";
import { FC } from "react";

interface IPriceProps {
  totalPrice: number;
}

export const TotalPrice: FC<IPriceProps> = ({totalPrice}) => {
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