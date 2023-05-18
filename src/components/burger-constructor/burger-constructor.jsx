import {
  DragIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { useMemo, useState, useContext, useReducer } from "react";
import { burgerIngridientTypes } from "../../utils/prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import TotalPrice from "../total-price/total-price";
import {IngredientsContext, TotalPriceContext} from "../../services/ingredientContext"

const priceInitialState = { price: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "set":
      let total = 0;
      action.arr.map(item => (total += item.price));
      return {price : total}
    case "reset":
      return priceInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function BurgerConstructor() {
  const ingridients = useContext(IngredientsContext);
  //состояния отрытия модального окна для работы попапа заказа:
    const [isOpen, setIsOpen] = useState(false);
  //нашла одну булку
  const bun = useMemo(
    () => ingridients.find((m) => m.type === "bun"),
    [ingridients]
  );
  const [priceState, priceDispatcher] = useReducer(
    reducer,
    priceInitialState,
    undefined
  );

    const handleOpenModal = () => {
      setIsOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsOpen(false);
    };

  return (
    <div>
      <TotalPriceContext.Provider value={{ priceState, priceDispatcher }}>
      <div className={`${burgerStyles.ingridient} pl-4 pb-5`}>
        <ConstructorElement
          type="top"
          isLocked="true"
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
          isLocked="true"
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          ingridient={bun}
        />
      </div>
      <div className={`${burgerStyles.order} pt-5 pr-4`}>
        <TotalPrice/>
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
      </TotalPriceContext.Provider>
      {isOpen &&
       (<Modal  onClose={handleCloseModal}>
        <OrderDetails />
      </Modal>)
      }
    </div>
  );
}

BurgerConstructor.propTypes = {
  ingridients: PropTypes.arrayOf(burgerIngridientTypes.isRequired)
};

export default BurgerConstructor;
