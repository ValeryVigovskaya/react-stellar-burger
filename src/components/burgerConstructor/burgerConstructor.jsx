import {
  DragIcon,
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyles from "./burgerConstructor.module.css";

const BurgerIngredient = ({ ingridient }) => {
  return (
    <div className={`${burgerStyles.ingridient__container} pl-2`}>
      <ConstructorElement
        text={ingridient.name}
        price={ingridient.price}
        thumbnail={ingridient.image_mobile}
      />
    </div>
  );
};

function BurgerConstructor({ ingridient }) {
  //нашла одну булку
  const bun = ingridient.find((m) => m.type === "bun");
  return (
    <div>
      <div className={`${burgerStyles.ingridient} pl-4 pb-5`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          ingridient={bun}
        />
        <ul className={`${burgerStyles.ingridient__list} pt-5`}>
          {ingridient.map(
            (
              item //нашла все, кроме булки
            ) =>
              item.type !== "bun" && (
                <li
                  key={item._id}
                  className={`${burgerStyles.ingridient__item} pb-4`}
                >
                  <DragIcon type="primary" />
                  <BurgerIngredient ingridient={item} />
                </li>
              )
          )}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          ingridient={bun}
        />
      </div>
      <div className={`${burgerStyles.order} pt-5 pr-4`}>
        <div className={`${burgerStyles.price}`}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
