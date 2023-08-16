import log from "../pages/log.module.css";
import {
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../services/actions/actions-user";
import { login } from "../utils/constants";
import { useForm } from "../hooks/useForm";

function RegisterPage() {
  const { values, handleChange} = useForm({ name: "", email: "", password: "" });
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();

  function onClick() {
    navigate(login, { replace: true });
  }

  const onClickSubmit = (evt: MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(register(values));  
  };
  return (
    <div className={log.container}>
      <h2 className={`${log.title} text text_type_main-medium pb-3`}>
          Регистрация
        </h2>
      <form className={log.form} onSubmit={onClickSubmit}>
        <fieldset className={`${log.input_items} pb-3 pt-3`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={values.name}
            name={"name"}
            error={false}
            ref={inputRef}
            errorText={"Ошибка"}
            size={"default"}
          />
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={"email"}
            placeholder="E-mail"
            isIcon={false}
          />
          <Input
            type={isVisible ? "text" : "password"}
            placeholder={"Пароль"}
            onChange={handleChange}
            icon={isVisible ? "ShowIcon" : "HideIcon"}
            value={values.password}
            name={"password"}
            error={false}
            ref={inputRef}
            onIconClick={() => setVisible(!isVisible)}
            errorText={"Ошибка"}
            size={"default"}
          />
        </fieldset>
        <div className={`${log.button} pt-3 mb-15`}>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div className={`${log.text_container} pt-5`}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
        </p>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={onClick}
          extraClass="pl-2 pr-2"
        >
          Войти
        </Button>
      </div>
    </div>
  );
}

export default RegisterPage;
