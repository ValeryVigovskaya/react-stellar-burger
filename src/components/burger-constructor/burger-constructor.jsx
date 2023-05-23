import {
  DragIcon,
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { useMemo, useState, useContext, useReducer, useEffect } from "react";
import {
  burgerIngridientTypes,
  orderDetailsTypes,
} from "../../utils/prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import TotalPrice from "../total-price/total-price";
import {
  IngredientsContext,
  OrderContext,
} from "../../services/ingredientContext";
import { postOrder } from "../../api/api";

//const ingredientsInitialState = { array: [] };

//function reducer(state, action) {
  //switch (action.type) {
    //case "set":
    //  return { array: action.payload };
    //case "reset":
    //  return ingredientsInitialState;
    //default:
    //  throw new Error(`Wrong type of action: ${action.type}`);
 // }
//}

function BurgerConstructor() {
  const ingridients = useContext(IngredientsContext);
  //состояние для номера заказа
  const [order, setOrder] = useState(" ");
  //состояния отрытия модального окна для работы попапа заказа:
  const [isOpen, setIsOpen] = useState(false);
  //нашла одну булку
  const bun = useMemo(
    () => ingridients.find((m) => m.type === "bun"),
    [ingridients]
  );
  //нашла только соусы и начинки
  const saucesAndMains = useMemo(
    () => ingridients.filter((m) => m.type !== "bun"),
    [ingridients]
  );

  const [ error, setError ] = useState(false);
  //const [price, setPrice] = useState(0);

  //const [ingredientsState, ingredientsPriceDispatcher] = useReducer(
    //reducer,
   // ingredientsInitialState,
   // undefined
  //);

  //нашла id ингредиентов в конструкторе
  const orderIngridients = useMemo(
    () => ingridients.map((m) => m._id),
    [ingridients]
  );
  //console.log(orderIngridients)

  const handleOpenModal = () => {
    setIsOpen(true);
    postOrderIngredientsFetch();
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  function postOrderIngredientsFetch() {
    postOrder(orderIngridients)
      .then((res) => {
        setOrder(res.order.number.toString());
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }

  //функция расчета стоимости
  const totalPrice = useMemo(() => {
    const priceIngredients = saucesAndMains.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    return priceIngredients + bun.price * 2;
  }, [bun, saucesAndMains]);

  //сохранила диспатчер и указала массив, который используется
 // useEffect(() => {
  //  ingredientsPriceDispatcher({ type: "set", array: ingridients });
 // }, [ingridients]);

  return (
    <div>
      {error && 'Произошла ошибка'}
        {!error&&
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
        </div>}
        <div className={`${burgerStyles.order} pt-5 pr-4`}>
          <TotalPrice totalPrice={totalPrice} />
          <div className="pl-5">
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={handleOpenModal}
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      <OrderContext.Provider value={order}>
        {isOpen && (
          <Modal onClose={handleCloseModal}>
            <OrderDetails />
          </Modal>
        )}
      </OrderContext.Provider>
    </div>
  );
}

BurgerConstructor.propTypes = {
  ingridients: PropTypes.arrayOf(burgerIngridientTypes.isRequired),
  order: orderDetailsTypes,
};

export default BurgerConstructor;
