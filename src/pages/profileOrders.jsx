//import Feed from "../components/feed/feed";
import profileOrders from "./profileOrders.module.css";
import FeedProfile from "../components/feed-profile/feed-profile";
import { useDispatch, useSelector } from "react-redux";
import {
  connectInProfile,
  disconnectInProfile,
} from "../../src/services/actions/actions-ws";
import { useEffect, useMemo } from "react";
import { Link, Outlet } from "react-router-dom";

const GET_ORDERS_IN_PROFILE_SERVER_URL = "wss://norma.nomoreparties.space/orders";

function ProfileOrdersPage() {
  const dispatch = useDispatch();
  const accessTokenWithBearer = localStorage.getItem('accessToken');
  const accessTokenWithoutBearer = accessTokenWithBearer.slice(7)
  const orders = useSelector(
    (state) => state.rootReducer.ordersInProfileReducer.massiv.orders
  );

  useEffect(() => {
    dispatch(connectInProfile(`${GET_ORDERS_IN_PROFILE_SERVER_URL}?token=${accessTokenWithoutBearer}`));
    return () => dispatch(disconnectInProfile(`${GET_ORDERS_IN_PROFILE_SERVER_URL}?token=${accessTokenWithoutBearer}`));

  }, [dispatch, accessTokenWithoutBearer]);

    return (
      <>
      <div className={`${profileOrders.container}`}>
      <FeedProfile orders={orders}/>
     </div>
     
      </>
    );
  }
  
  export default ProfileOrdersPage;