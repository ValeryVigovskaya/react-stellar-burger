import { useState, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngridientItem from "../ingridient-item/ingridient-item";
import { useAppDispatch, useAppSelector } from '../../services/index'
import {
  openModalIngredientDetails,
  returnTabIngredient,
} from "../../services/actions/ingredient-deteils-actions";

import { useInView } from "react-intersection-observer";
import { useLocation, Link } from "react-router-dom";
import Loader from "../loader/loader";
import {IIngredient} from '../../utils/types';

function BurgerIngredients() {
  const {
    burgerIngredients,
    burgerIngredientsRequest,
    burgerIngredientsFailed,
  } = useAppSelector((state) => state.rootReducer.burgerIngredients);

  // Получаем метод dispatch
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [current, setCurrent] = useState<string>("one"); //при клике на таб скролл продолжает работать

  const bun = "bun";
  const sauce = "sauce";
  const main = "main";

  function handleOpenModalIngredient(item: IIngredient) {
    dispatch(openModalIngredientDetails());
    dispatch(returnTabIngredient(item));
  }
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
  const tabStorage = (selectTab: string) => {
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
    return <Loader/>;
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
              {buns.map((ingridients: IIngredient) => (
                <Link
                  key={ingridients._id}
                  className={`${ingredientsStyles.ingridient__link} `}
                  to={`/ingredients/${ingridients._id}`}
                  state={{ background: location }}
                >
                  <IngridientItem
                    ingridient={ingridients}
                    onTab={handleOpenModalIngredient}
                  />
                </Link>
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
              {sauces.map((ingridients: IIngredient) => (
                <Link
                  key={ingridients._id}
                  to={`/ingredients/${ingridients._id}`}
                  state={{ background: location }}
                  className={`${ingredientsStyles.ingridient__link} `}
                >
                  <IngridientItem
                    ingridient={ingridients}
                    onTab={handleOpenModalIngredient}
                  />
                </Link>
              ))}
            </ul>
          </div>
          <div className="pt-5 pb-5" ref={threeRef}>
            <h2 className="text text_type_main-medium pb-1">Начинки</h2>
            <ul
              className={`${ingredientsStyles.ingridient__list} pt-5`}
              id="three"
            >
              {fillings.map((ingridients: IIngredient) => (
                <Link
                  key={ingridients._id}
                  to={`/ingredients/${ingridients._id}`}
                  state={{ background: location }}
                  className={`${ingredientsStyles.ingridient__link} `}
                >
                  <IngridientItem
                    ingridient={ingridients}
                    onTab={handleOpenModalIngredient}
                  />
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default BurgerIngredients;
