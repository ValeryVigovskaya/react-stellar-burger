import log from "../pages/log.module.css";
import {
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {signIn} from "../services/actions/actions-user";
import { useSelector } from "react-redux";

function LoginPage() {
  const [value, setValue] = useState({email:'', password:''});
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(false);

  const onChangeMail = (e) => {
    setValue({
      ...value,
      [e.target.name]:e.target.value});
  };

  const onClick = () => {
    dispatch(signIn(value));
    navigate('/', { replace: true });
}

    function onClickReg() {
    navigate('/register', { replace: true });
}

function onClickForgotPass() {
  navigate('/forgot-password', { replace: true });
}

  return (
    <div className={log.container}>
      <form className={log.form}>
        <h2 className={`${log.title} text text_type_main-medium pb-3`}>Вход</h2>
        <fieldset className={`${log.input_items} pb-3 pt-3`}>
          <EmailInput
            onChange={onChangeMail}
            value={value.email}
            name={"email"}
            isIcon={false}
            placeholder={"E-mail"}
          />
          <Input
            type={isVisible ? 'text' : 'password'}
            placeholder={"Пароль"}
            onChange={onChangeMail}
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
        <Button htmlType="button" type="primary" size="medium" onClick={onClick}>
          Войти
        </Button>
        </div>
      </form>
      <div className={`${log.text_container} pt-5`}>
        <p className="text text_type_main-default text_color_inactive">
          Вы новый пользователь?
        </p>
        <Button htmlType="button" type="secondary" size="medium" onClick={onClickReg} extraClass="pl-2 pr-2">
        Зарегистрироваться
        </Button>
      </div>
      <div className={`${log.text_container}`}>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </p>
        <Button htmlType="button" type="secondary" size="medium" extraClass="pl-2 pr-2" onClick={onClickForgotPass}>
        Восстановить пароль
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
