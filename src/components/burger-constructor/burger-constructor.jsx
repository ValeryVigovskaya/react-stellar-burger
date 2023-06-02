import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {
  useMemo,
  useCallback
} from "react";
import {
  burgerIngridientTypes,
  orderDetailsTypes,
} from "../../utils/prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import TotalPrice from "../total-price/total-price";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_INGREDIENTS_CONSTRUCTOR,
  ADD_INGREDIENTS_BUN,
  MODAL_ORDER_DETAILS_OPEN,
  MODAL_ORDER_DETAILS_CLOSE,
  postOrderFetch,
  MOVE_INGREDIENT_ITEM,
} from "../../services/actions/actions";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';

function BurgerConstructor() {
  // Получаем метод dispatch
  const dispatch = useDispatch();
  //состояния булок, ингредиентов и модального окна из редьюсера
  const { bun, ingredients} = useSelector(
    (state) => state.ingredientsConstructor
  );
  const {isOpenOrder} = useSelector(
    (state) => state.orderDetails
  );
   //нашла только соусы и начинки
   const saucesAndMains = useMemo(
    () => ingredients.filter((m) => m.type !== "bun"),
      [ingredients]
    );

  //нашла id ингредиентов в конструкторе
  const orderIngridients = useMemo(
    () => ingredients.map((m) => m._id),
    [ingredients]
  );

  //функция обработки экшеном в падении
 function onDropHandler (item) {
      if (item.type === 'bun') {
     return dispatch({
        type: ADD_INGREDIENTS_BUN,
        bun: item, 
  }) 
} else if (item.type !== 'bun'){
   return dispatch({
        type: ADD_INGREDIENTS_CONSTRUCTOR,
        ingredients: item, key: uuidv4(), // тк по id ключу добавление проходило с ошибкой в консоль                                 //использую библиотеку для обозначения уникальных ключей
      });
  }
  }
//хук обработки падения
  const [{isActive}, drop] = useDrop({
    accept: "ingredient",
    drop(itemId) {
      onDropHandler(itemId);
    },
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  }); 
  const handleOpenModal = () => {
    dispatch(
      {type: MODAL_ORDER_DETAILS_OPEN}
    )
      //тк булки отдельно создала новый массив на основе старых
        const allIngredients = [...orderIngridients, bun._id];
    dispatch(
      postOrderFetch(allIngredients)
    )
  };

  const handleCloseModal = () => {
    dispatch(
      {type: MODAL_ORDER_DETAILS_CLOSE}
    )
  };

  //функция расчета стоимости
  const totalPrice = useMemo(() => {
    const priceIngredients = saucesAndMains.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    const bunPrice = () => {
      if (bun){
        return 2 * bun.price
      } else {
        return 0
      } //тк булка изначально нулевая, price не находился, создала функцию
    }
    return priceIngredients + bunPrice()
  }, [saucesAndMains, bun]);

  //функция обновления состояния при сортировке
  const moveItemIngredient = useCallback((dragIndex, hoverIndex) => {
    dispatch ({
      type: MOVE_INGREDIENT_ITEM,
      dragIndex: dragIndex,
			hoverIndex: hoverIndex
    })
  },[dispatch])

  return (
    <div>
      <div className={`${burgerStyles.ingridient} pl-4 pb-5`} ref={drop}>
      {isActive && 'булочку закинь повыше, соусы и начинки - посередине' }
        {bun && (
          <ConstructorElement
            type="top"
            isLocked="true"
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            ingridient={bun}
          />
        )}
        <ul className={`${burgerStyles.ingridient__list} pt-5`}>
          {ingredients.map((item, key) => (
            <li
              key={key}
              className={`${burgerStyles.ingridient__item} pb-4`}>
              <BurgerIngredient ingridient={item} moveItemIngredient={moveItemIngredient}/>
            </li>
          ))}
        </ul>
        {bun && 
          (<ConstructorElement
            type="bottom"
            isLocked="true"
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
            ingridient={bun}
          />)}
        
      </div>
      <div className={`${burgerStyles.order} pt-5 pr-4`}>
        <TotalPrice totalPrice={totalPrice}/>
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
        {isOpenOrder && (
          <Modal onClose={handleCloseModal}>
            <OrderDetails/>
          </Modal>
        )}
    </div>
  );
}

BurgerConstructor.propTypes = {
  ingridients: PropTypes.arrayOf(burgerIngridientTypes.isRequired),
  order: orderDetailsTypes,
};

export default BurgerConstructor;
