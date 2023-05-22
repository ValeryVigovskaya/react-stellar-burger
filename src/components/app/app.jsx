import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useState, useEffect } from "react";
import { getDataFetch } from "../../api/api";
import { IngredientsContext } from "../../services/ingredientContext";

function App() {
  //cостояние для массива из апи
  const [burgerIngredients, setburgerIngredients] = useState([]);
  const [ error, setError ] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBurgerIngredientsFetch();
  }, []);

  function getBurgerIngredientsFetch() {
    setIsLoading(true);
    getDataFetch()
      .then((res) => {
        setburgerIngredients(res.data);
        setError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setIsLoading(false);
      });
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {error && 'Произошла ошибка'}
        {isLoading && 'Загрузка...'}
        {!isLoading &&
        !error &&
        <IngredientsContext.Provider value={burgerIngredients}>
          <section className={styles.ingredients}>
            <h1 className="text text_type_main-large">Соберите бургер</h1>
            {burgerIngredients.length && (
              <BurgerIngredients ingridients={burgerIngredients} />
            )}
          </section>
          <section className={styles.burger__constructor}>
            {burgerIngredients.length && <BurgerConstructor />}
          </section>
        </IngredientsContext.Provider>}
      </main>
    </div>
  );
}

export default App;
