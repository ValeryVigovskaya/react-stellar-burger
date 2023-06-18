import ingredientDetails from "./ingredient-details.module.css";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const tabIngredient = useSelector(
    (state) => state.ingredientDetails.tabIngredient
  );

  return (
    <div className={`${ingredientDetails.container} `}>
      <figure className={`${ingredientDetails.figure} pb-4`}>
        <img src={tabIngredient.image_large} alt="картинка ингредиента" />
        <figcaption
          className={`${ingredientDetails.caption} text text_type_main-medium pt-4`}
        >
          {tabIngredient.name}
        </figcaption>
      </figure>
      <ul className={`${ingredientDetails.list} pt-4`}>
        <li className={`${ingredientDetails.item} mr-5`}>
          <p
            className={`${ingredientDetails.color_text} text text_type_main-default`}
          >
            Калории,ккал
          </p>
          <p
            className={`${ingredientDetails.color_text} text text_type_digits-default`}
          >
            {tabIngredient.calories}
          </p>
        </li>
        <li className={`${ingredientDetails.item} mr-5`}>
          <p
            className={`${ingredientDetails.color_text} text text_type_main-default`}
          >
            Белки, г
          </p>
          <p
            className={`${ingredientDetails.color_text} text text_type_digits-default`}
          >
            {tabIngredient.proteins}
          </p>
        </li>
        <li className={`${ingredientDetails.item} mr-5`}>
          <p
            className={`${ingredientDetails.color_text} text text_type_main-default`}
          >
            Жиры, г
          </p>
          <p
            className={`${ingredientDetails.color_text} text text_type_digits-default`}
          >
            {tabIngredient.fat}
          </p>
        </li>
        <li className={`${ingredientDetails.item} pb-15`}>
          <p
            className={`${ingredientDetails.color_text} text text_type_main-default`}
          >
            Углеводы, г
          </p>
          <p
            className={`${ingredientDetails.color_text} text text_type_digits-default`}
          >
            {tabIngredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
