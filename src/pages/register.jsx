import log from "../pages/log.module.css";
import {
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux";
import {register} from "../services/actions/actions-user";

function RegisterPage() {
  const [value, setValue] = useState({name:'', email:'', password:''});
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(false);


  const onChange = (e) => {
    setValue({
      ...value,
      [e.target.name]:e.target.value});
  };

  function onClick() {
    navigate('/login', { replace: true });
}

const dispatch = useDispatch();

const onClickSubmitButton = (evt) => {
  evt.preventDefault();
  navigate('/login', { replace: true });
  dispatch(register(value));
}
  return (
    <div className={log.container}>
      <form className={log.form}>
        <h2 className={`${log.title} text text_type_main-medium pb-3`}>
          Регистрация
        </h2>
        <fieldset className={`${log.input_items} pb-3 pt-3`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
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
            name={"email"}
            placeholder="E-mail"
            isIcon={false}
          />
          <Input
            type={isVisible ? 'text' : 'password'}
            placeholder={"Пароль"}
            onChange={onChange}
            icon={isVisible ? 'ShowIcon' : 'HideIcon'}
            value={value.password}
            name={"password"}
            error={false}
            ref={inputRef}
            onIconClick={() => setVisible(!isVisible)}
            errorText={"Ошибка"}
            size={"default"}
            //extraClass="ml-1"
          />
        </fieldset>
        <div className={`${log.button} pt-3 mb-15`}>
          <Button
            htmlType="button" type="primary" size="medium" onClick={onClickSubmitButton}
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div className={`${log.text_container} pt-5`}>
        <p className="text text_type_main-default text_color_inactive">
         Уже зарегистрированы?
        </p>
        <Button htmlType="button" type="secondary" size="medium" onClick={onClick} extraClass="pl-2 pr-2">
        Войти
        </Button>
      </div>
    </div>
  );
}

export default RegisterPage;
