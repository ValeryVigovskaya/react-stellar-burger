import feedProfile from "./feed-profile.module.css";
import FeedItem from "../feed-item/feed-item";
import { useDispatch, useSelector } from "react-redux";
//import { orders } from "../../utils/constants";
import { openModalOrder, returnTabOrder } from "../../services/actions/actions";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import { ordersId } from "../../utils/constants";
import { useMatch } from "react-router-dom";

function FeedProfile({ orders }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const onClickOnOrder = (item) => {
    dispatch(openModalOrder());
    //dispatch(returnTabOrder(item));
  };

  return (
    <div className={`${feedProfile.container}`}>
      <ul className={`${feedProfile.list}`}>
        {orders
          ? orders.map((order) => (
              <Link
                key={order.number}
                className={`${feedProfile.item} pb-5`}
                to={`/profile/orders/${order.number}`}
                state={{ background: location }}
              >
                <FeedItem order={order} onClick={onClickOnOrder} />
              </Link>
            ))
          : null}
      </ul>
    </div>
  );
}

export default FeedProfile;
