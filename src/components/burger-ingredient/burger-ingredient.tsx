import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredient from "./burger-ingredient.module.css";
import { onDelete } from "../../services/actions/ingredients-constructor-actions";
import { useDispatch } from "react-redux";
import { DropTargetOptions, useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { IIngredient } from "../../utils/types";
import { useAppSelector } from '../../services/index';

interface IBurgerIngredientProps {
  ingridient: IIngredient;
  moveItemIngredient: (dragIndex: number, hoverIndex: number) => void;
}

const BurgerIngredient = ({ ingridient, moveItemIngredient }: IBurgerIngredientProps) => {
  const id = ingridient.keyUuid; //тк при добавлении игредиентов используется уникальный ключ, сделала переменную
  const { ingredients } = useAppSelector((state) => state.rootReducer.ingredientsConstructor);

  //тк индекс не вытаскивался использую indexOf
  const index = ingredients.indexOf(ingridient);
  const dispatch = useDispatch();

  //функция для удаления ингредиента
  const onDeleteIngredient = () => {
    return dispatch(onDelete(id));
  };

  const ref = useRef<HTMLDivElement>(null);

  //драг контейнер
  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  //тут же дроп, потому что область перетаскивания одна
  const [{ handlerId }, drop] = useDrop({
    accept: "item",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IIngredient, monitor: DropTargetOptions) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // один и тот же ингредиент не будет заменен собой же
      if (dragIndex === hoverIndex) {
        return;
      }
      // нахождение области на экране
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // нахождение вертикальной середины
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // определение положения мыши
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // выполнение перемещение только тогда, когда мышь пересекла половину высоты элементов.
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      //Перетаскивание вверх
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItemIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop(item) {
      //без доп определения дропа, перетаскивание работало не корректно.
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveItemIngredient(dragIndex, hoverIndex);
    },
  });
  drag(drop(ref));
  
  return (
    <div
      className={`${burgerIngredient.ingridient__container} pl-2`}
      data-handler-id={handlerId}
      ref={ref}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingridient.name}
        price={ingridient.price}
        thumbnail={ingridient.image_mobile}
        handleClose={() => onDeleteIngredient()}
      />
    </div>
  );
};

export default BurgerIngredient;
