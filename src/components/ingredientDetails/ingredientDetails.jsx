import ingredientDetails from "../ingredientDetails/ingredientDetails.module.css";

const IngredientDetails = ({ tabIngredient }) => {
  return (
    <div>
      <figure>
        <img src={tabIngredient.image_large} alt="картинка ингредиента" />
        <figcaption>{tabIngredient.name}</figcaption>
      </figure>
      <ul>
        <li>
          <p>Калории,ккал</p>
          <p>{tabIngredient.calories}</p>
        </li>
        <li>
          <p>Белки, г</p>
          <p>{tabIngredient.proteins}</p>
        </li>
        <li>
          <p>Жиры, г</p>
          <p>{tabIngredient.fat}</p>
        </li>
        <li>
          <p>Углеводы, г</p>
          <p>{tabIngredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
