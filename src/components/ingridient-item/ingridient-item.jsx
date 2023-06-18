import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types.js";
import ingridientItem from "./ingridient-item.module.css";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useMemo } from "react";

const IngridientItem = ({ ingridient, onTab }) => {
  const { bun, ingredients } = useSelector((state) => state.ingredientsConstructor);

  // драгом обрабатывается забор ингредиента
  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: ingridient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.5 : 1;

  //нашла длину массива ингредиентов
  const counter = useMemo(() => {
    const ingredientsId = ingredients.filter((item) => item._id === ingridient._id)
    return ingredientsId.length;
  }, [ingredients, ingridient._id]);

  //тк булка изначально нулевая, создала отдельное условие
  const counterForBun = useMemo(() => {
    if (bun === null) {
      return 0;
    } else if (bun !== null && ingridient._id === bun._id) {
      return 2;
    }
  }, [bun, ingridient._id]);

  return (
    <div
      className={ingridientItem.ingridient__item}
      onClick={() => onTab(ingridient)}
      ref={drag}
      style={{ opacity }}
    >
      {ingridient.type !== "bun" ? (
        <Counter count={counter} className={ingridientItem.counter} />
      ) : (
        <Counter count={counterForBun} className={ingridientItem.counter} />
      )}
      <img src={ingridient.image} alt="фото." id={ingridient._id} />
      <div className={`${ingridientItem.ingridient__price} pt-1 pb-1`}>
        <p className="text text_type_digits-default pr-2">{ingridient.price}</p>
        <CurrencyIcon />
      </div>
      <p
        className={`${ingridientItem.text__align} text text_type_main-default`}
      >
        {ingridient.name}
      </p>
    </div>
  );
};

IngridientItem.propTypes = {
  ingridient: ingredientPropType.isRequired,
};

export default IngridientItem;
