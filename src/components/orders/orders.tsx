import ordersStyle from "./orders.module.css";
import { useAppSelector } from '../../services/index';
import { IOrder } from "../../utils/types";     

type TAcc = {
  [name: string]: IOrder[]
};

function Orders() {
  const {orders, total, totalToday} = useAppSelector(
    (state) => state.rootReducer.ordersReducer
  );

  const findOrdersByStatus = (arr: IOrder[]) => {
    return arr?.reduce(
      (acc: TAcc, curr) => {
        if (curr.status === "done"){
           acc["done"] = [...acc["done"], curr];
        } else if (curr.status === "pending"){
           acc["pending"] = [...acc["pending"], curr];
        }
        return acc;
      },
      {done:[], pending:[]} as TAcc
   );
  };

  const statusArray = findOrdersByStatus(orders);

  //console.log(statusArray?.done)
  return (
    <div className={`${ordersStyle.container}`}>
      <div className={`${ordersStyle.container_list}`}>
        <h3 className={`${ordersStyle.title} text text_type_main-medium`}>
          Готовы:
        </h3>
        <ul className={`${ordersStyle.list_numbers}`}>
       {statusArray?.done.map((order: IOrder, i) => (
                <li
                  className={`${ordersStyle.number} text text_type_digits-default`}
                  key={i}
                >
                  {order.number}
                </li>
              ))
            }
        </ul>
      </div>
      <div className={`${ordersStyle.container_list}`}>
        <h3 className={`${ordersStyle.title} text text_type_main-medium`}>
          В работе:
        </h3>
        <ul className={`${ordersStyle.list_numbers}`}>
          {statusArray?.pending.map((order: IOrder, i) => (
                <li className={`text text_type_digits-default`} key={i}>
                  {order.number}
                </li>
              ))}
        </ul>
      </div>
      <div className={`${ordersStyle.full}`}>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p
          className={`${ordersStyle.number_large} text text_type_digits-large`}
        >
          {total}
        </p>
      </div>
      <div className={`${ordersStyle.today}`}>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p
          className={`${ordersStyle.number_large} text text_type_digits-large`}
        >
          {totalToday}
        </p>
      </div>
    </div>
  );
}

export default Orders;
