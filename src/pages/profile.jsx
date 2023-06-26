import log from "../pages/log.module.css";
import {
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
//import { signOut } from "../services/actions/actions-user";
import { signOut, patchUserFetch } from "../services/actions/actions-user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function ProfilePage() {
  const { name, email } = useSelector(
    (state) => state.userReducer.user
  );
  const [value, setValue] = useState({
    name: name,
    email: email,
    password: '',
  });
  const [isEditing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const onChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const onClick = () => {
    dispatch(signOut());
    navigate("/login", { replace: true });
  };

  const onClickSave = () => {
    dispatch(patchUserFetch(value))
  }

  function onClickCancel(e) {
    e.preventDefault();
    setValue({
      name, email,
    })
  }

  return (
    <div className={log.container_profile}>
      <div className={`${log.text_container_nav}`}>
        <nav className={`${log.text_container_list} pb-5`}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="text text_type_main-medium text_color_inactive"
            onClick={onClick}
          >
            Профиль
          </Button>
          <p className="text text_type_main-medium text_color_inactive">
            История заказов
          </p>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="text text_type_main-medium text_color_inactive"
            onClick={onClick}
          >
            Выход
          </Button>
        </nav>
        <p className="text text_type_main-default text_color_inactive pt-15">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={log.form}>
        <fieldset className={`${log.input_items} pb-3`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            readOnly={isEditing? false : true}
            icon={isEditing? "EditIcon": "CloseIcon"}
            onIconClick={() => setEditing(!isEditing)}
            value={value.name}
            name={"name"}
            error={false}
            ref={inputRef}
            errorText={"Ошибка"}
            size={"default"}
            //extraClass="ml-1"
          />
          <EmailInput
            onChange={onChange}
            value={value.email}
            name={"E-mail"}
            readOnly={isEditing? false : true}
            icon={isEditing? "EditIcon": "CloseIcon"}
            onIconClick={() => setEditing(!isEditing)}
            //isIcon={false}
          />
          <Input
            type={"password"}
            placeholder={"Пароль"}
            onChange={onChange}
            readOnly={isEditing? false : true}
            icon={isEditing? "EditIcon": "CloseIcon"}
            onIconClick={() => setEditing(!isEditing)}
            value={value.password}
            name={"password"}
            error={false}
            ref={inputRef}
            errorText={"Ошибка"}
            size={"default"}
            //extraClass="ml-1"
          />
        </fieldset>
        <div className={`${log.form_button_container} pt-3`}>
          <Button htmlType="button" type="secondary" size="medium" onClick={onClickCancel}>
            Отмена
          </Button>
          <Button htmlType="button" type="primary" size="medium" onClick={onClickSave}>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
