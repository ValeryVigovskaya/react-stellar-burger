import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useState, useEffect } from "react";
import { getDataFetch } from "../../api/api";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

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
  //состояния отрытия модального окна и ингредиента:
  const [isOpenIngredient, setIsOpenIngredient] = useState(false);
  const [tabIngredient, setTabIngredient] = useState(null);

  function handleOpenModalIngredient(item) {
    setIsOpenIngredient(true);
    setTabIngredient(item);
  }

  const handleCloseModalIngredient = () => {
    setIsOpenIngredient(false);
    setTabIngredient(null);
  };
  //состояния отрытия модального окна для работы попапа заказа:
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.ingredients}>
          <h1 className="text text_type_main-large">Соберите бургер</h1>
          {burgerIngredients.length && (
            <BurgerIngredients
              ingridients={burgerIngredients}
              onTab={handleOpenModalIngredient}
            />
          )}
        </section>
        <section className={styles.burger__constructor}>
          {burgerIngredients.length && (
            <BurgerConstructor
              ingridients={burgerIngredients}
              onClick={handleOpenModal}
            />
          )}
        </section>
      </main>
      <Modal
        isOpen={isOpenIngredient}
        onClose={handleCloseModalIngredient}
        title="Детали ингредиента"
      >
        <IngredientDetails tabIngredient={tabIngredient} />
      </Modal>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <OrderDetails />
      </Modal>
    </div>
  );
}

export default App;
