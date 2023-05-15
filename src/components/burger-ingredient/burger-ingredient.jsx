import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredient from "./burger-ingredient.module.css";
import { burgerIngridientTypes } from "../../utils/prop-types";

const BurgerIngredient = ({ ingridient }) => {
  return (
    <div className={`${burgerIngredient.ingridient__container} pl-2`}>
      <ConstructorElement
        text={ingridient.name}
        price={ingridient.price}
        thumbnail={ingridient.image_mobile}
      />
    </div>
  );
};

BurgerIngredient.propTypes = {
  ingridient: burgerIngridientTypes.isRequired,
};

export default BurgerIngredient;
