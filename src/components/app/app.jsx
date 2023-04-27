import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.ingredients}>
          <h1 className="text text_type_main-large">Соберите бургер</h1>
          <BurgerIngredients ingredient={data} />
        </section>
        <section className={styles.burger__constructor}>
          <BurgerConstructor ingridient={data} />
        </section>
      </main>
    </div>
  );
}

export default App;
