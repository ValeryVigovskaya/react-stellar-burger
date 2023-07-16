import OrderFromFeed from "../components/order-from-feed/order-from-feed";
import { profileOrderId } from "../../src/utils/constants";
import { Link, useMatch } from "react-router-dom";

function OrderDetailsProfilePage() {
  return (
    <div className="mt-15">
      <OrderFromFeed />
    </div>
  );
}

export default OrderDetailsProfilePage;
