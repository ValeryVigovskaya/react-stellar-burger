import { useState, useMemo, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngridientItem from "../ingridient-item/ingridient-item";
import { useSelector, useDispatch } from "react-redux";
import {
  getData,
  openModalIngredientDetails,
  closeModalIngredientDetails,
  returnTabIngredient,
  deleteTabIngredient,
} from "../../services/actions/actions";
import { useInView } from "react-intersection-observer";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

function BurgerIngredients() {
  const {
    burgerIngredients,
    burgerIngredientsRequest,
    burgerIngredientsFailed,
  } = useSelector((state) => state.rootReducer.burgerIngredients);

  // Получаем метод dispatch
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const location = useLocation();
 // const id = useParams()

  //const burgerIngredient = burgerIngredients.find((item) => item._id === id);

  useEffect(() => {
    // Отправляем экшен-функцию
    dispatch(getData());
  }, [dispatch]);

  const [current, setCurrent] = useState("one"); //при клике на таб скролл продолжает работать

  const bun = "bun";
  const sauce = "sauce";
  const main = "main";

  function handleOpenModalIngredient(item) {
    dispatch(openModalIngredientDetails());
    dispatch(returnTabIngredient(item));
    // navigate('/ingredients/:id', { replace: false });
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
              {sauces.map((ingridients) => (
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
              {fillings.map((ingridients) => (
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
