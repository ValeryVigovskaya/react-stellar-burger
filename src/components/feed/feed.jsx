import feed from "./feed.module.css";
import FeedItem from "../feed-item/feed-item";
import { useDispatch, useSelector } from "react-redux";
//import { orders } from "../../utils/constants";
import { openModalOrder } from "../../services/actions/actions";
import { useLocation, Link } from "react-router-dom";

function Feed({ orders }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const onClickOnOrder = () => {
    dispatch(openModalOrder());
  };

  return (
    <div className={`${feed.container}`}>
      <ul className={`${feed.list}`}>
        {orders
          ? orders.map((order) => (
              <Link
                key={order.number}
                className={`${feed.item} pb-5`}
                to={`/feed/${order.number}`}
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

export default Feed;
