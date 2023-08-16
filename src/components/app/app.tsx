import styles from "../app/app.module.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from "../../pages/home";
import IngredientDetailsPage from "../../pages/ingredientDetalis";
import {AppHeader} from "../app-header/app-header";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPass from "../../pages/forgotPass";
import ResetPass from "../../pages/resetPass";
import ProfilePage from "../../pages/profile";
import OrderFeedPage from "../../pages/orderFeed";
import { userAuth } from "../../services/actions/actions-user";
import { OnlyAuth, OnlyUnAuth } from "../protected-route";
import { useEffect } from "react";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {Modal} from "../modal/modal";
import { getData } from "../../services/actions/burger-ingredients-actions";
import ProfileOrdersPage from "../../pages/profileOrders";
import OrderDetailsPage from "../../pages/orderDetails";
import OrderFromFeed from "../order-from-feed/order-from-feed";
import OrderDetailsProfilePage from "../../pages/orderDetailsProfile";
import { useAppDispatch } from '../../services/index'
import {
  home,
  ingredientsId,
  login,
  profile,
  ordersInProfile,
  register,
  forgotPass,
  resetPass,
  orders,
  ordersId,
  profileOrderId,
} from "../../utils/constants";

type TStateLocation = Location & {
  state: {
    background: Location;
  };
}

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background: TStateLocation  = location.state && location.state.background;

  const closeModal = () => {
    navigate(-1);
  };

  //тк страница ингредиентов не отображалась, вызвала повторный диспатч получения
  useEffect(() => {
    dispatch(getData());
    dispatch(userAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={home} element={<HomePage />} />
        <Route path={ingredientsId} element={<IngredientDetailsPage />} />
        <Route
          path={login}
          element={<OnlyUnAuth onlyUnAuth = {true} component={<LoginPage />} />}
        />
        <Route
          path={profile}
          element={<OnlyAuth onlyUnAuth = {false} component={<ProfilePage />} />}
        >
          <Route
            path={ordersInProfile}
            element={<OnlyAuth onlyUnAuth = {false} component={<ProfileOrdersPage />} />}
          > 
          </Route>
        </Route>
        <Route
          path={profileOrderId}
          element={<OnlyAuth onlyUnAuth = {false} component={<OrderDetailsProfilePage />} />}
        />
        <Route
          path={register}
          element={<OnlyUnAuth onlyUnAuth = {true} component={<RegisterPage />} />}
        />
        <Route
          path={forgotPass}
          element={<OnlyUnAuth onlyUnAuth = {true} component={<ForgotPass />} />}
        />
        <Route
          path={resetPass}
          element={<OnlyUnAuth onlyUnAuth = {true} component={<ResetPass />} />}
        />
        <Route path={orders} element={<OrderFeedPage />} />
        <Route path={ordersId} element={<OrderDetailsPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path={ingredientsId}
            element={
              <Modal
                onClose={closeModal}
                title="Детали ингредиента"
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={ordersId}
            element={
              <Modal onClose={closeModal}>
                <OrderFromFeed />
              </Modal>
            }
          />
          <Route
            path={profileOrderId}
            element={
              <Modal onClose={closeModal}>
                <OrderFromFeed />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
