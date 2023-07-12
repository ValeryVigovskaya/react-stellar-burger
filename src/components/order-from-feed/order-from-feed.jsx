import orderDetails from "./order-from-feed.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useMatch, useParams } from "react-router-dom";
import { returnTabOrder } from "../../services/actions/actions";
import { useEffect } from "react";
import { ordersId, profileOrderId } from "../../utils/constants";

function OrderFromFeed() {
  const tabOrder = useSelector(
    (state) => state.rootReducer.orderModal.tabOrder
  );
  const { burgerIngredients } = useSelector(
    (state) => state.rootReducer.burgerIngredients
  );
  const orders = useSelector((state) => state.rootReducer.getOrders.orders);
  //нашла один заказ

  const dispatch = useDispatch();
   
  const { id } = useParams();

  //если заказ не кликнутый нашла его по номеру
  //тк id определяется как строка, преобразую в число
  const orderSelect = () => {
    if (!tabOrder) {
      const item = orders.find((item) => item.number === Number(id));
      dispatch(returnTabOrder(item));
    }
  };
  //нашла ингредиент по id
  function findIngredient(ingredient) {
    return burgerIngredients.find((item) => item._id === ingredient);
  }

  //массив ингредиетов в заказе по id
  const burgerIngredientsImg = tabOrder? tabOrder.ingredients.map((item) =>
    findIngredient(item)
  ) : null;

  useEffect(() => {
    orderSelect();
  });



  const dateFromServer = tabOrder? tabOrder.updatedAt : null
  return (
    !!tabOrder && <div className={`${orderDetails.list_container} mt-15 p-15`}>
      <ul className={`${orderDetails.list_order} pb-5`}>
        <li
          className={`${orderDetails.order_number} text text_type_digits-default pb-5`}
        >
          #{tabOrder.number}
        </li>
        <li
          className={`${orderDetails.order} text text_type_main-medium pt-5 pb-3`}
        >
          {tabOrder ? tabOrder.name : null}
        </li>
        <li className="text text_type_main-small pb-5 mb-5">
          {tabOrder ? tabOrder.status : null}
        </li>
        <li className="text text_type_main-medium pt-5">
          Состав:
          <ul className={`${orderDetails.list_ingredients} pt-3`}>
            {tabOrder ? (burgerIngredientsImg.map((ingredient, i) => (
              <li className={`${orderDetails.item}`} key={i}>
                <div className={`${orderDetails.item_img}`}>
                  <img
                    src={ingredient.image_mobile}
                    alt=""
                    className={`${orderDetails.image}`}
                  />
                </div>

                <p className={`text text_type_main-small`}>{ingredient.name}</p>
                <div className={`${orderDetails.price}`}>
                  <p
                    className={`${orderDetails.price_number} text text_type_digits-default`}
                  >
                    2 x {ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            ))) : null}
          </ul>
        </li>
      </ul>
      <div className={`${orderDetails.list_time_price} pt-5`}>
        <FormattedDate
          date={new Date(dateFromServer)}
          className="text text_type_main-default text_color_inactive"
        />
        <div className={`${orderDetails.price}`}>
          <p className="text text_type_digits-default">510</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
      );
}

export default OrderFromFeed;
