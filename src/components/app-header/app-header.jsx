import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";
import { useNavigate } from "react-router-dom";

function AppHeader() {
  const navigate = useNavigate();

  function onClickProfile() {
    navigate("/profile", { replace: true });
  }
  function onClickConstructor() {
    navigate("/", { replace: true });
  } 
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.logo}>
        <Logo />
      </div>
      <nav className="pb-4 pt-4">
        <ul className={`${headerStyles.header_list}`}>
          <li className={`${headerStyles.header_item} pl-5 pr-5`}>
          <Button type="secondary" extraClass={`${headerStyles.header_link} text_type_main-default text_color_inactive`} onClick={onClickConstructor}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default  pl-2">Конструктор</p>
            </Button>
          </li>
          <li className={`${headerStyles.header_item} pl-5`}>
            <a href="#order-feed" className={headerStyles.header_link}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive pl-2">
                Лента заказов
              </p>
            </a>
          </li>
          <li className={`${headerStyles.header_item} pl-5`}>
            <Button type="secondary" extraClass={`${headerStyles.header_link} text_type_main-default text_color_inactive pr-5`} onClick={onClickProfile}>
              <ProfileIcon type="secondary" />
                Личный кабинет       
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
