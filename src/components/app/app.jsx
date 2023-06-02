import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useState, useContext, useReducer, useEffect } from "react";
import { getData, MODAL_INGREDIENT_DETAILS_OPEN,
  MODAL_INGREDIENT_DETAILS_CLOSE, TAB_INGREDIENT, TAB_INGREDIENT_DELETE} from '../../services/actions/actions';
  import { useDrag } from 'react-dnd';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
          <section className={styles.ingredients}>
            <h1 className="text text_type_main-large">Соберите бургер</h1>
              <BurgerIngredients/>
          </section>
          <section className={styles.burger__constructor}>
           <BurgerConstructor />
          </section>
          </DndProvider>
      </main>
    </div>
  );
}

export default App;
