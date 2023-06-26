import styles from "../components/app/app.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function HomePage() {
    return (
      <div className={styles.app}>
          <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <section className={styles.ingredients}>
              <h1 className="text text_type_main-large">Соберите бургер</h1>
              <BurgerIngredients />
            </section>
            <section className={styles.burger__constructor}>
              <BurgerConstructor />
            </section>
          </DndProvider>
        </main>
      </div>
    );
  }
  
  export default HomePage;