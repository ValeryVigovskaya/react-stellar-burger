import log from "../pages/log.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { useNavigate, NavLink, useMatch, Outlet } from "react-router-dom";
import { signOut, patchUserFetch } from "../services/actions/actions-user";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../utils/constants";
import { useForm } from "../hooks/useForm";

function ProfilePage() {
  const user = useSelector((state) => state.rootReducer.userReducer.user);
  const { values, handleChange, setValues} = useForm({ name: user.name,
    email: user.email,
    password: "",});

  const [isEditing, setEditing] = useState({
    name: false,
    email: false,
    password: false,
  });

  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const style = ({ isActive }) =>
    isActive
      ? `${log.nav_link} ${log.nav_link_active} text text_type_main-medium`
      : `${log.nav_link} text text_type_main-medium text_color_inactive`;

  const profileLink = useMatch("/profile");
  const profileOrdersLink = useMatch("/profile/orders");

  const onClickOut = () => {
    navigate(login, { replace: true });
    dispatch(signOut());
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    dispatch(patchUserFetch(values));
  };

  function onClickCancel(e) {
    e.preventDefault();
    setValues({ name: user.name, email: user.email, password: "" });
  }

  //условия для отображения кнопок
  const onChangeInput =
  values.name !== user.name || values.email !== user.email || values.password;

  return (
    <div className={log.container_profile}>
      <div className={`${log.text_container_nav}`}>
        <nav className={`${log.text_container_list} pb-5`}>
          {profileLink ? (
            <NavLink to={{ pathname: "/profile" }} className={style}>
              Профиль
            </NavLink>
          ) : (
            <NavLink to={{ pathname: "/profile" }} className={style(false)}>
              Профиль
            </NavLink>
          )}
          {profileOrdersLink ? (
            <NavLink to={{ pathname: "/profile/orders" }} className={style}>
              История заказов
            </NavLink>
          ) : (
            <NavLink
              to={{ pathname: "/profile/orders" }}
              className={style(false)}
            >
              История заказов
            </NavLink>
          )}
          <NavLink className={style(false)} onClick={onClickOut}>
            Выход
          </NavLink>
        </nav>
        <p className="text text_type_main-default text_color_inactive pt-15">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      {!!profileLink ? (
        <form className={log.form} onSubmit={onClickSubmit}>
          <fieldset className={`${log.input_items} pb-3`}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={handleChange}
              icon={values.name ? "EditIcon" : "CloseIcon"}
              onIconClick={() => setEditing(!isEditing)}
              value={values.name}
              name={"name"}
              error={false}
              ref={inputNameRef}
              errorText={"Ошибка"}
              size={"default"}
            />
            <Input
              type={"text"}
              placeholder={"E-mail"}
              onChange={handleChange}
              icon={values.email ? "EditIcon" : "CloseIcon"}
              onIconClick={() => setEditing(!isEditing)}
              value={values.email}
              name={"email"}
              error={false}
              ref={inputEmailRef}
              errorText={"Ошибка"}
              size={"default"}
            />
            <Input
              type={"password"}
              placeholder={"Пароль"}
              onChange={handleChange}
              icon={values.password ? "CloseIcon" : "EditIcon"}
              onIconClick={() => setEditing(!isEditing)}
              value={values.password}
              name={"password"}
              error={false}
              ref={inputPasswordRef}
              errorText={"Ошибка"}
              size={"default"}
            />
          </fieldset>
          {onChangeInput ? (
            <div className={`${log.form_button_container} pt-3`}>
              <Button
                htmlType="button"
                type="secondary"
                size="medium"
                onClick={onClickCancel}
              >
                Отмена
              </Button>
              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          ) : null}
        </form>
      ) : <Outlet />}
    </div>
  );
}

export default ProfilePage;
