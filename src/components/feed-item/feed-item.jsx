import feedItem from "./feed-item.module.css";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import TotalPrice from "../../components/total-price/total-price";
import { useMemo } from "react";

function FeedItem({ order, onClick }) {
  //вытащила массив ингредиентов бургера
  const { burgerIngredients } = useSelector(
    (state) => state.rootReducer.burgerIngredients
  );
  //нашла ингредиент по id
  function findIngredient(ingredient) {
    return burgerIngredients.find((item) => item._id === ingredient);
  }
 
  //массив ингредиетов в заказе по id
  const burgerIngredientsImg = order.ingredients.map((item) =>
    findIngredient(item)
  ); 
//фильтр соусов и начинок
  const saucesAndMains = useMemo(
    () => burgerIngredientsImg.filter((m) => m.type !== "bun"),
    [burgerIngredientsImg]
  );
  
//фильтр булок
  const bun = useMemo(
    () => burgerIngredientsImg.filter((m) => m.type === "bun"),
    [burgerIngredientsImg]
  );

  //функция расчета стоимости
  const totalPrice = useMemo(() => {
    const priceIngredients = saucesAndMains.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    return priceIngredients + bun.reduce((acc, item) => {
      return acc + item.price * 2;
    }, 0);
  }, [saucesAndMains, bun]);


  const dateFromServer = order.createdAt;
  return (
    <div className={`${feedItem.container}`} onClick={() => onClick(order)}>
      <div className={`${feedItem.string}`}>
        <p className={`${feedItem.order_number} text text_type_digits-default`}>
          #{order.number}
        </p>
        <FormattedDate
          date={new Date(dateFromServer)}
          className="text text_type_main-default text_color_inactive"
        />
      </div>
      <h3 className={`${feedItem.list_title} text text_type_main-medium`}>
        {order.name}
      </h3>
      <ul className={`${feedItem.list_ingredients}`}>
        { burgerIngredientsImg.map((ingredient, i) => (
          <li className={`${feedItem.list_item}`} key={i}>
            <img
              src={ingredient.image_mobile}
              alt=""
              className={`${feedItem.img}`}
            />
          </li>
        ))}
        {burgerIngredientsImg.length >= 6 ? (
          <p className={`${feedItem.number} text text_type_digits-default`}>
            +{burgerIngredientsImg.length - 6}
          </p>
        ) : null}
      </ul>
      <div className={`${feedItem.container_with_price}`}>
        <TotalPrice totalPrice={totalPrice} />
      </div>
    </div>
  );
}

export default FeedItem;
