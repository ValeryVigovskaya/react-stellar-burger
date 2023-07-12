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

const GET_ORDERS_SERVER_URL = "wss://norma.nomoreparties.space/orders/all";

function OrderFeedPage() {
  const dispatch = useDispatch();

  const orders = useSelector(
    (state) => state.rootReducer.ordersReducer.massiv.orders
  );

  useEffect(() => {
    dispatch(connectOrders(GET_ORDERS_SERVER_URL));
    return () => dispatch(disconnectOrders(GET_ORDERS_SERVER_URL));
  }, [dispatch]);

  return (
    <div className={`${orderFeed.container}`}>
      <h2 className={`${orderFeed.title} text text_type_main-large pb-5`}>
        Лента заказов
      </h2>
      <div className={`${orderFeed.components}`} >
        <Feed orders={orders}/>
        <Orders />
      </div>
    </div>
  );
}

export default OrderFeedPage;
