import { useRef, useState, useMemo, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngridientItem from "../ingridient-item/ingridient-item";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useSelector, useDispatch } from "react-redux";
import {
  getData,
  MODAL_INGREDIENT_DETAILS_OPEN,
  MODAL_INGREDIENT_DETAILS_CLOSE,
  TAB_INGREDIENT,
  TAB_INGREDIENT_DELETE,
} from "../../services/actions/actions";
import { useInView } from "react-intersection-observer";

function BurgerIngredients() {
  const {
    burgerIngredients,
    burgerIngredientsRequest,
    burgerIngredientsFailed,
  } = useSelector((state) => state.burgerIngredients);
  const { isOpenIngredient } = useSelector((state) => state.ingredientDetails);
  // Получаем метод dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // Отправляем экшен-функцию
    dispatch(getData());
  }, [dispatch]);

  const [current, setCurrent] = useState("one"); //при клике на таб скролл продолжает работать

  const bun = "bun";
  const sauce = "sauce";
  const main = "main";

  function handleOpenModalIngredient(item) {
    dispatch({ type: MODAL_INGREDIENT_DETAILS_OPEN });
    dispatch({ type: TAB_INGREDIENT, tabIngredient: item });
  }

  const handleCloseModalIngredient = () => {
    dispatch({ type: MODAL_INGREDIENT_DETAILS_CLOSE });
    dispatch({ type: TAB_INGREDIENT_DELETE });
  };
  //нашла все булки
  const buns = useMemo(
    () => burgerIngredients.filter((m) => m.type === bun),
    [burgerIngredients]
  );
  //нашла все соусы
  const sauces = useMemo(
    () => burgerIngredients.filter((m) => m.type === sauce),
    [burgerIngredients]
  );
  //нашла все начинки
  const fillings = useMemo(
    () => burgerIngredients.filter((m) => m.type === main),
    [burgerIngredients]
  );

  //константа для хранения состояния выбранного таба и подключения скролла при клике
  const tabStorage = (selectTab) => {
    setCurrent(selectTab);
    const item = document.getElementById(selectTab);
    if (item) {
      return item.scrollIntoView({ behavior: "smooth" });
    }
  };
//реализация активных кнопок при скролле с помощью Intersection Observer Api
  const [oneRef, oneInView] = useInView({ threshold: 0.5 });
  const [twoRef, twoInView] = useInView({ threshold: 1 });
  const [threeRef, threeInView] = useInView({ threshold: 0.2 });

  if (burgerIngredientsFailed) {
    return <p>Произошла ошибка при получении данных</p>;
  } else if (burgerIngredientsRequest) {
    return <p>Загрузка...</p>;
  } else {
    return (
      <>
        <div style={{ display: "flex" }} className="pt-5 pb-5">
          <Tab value="one" active={oneInView === true} onClick={tabStorage}>
            Булки
          </Tab>
          <Tab value="two" active={twoInView === true} onClick={tabStorage}>
            Соусы
          </Tab>
          <Tab value="three" active={threeInView === true} onClick={tabStorage}>
            Начинки
          </Tab>
        </div>
        <div
          className={`${ingredientsStyles.ingridient__container} mt-5`}
          id="scroll-list"
        >
          <div className="pb-5">
            <h2 className="text text_type_main-medium pb-1" id="one">
              Булки
            </h2>
            <ul
              className={`${ingredientsStyles.ingridient__list} pt-5`}
              id="one"
              ref={oneRef}
            >
              {buns.map((ingridients) => (
                <li key={ingridients._id}>
                  <IngridientItem
                    ingridient={ingridients}
                    onTab={handleOpenModalIngredient}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-5 pb-5">
            <h2 className="text text_type_main-medium pb-1">Соусы</h2>
            <ul
              className={`${ingredientsStyles.ingridient__list} pt-5`}
              id="two"
              ref={twoRef}
            >
              {sauces.map((ingridients) => (
                <li key={ingridients._id}>
                  <IngridientItem
                    ingridient={ingridients}
                    onTab={handleOpenModalIngredient}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-5 pb-5" ref={threeRef}>
            <h2 className="text text_type_main-medium pb-1">Начинки</h2>
            <ul
              className={`${ingredientsStyles.ingridient__list} pt-5`}
              id="three"
            >
              {fillings.map((ingridients) => (
                <li key={ingridients._id}>
                  <IngridientItem
                    ingridient={ingridients}
                    onTab={handleOpenModalIngredient}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {isOpenIngredient && (
          <Modal
            onClose={handleCloseModalIngredient}
            title="Детали ингредиента"
          >
            <IngredientDetails />
          </Modal>
        )}
      </>
    );
  }
}
BurgerIngredients.propTypes = {
  ingridients: PropTypes.arrayOf(ingredientPropType.isRequired),
};

export default BurgerIngredients;
