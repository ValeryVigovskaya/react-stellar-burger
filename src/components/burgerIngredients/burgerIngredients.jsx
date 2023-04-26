import { useRef, useState } from "react";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./burgerIngredients.module.css";
import { data } from "../../utils/data";

const IngridientItem = ({ ingridient }) => {
  return (
    <div className={ingredientsStyles.ingridient__item}>
      <Counter className={ingredientsStyles.counter}/>
      <img src={ingridient.image} alt="фото." />
      <div className={`${ingredientsStyles.ingridient__price} pt-1 pb-1`}>
        <p className="text text_type_digits-default pr-2">{ingridient.price}</p>
        <CurrencyIcon />
      </div>
      <p
        className={`${ingredientsStyles.text__align} text text_type_main-default`}
      >
        {ingridient.name}
      </p>
    </div>
  );
};

function BurgerIngredients() {
  const [current, setCurrent] = useState("one");
  //нашла все булки
  const buns = data.filter((m) => m.type === "bun");
  //нашла все соусы
  const sauces = data.filter((m) => m.type === "sauce");
  //нашла все начинки
  const fillings = data.filter((m) => m.type === "main");

  const ref = useRef();
   
   //константа для хранения состояния выбранного таба и подключения скролла при клике
  const tabStorage = (selectTab) => {
		setCurrent(selectTab);
    const item = document.getElementById(selectTab)
    if (item) {
      return item.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <div style={{ display: "flex" }} className="pt-5 pb-5">
        <Tab value="one" active={current === "one"} onClick={tabStorage}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={tabStorage}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={tabStorage}>
          Начинки
        </Tab>
      </div>
      <div className={`${ingredientsStyles.ingridient__container} mt-5`}>
        <div className="pb-5">
          <h2 className="text text_type_main-medium pb-1" id='one'ref={ref}>
            Булки
          </h2>
          <ul className={`${ingredientsStyles.ingridient__list} pt-5`}>
            {buns.map((ingridient) => (
              <li key={ingridient._id}>
                <IngridientItem ingridient={ingridient} />
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-5 pb-5">
          <h2 className="text text_type_main-medium pb-1" id='two' ref={ref}>
            Соусы
          </h2>
          <ul className={`${ingredientsStyles.ingridient__list} pt-5`}>
            {sauces.map((ingridient) => (
              <li key={ingridient._id}>
                <IngridientItem ingridient={ingridient} />
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-5 pb-5">
          <h2 className="text text_type_main-medium pb-1" id='three' ref={ref}>
            Начинки
          </h2>
          <ul className={`${ingredientsStyles.ingridient__list} pt-5`}>
            {fillings.map((ingridient) => (
              <li key={ingridient._id}>
                <IngridientItem ingridient={ingridient} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default BurgerIngredients;
