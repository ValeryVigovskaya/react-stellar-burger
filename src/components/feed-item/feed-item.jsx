import feedItem from "./feed-item.module.css";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import TotalPrice from "../../components/total-price/total-price";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid"; //тк вылезала ошибка, сделала уникальные ключи
import { useMatch } from "react-router-dom";
import PropTypes from "prop-types";

function FeedItem({ order, onClick }) {
  //вытащила массив ингредиентов бургера
  const { burgerIngredients } = useSelector(
    (state) => state.rootReducer.burgerIngredients
  );
  //нашла ингредиент по id
  function findIngredient(ingredient) {
    return burgerIngredients.find((item) => item._id === ingredient);
  }
  const profileOrdersLink = useMatch("/profile/orders");
  //массив ингредиетов в заказе по id
  const burgerIngredientsImg = order?.ingredients.map((item) =>
    findIngredient(item)
  );

  //функция расчета стоимости
  const totalPrice = useMemo(() => {
    return burgerIngredientsImg?.reduce((acc, item) => {
      return (
        acc +
        (item?.type !== "bun" ? item?.price : 0) +
        (item?.type === "bun" ? 2 * item?.price : 0)
      );
    }, 0);
  }, [burgerIngredientsImg]);

  const statusColor = () => {
    if (order.status === "done") {
      return `${feedItem.order_number} text text_type_digits-default ${feedItem.color_green}`
    } else if (order.status === "created") {
      return `${feedItem.order_number} text text_type_digits-default ${feedItem.color_purple}`
    }
    else if (order.status === "pending") {
      return `${feedItem.order_number} text text_type_digits-default ${feedItem.color_white}`
    }
  }

  const dateFromServer = order.updatedAt;
  return (
    <div className={`${feedItem.container}`} onClick={() => onClick()}>
      <div className={`${feedItem.string}`}>
        <p className={`${feedItem.order_number} text text_type_digits-default`}>
          #{order.number}
        </p>
        <FormattedDate
          date={new Date(dateFromServer)}
          className="text text_type_main-default text_color_inactive"
        />
      </div>
      {profileOrdersLink ? (
        <p
          className={statusColor()}
        >
          {order.status}
        </p>
      ) : null}
      <h3 className={`${feedItem.list_title} text text_type_main-medium`}>
        {order.name}
      </h3>
      <ul className={`${feedItem.list_ingredients}`}>
        {order.ingredients.map((ingredient) => (
          <li className={`${feedItem.list_item}`} key={uuidv4()}>
            <img
              src={findIngredient(ingredient)?.image_mobile}
              alt=""
              className={`${feedItem.img}`}
            />
          </li>
        ))}
        {order.ingredients.length > 6 ? (
          <p className={`${feedItem.number} text text_type_digits-default`}>
            +{order.ingredients.length - 6}
          </p>
        ) : null}
      </ul>
      <div className={`${feedItem.container_with_price}`}>
        <TotalPrice totalPrice={totalPrice ? totalPrice : 0} />
      </div>
    </div>
  );
}

export default FeedItem;
