import feedProfile from "./feed-profile.module.css";
import FeedItem from "../feed-item/feed-item";
import { useDispatch } from "react-redux";
import { openModalOrder } from "../../services/actions/modal-order-actions";
import { useLocation, Link} from "react-router-dom";
import {IOrder} from "../../utils/types"

interface IFeedProfileProps {
  orders: IOrder[];
}

export const FeedProfile= ({ orders }: IFeedProfileProps) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const onClickOnOrder = () => {
    dispatch(openModalOrder());
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
};
