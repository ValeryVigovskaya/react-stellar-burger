import feed from "./feed.module.css";
import FeedItem from "../feed-item/feed-item";
import { openModalOrder } from "../../services/actions/modal-order-actions";
import { useLocation, Link } from "react-router-dom";
import { useAppDispatch } from '../../services/index';
import { IOrder } from "../../utils/types";

interface IFeedProps {
  orders: IOrder[];
}

function Feed({ orders }: IFeedProps) {
  const dispatch = useAppDispatch();
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
