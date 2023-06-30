import styles from "../app/app.module.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from "../../pages/home";
import IngredientDetailsPage from "../../pages/ingredientDetalis";
import AppHeader from "../app-header/app-header";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPass from "../../pages/forgotPass";
import ResetPass from "../../pages/resetPass";
import ProfilePage from "../../pages/profile";
import OrderFeedPage from "../../pages/orderFeed";
import { userAuth } from "../../services/actions/actions-user";
import { OnlyAuth, OnlyUnAuth } from "../protected-route";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { getData } from "../../services/actions/actions";
import ProfileOrdersPage from "../../pages/profileOrders";
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
} from "../../utils/constants";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const closeModalIngredientDetails = () => {
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
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path={profile}
          element={<OnlyAuth component={<ProfilePage />} />}
        >
          <Route
            path={ordersInProfile}
            element={<OnlyAuth component={<ProfileOrdersPage />} />}
          />
        </Route>
        <Route
          path={register}
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path={forgotPass}
          element={<OnlyUnAuth component={<ForgotPass />} />}
        />
        <Route
          path={resetPass}
          element={<OnlyUnAuth component={<ResetPass />} />}
        />
        <Route path={orders} element={<OrderFeedPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path={ingredientsId}
            element={
              <Modal
                onClose={closeModalIngredientDetails}
                title="Детали ингредиента"
                s
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
