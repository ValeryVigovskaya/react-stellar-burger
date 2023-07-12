import OrderFromFeed from "../components/order-from-feed/order-from-feed";
import { ordersId } from "../../src/utils/constants";
import { Link, useMatch } from "react-router-dom";

function OrderDetailsPage() {
  return (
    <>
      <OrderFromFeed />
    </>
  );
}

export default OrderDetailsPage;
