import log from "../pages/log.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { resetPass } from "../api/api";
import { Navigate } from "react-router-dom";

function ResetPass() {
  const [value, setValue] = useState({ password: "", token: "" });
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(false);

  const onChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  function onClick() {
    navigate("/login", { replace: true });
  }

  const onClickButton = () => {
    postPassFetch();
    navigate("/login", { replace: true });
  };

  function postPassFetch() {
    return resetPass(value)
      .then((res) => {
        value.password = res;
        value.token = res;
        localStorage.removeItem("email");
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }
  //условие, для запрета перехода на маршрут
  if (!localStorage.getItem("email")) {
    return <Navigate to="/forgot-password" replace={true} />;
  }
  return (
    <div className={log.container}>
      <form className={log.form}>
        <h2 className={`${log.title} text text_type_main-medium pb-3`}>
          Восстановление пароля
        </h2>
        <fieldset className={`${log.input_items} pb-3 pt-3`}>
          <Input
            type={isVisible ? "text" : "password"}
            placeholder={"Введите новый пароль"}
            onChange={onChange}
            icon={isVisible ? "ShowIcon" : "HideIcon"}
            onIconClick={() => setVisible(!isVisible)}
            value={value.password}
            name={"password"}
            error={false}
            ref={inputRef}
            errorText={"Ошибка"}
            size={"default"}
            //extraClass="ml-1"
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={onChange}
            value={value.token}
            name={"token"}
            error={false}
            ref={inputRef}
            errorText={"Ошибка"}
            size={"default"}
            //extraClass="ml-1"
          />
        </fieldset>
        <div className={`${log.button} pt-3 mb-15`}>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={onClickButton}
          >
            Сохранить
          </Button>
        </div>
      </form>
      <div className={`${log.text_container}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass="pl-2 pr-2"
          onClick={onClick}
        >
          Войти
        </Button>
      </div>
    </div>
  );
}

export default ResetPass;
