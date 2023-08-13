import profileOrders from "./profileOrders.module.css";
import { FeedProfile } from "../components/feed-profile/feed-profile";
import { useAppSelector, useAppDispatch } from "../../src/services/index";
import {
  connectInProfile,
  disconnectInProfile,
} from "../services/actions/actions-ws";
import { useEffect } from "react";
import Loader from "../components/loader/loader";

const GET_ORDERS_IN_PROFILE_SERVER_URL =
  "wss://norma.nomoreparties.space/orders";

function ProfileOrdersPage() {
  const dispatch = useAppDispatch();
  const accessTokenWithBearer = localStorage.getItem("accessToken");
  const accessTokenWithoutBearer = accessTokenWithBearer?.slice(7);
  const orders = useAppSelector(
    (state) => state.rootReducer.ordersInProfileReducer.orders
  );
  const { connectionError, loader } = useAppSelector(
    (state) => state.rootReducer.ordersInProfileReducer
  );

  useEffect(() => {
    dispatch(
      connectInProfile(
        `${GET_ORDERS_IN_PROFILE_SERVER_URL}?token=${accessTokenWithoutBearer}`
      )
    );
    return () => {
      const disconnectInProfileWs = () => {
        dispatch(
          disconnectInProfile(
            `${GET_ORDERS_IN_PROFILE_SERVER_URL}?token=${accessTokenWithoutBearer}`
          )
        );
      };
      disconnectInProfileWs();
    };
  }, [dispatch, accessTokenWithoutBearer]);
  //тк заказы приходили в неправильном порядке, массив перевернула
  const ordersReverse = orders.slice()
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  if (connectionError) {
    return <p>Произошла ошибка при получении данных</p>;
  } else if (loader) {
    return <Loader />;
  } else {
    return (
      <>
        <div className={`${profileOrders.container}`}>
          <FeedProfile orders={ordersReverse} />
        </div>
      </>
    );
  }
}

export default ProfileOrdersPage;
