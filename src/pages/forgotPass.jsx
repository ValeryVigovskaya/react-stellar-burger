import log from "../pages/log.module.css";
import {
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {postMailFetch} from "../services/actions/actions-user";
import { useDispatch, useSelector } from "react-redux";
import { postMail} from '../api/api'

function ForgotPass() {
  //const email = useSelector((state) => state.userReducer.user)
  const [value, setValue] = useState({email: ''});
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
      [e.target.name]:e.target.value});
  };

    function onClick() {
    navigate('/login', { replace: true });
}

const onClickButton = () => {
  postMailFetch()
  navigate('/reset-password', { replace: true });
}

function postMailFetch() {
    return postMail(value.email)
      .then(res => {
        value.email = res;
      })
      .then (()=>{
        localStorage.setItem('mail', value.email);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
}

  return (
    <div className={log.container}>
      <form className={log.form}>
        <h2 className={`${log.title} text text_type_main-medium pb-3`}>Восстановление пароля</h2>
        <fieldset className={`${log.input_items} pb-3 pt-3`}>
          <EmailInput
            onChange={onChange}
            value={value.email}
            name={"email"}
            isIcon={false}
            placeholder={"Укажите e-mail"}
          />
        </fieldset>
        <div className={`${log.button} pt-3 mb-15`}>
        <Button htmlType="submit" type="primary" size="medium" onClick={onClickButton}>
          Восстановить
        </Button>
        </div>
      </form>
      <div className={`${log.text_container}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <Button htmlType="button" type="secondary" size="medium" extraClass="pl-2 pr-2" onClick={onClick}>
        Войти
        </Button>
      </div>
    </div>
  );
}

export default ForgotPass;
