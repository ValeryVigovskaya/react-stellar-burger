import log from "../pages/log.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { postMail } from "../api/api";
import { login, resetPass } from "../utils/constants";
import { useForm } from "../hooks/useForm";

function ForgotPass() {
  const navigate = useNavigate();
  const { values, handleChange } = useForm({ email: "" });

  function onClick() {
    navigate(login, { replace: true });
  }

  const onClickSubmit = (e) => {
    e.preventDefault();
    postMailFetch();
    navigate(resetPass, { replace: true });
  };

  function postMailFetch() {
    return postMail(values.email)
      .then((res) => {
        values.email = res.email;
        localStorage.setItem("email", res.email);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  return (
    <div className={log.container}>
      <form className={log.form} onSubmit={onClickSubmit}>
        <h2 className={`${log.title} text text_type_main-medium pb-3`}>
          Восстановление пароля
        </h2>
        <fieldset className={`${log.input_items} pb-3 pt-3`}>
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={"email"}
            isIcon={false}
            placeholder={"Укажите e-mail"}
          />
        </fieldset>
        <div className={`${log.button} pt-3 mb-15`}>
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </div>
      </form>
      <div className={`${log.text_container}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <Button
          htmlType="submit"
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

export default ForgotPass;
