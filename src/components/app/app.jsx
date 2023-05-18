import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useState, useEffect } from "react";
import { getDataFetch } from "../../api/api";
import {IngredientsContext, TotalPriceContext} from "../../services/ingredientContext"


function App() {
  //cостояние для массива из апи
  const [burgerIngredients, setburgerIngredients] = useState([]);

  useEffect(() => {
    getBurgerIngredientsFetch();
  }, []);

  function getBurgerIngredientsFetch() {
    getDataFetch()
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
          <IngredientsContext.Provider value={burgerIngredients}>
          {burgerIngredients.length && (
            <BurgerConstructor/>
          )}
          </IngredientsContext.Provider>
        </section>
        
      </main>
    </div>
  );
}

export default App;
