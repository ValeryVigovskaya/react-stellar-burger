import styles from "./app.module.css";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import { useState, useEffect } from "react";
import { withFetch } from "../../withFetch/withFetch";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredientDetails/ingredientDetails";

function App() {
  const [burgerIngredients, setburgerIngredients] = useState([]);

  useEffect(() => {
    getIngredientsFetch();
  }, []);

  function getIngredientsFetch() {
    withFetch()
      .then((res) => {
        setburgerIngredients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.ingredients}>
          <h1 className="text text_type_main-large">Соберите бургер</h1>
          {burgerIngredients.length && (
            <BurgerIngredients
              ingridients={burgerIngredients}
            />
          )}
        </section>
        <section className={styles.burger__constructor}>
          {burgerIngredients.length && (
            <BurgerConstructor ingridients={burgerIngredients}/>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
