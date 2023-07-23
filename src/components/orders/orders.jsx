import ordersStyle from "./orders.module.css";
import { useSelector } from "react-redux";

function Orders() {
  const orders = useSelector(
    (state) => state.rootReducer.ordersReducer.massiv.orders
  );
  const total = useSelector(
    (state) => state.rootReducer.ordersReducer.massiv.total
  );
  const totalToday = useSelector(
    (state) => state.rootReducer.ordersReducer.massiv.totalToday
  );

  const findOrdersByStatus = (arr) => {
    return arr?.reduce(
      (acc, curr) => {
        curr.status === "done"
          ? (acc["done"] = [...acc["done"], curr])
          : (acc["pending"] = [...acc["pending"], curr]);
        return acc;
      },
      { done: [], pending: [] }
    );
  };

  const statusArray = findOrdersByStatus(orders);
  return (
    <div className={`${ordersStyle.container}`}>
      <div className={`${ordersStyle.container_list}`}>
        <h3 className={`${ordersStyle.title} text text_type_main-medium`}>
          Готовы:
        </h3>
        <ul className={`${ordersStyle.list_numbers}`}>
          {statusArray
            ? statusArray.done.map((order, i) => (
                <li
                  className={`${ordersStyle.number} text text_type_digits-default`}
                  key={i}
                >
                  {order.number}
                </li>
              ))
            : null}
        </ul>
      </div>
      <div className={`${ordersStyle.container_list}`}>
        <h3 className={`${ordersStyle.title} text text_type_main-medium`}>
          В работе:
        </h3>
        <ul className={`${ordersStyle.list_numbers}`}>
          {statusArray
            ? statusArray.pending.map((order, i) => (
                <li className={`text text_type_digits-default`} key={i}>
                  {order.number}
                </li>
              ))
            : null}
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
