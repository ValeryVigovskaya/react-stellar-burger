import orderFeed from "./orderFeed.module.css";
import Feed from "../components/feed/feed";
import Orders from "../components/orders/orders";
import { WebsocketStatus } from "../../src/utils/orders";
import {
  connect as connectOrders,
  disconnect as disconnectOrders,
} from "../../src/services/actions/actions-ws";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import FeedItem from "../components/feed-item/feed-item";
import Loader from "../components/loader/loader";

const GET_ORDERS_SERVER_URL = "wss://norma.nomoreparties.space/orders/all";

function OrderFeedPage() {
  const dispatch = useDispatch();

  const {massiv, connectionError, loader} = useSelector(
    (state) => state.rootReducer.ordersReducer
  );

  useEffect(() => {
    dispatch(connectOrders(GET_ORDERS_SERVER_URL));
    return () => dispatch(disconnectOrders());
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
      <div className={`${orderFeed.components}`} >
        <Feed orders={massiv.orders}/>
        <Orders />
      </div>
    </div>
  );
  }
}

export default OrderFeedPage;
