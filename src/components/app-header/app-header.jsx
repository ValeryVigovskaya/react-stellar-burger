import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";
import { NavLink, useMatch } from "react-router-dom";

function AppHeader() {
  const style = ({ isActive }) =>
    isActive
      ? `${headerStyles.header_link} ${headerStyles.header_link_active} text_type_main-default pl-2`
      : `${headerStyles.header_link} text_type_main-default  text_color_inactive pl-2`;
  const homeLink = useMatch("/");
  const profileLink = useMatch("/profile");
  const orderFeedLink = useMatch("/feed");

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.logo}>
        <Logo />
      </div>
      <nav className="pb-4 pt-4">
        <ul className={`${headerStyles.header_list}`}>
          <li className={`${headerStyles.header_item} pl-5 pr-5`}>
            <NavLink to={{ pathname: "/" }} className={style}>
              {homeLink ? (
                <BurgerIcon type={"primary"} />
              ) : (
                <BurgerIcon type={"secondary"} />
              )}
              Конструктор
            </NavLink>
          </li>
          <li className={`${headerStyles.header_item} pl-5`}>
            <NavLink to={{ pathname: "/feed" }} className={style}>
              {orderFeedLink ? (
                <ListIcon type={"primary"} />
              ) : (
                <ListIcon type={"secondary"} />
              )}
              Лента заказов
            </NavLink>
          </li>
          <li className={`${headerStyles.header_item} pl-5 pr-5`}>
            <NavLink to={{ pathname: "/profile" }} className={style}>
              {profileLink ? (
                <ProfileIcon type={"primary"} />
              ) : (
                <ProfileIcon type={"secondary"} />
              )}
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
