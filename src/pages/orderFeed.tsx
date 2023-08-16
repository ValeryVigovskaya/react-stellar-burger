import orderFeed from "./orderFeed.module.css";
import Feed from "../components/feed/feed";
import Orders from "../components/orders/orders";
import {
  connect,
  disconnect,
} from "../services/actions/actions-ws";
import { useEffect } from "react";
import Loader from "../components/loader/loader";
import { useAppDispatch, useAppSelector} from "../services/index";

const GET_ORDERS_SERVER_URL = "wss://norma.nomoreparties.space/orders/all";

function OrderFeedPage() {
  const dispatch = useAppDispatch();

  const { orders, connectionError, loader } = useAppSelector(
    (state) => state.rootReducer.ordersReducer
  );

  useEffect(() => {
     dispatch(connect(GET_ORDERS_SERVER_URL));
    return () => { 
      const disconnectWs = () => {
        dispatch(disconnect())
      }
      disconnectWs()  
    };
  }, [dispatch]);

  if (connectionError) {
    return <p>Произошла ошибка при получении данных</p>;
  } else if (loader) {
    return <Loader />;
  } else {
    return (
      <div className={`${orderFeed.container}`}>
        <h2 className={`${orderFeed.title} text text_type_main-large pb-5`}>
          Лента заказов
        </h2>
        <div className={`${orderFeed.components}`}>
          <Feed orders={orders} />
          <Orders />
        </div>
      </div>
    );
  }
}

export default OrderFeedPage;
