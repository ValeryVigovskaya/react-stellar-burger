import { useRef, useState, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./burgerIngredients.module.css";
import IngridientItem from "../ingridientItem/ingridientItem";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
function BurgerIngredients({ ingridients}) {
  const [current, setCurrent] = useState("one");
  const bun = "bun";
  const sauce = "sauce";
  const main = "main";
  //нашла все булки
  const buns = useMemo(
    () => ingridients.filter((m) => m.type === bun),
    [ingridients]
  );
  //нашла все соусы
  const sauces = useMemo(
    () => ingridients.filter((m) => m.type === sauce),
    [ingridients]
  );
  //нашла все начинки
  const fillings = useMemo(
    () => ingridients.filter((m) => m.type === main),
    [ingridients]
  );

  const ref = useRef();

  //константа для хранения состояния выбранного таба и подключения скролла при клике
  const tabStorage = (selectTab) => {
    setCurrent(selectTab);
    const item = document.getElementById(selectTab);
    if (item) {
      return item.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [tabIngredient, setTabIngredient] = useState(null);

  function handleOpenModal(ingridient){
    setIsOpen(true);
    setTabIngredient(ingridient);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setTabIngredient(null);
  };

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
          <h2 className="text text_type_main-medium pb-1" id="one" ref={ref}>
            Булки
          </h2>
          <ul className={`${ingredientsStyles.ingridient__list} pt-5`}>
            {buns.map((ingridients) => (
              <li key={ingridients._id}>
                <IngridientItem
                  ingridient={ingridients}
                  onClick={handleOpenModal}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-5 pb-5">
          <h2 className="text text_type_main-medium pb-1" id="two" ref={ref}>
            Соусы
          </h2>
          <ul className={`${ingredientsStyles.ingridient__list} pt-5`}>
            {sauces.map((ingridients) => (
              <li key={ingridients._id}>
                <IngridientItem ingridient={ingridients} />
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-5 pb-5">
          <h2 className="text text_type_main-medium pb-1" id="three" ref={ref}>
            Начинки
          </h2>
          <ul className={`${ingredientsStyles.ingridient__list} pt-5`}>
            {fillings.map((ingridients) => (
              <li key={ingridients._id}>
                <IngridientItem ingridient={ingridients} />
              </li>
            ))}
          </ul>
        </div>
        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          title="Детали ингредиента"
        >
          <IngredientDetails ingridient={tabIngredient} />
        </Modal>
      </div>
    </>
  );
}

BurgerIngredients.propTypes = {
  ingridients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerIngredients;
