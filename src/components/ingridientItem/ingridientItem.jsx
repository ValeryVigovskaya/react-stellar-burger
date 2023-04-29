import {
    CurrencyIcon,
    Counter,
  } from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropType} from "../../utils/prop-types.js";
import ingridientItem from "./ingridientItem.module.css"

const IngridientItem = ({ ingridient }) => {
    return (
      <div className={ingridientItem.ingridient__item}>
        <Counter className={ingridientItem.counter} />
        <img src={ingridient.image} alt="фото." />
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