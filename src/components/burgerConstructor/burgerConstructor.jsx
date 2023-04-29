import {
  DragIcon,
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyles from "./burgerConstructor.module.css";
import PropTypes from "prop-types";
import BurgerIngredient from "../burgerIngredient/burgerIngredient";
import { useMemo } from "react";
import {burgerIngridientTypes} from "../../utils/prop-types"


function BurgerConstructor({ ingridients }) {
  //нашла одну булку
  const bun = useMemo(
    () => ingridients.find((m) => m.type === "bun"), [ingridients]);
  return (
    <div>
      <div className={`${burgerStyles.ingridient} pl-4 pb-5`}>
        <ConstructorElement
          type="top"
          isLocked='true'
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          ingridient={bun}
        />
        <ul className={`${burgerStyles.ingridient__list} pt-5`}>
          {ingridients.map(
            (
              item //нашла все, кроме булки
            ) =>
              item.type !== "bun" && (
                <li
                  key={item._id}
                  className={`${burgerStyles.ingridient__item} pb-4`}
                >
                  <DragIcon type="primary" />
                  <BurgerIngredient ingridient={item} />
                </li>
              )
          )}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked='true'
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          ingridient={bun}
        />
      </div>
      <div className={`${burgerStyles.order} pt-5 pr-4`}>
        <div className={burgerStyles.price}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  ingridients: PropTypes.arrayOf(burgerIngridientTypes.isRequired).isRequired,
};

export default BurgerConstructor;
