import styles from "../app/app.module.css";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HomePage from "../../pages/home";
import AppHeader from "../app-header/app-header";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPass from "../../pages/forgotPass";
import ResetPass from "../../pages/resetPass";
import ProfilePage from "../../pages/profile"
import { userAuth } from "../../services/actions/actions-user";
import { OnlyAuth, OnlyUnAuth } from "../protected-route";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {
  closeModalIngredientDetails,
  deleteTabIngredient,
} from "../../services/actions/actions";

function App() {
  const dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  //const isOpenIngredient = useSelector((state) => state.ingredientDetails);

  const closeModalIngredientDetails = () => {
    dispatch(closeModalIngredientDetails());
    dispatch(deleteTabIngredient());
    navigate(-1);
  };

    useEffect(() => {
      dispatch(userAuth());
    }, [dispatch]);

  return (
    <div className={styles.app}>
      <Router>
      <AppHeader />
    <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />        
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>} />}/>
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage/>} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />}/>
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPass />} />}/>
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPass />} />}/>
        <Route path="/ingredients/:id" element={<IngredientDetails />}/>
    </Routes>
    {background && (
        <Routes>
	        <Route
	          path='/ingredients/:id'
	          element={
	            <Modal onClose={closeModalIngredientDetails} title="Детали ингредиента"s>
	              <IngredientDetails />
	            </Modal>
	          }
	        />
        </Routes>
      )}
    </Router>
    </div>
  );
}

export default App;
