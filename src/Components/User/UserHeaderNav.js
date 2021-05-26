import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { ReactComponent as MinhasFotos } from "../../Assets/feed.svg";
import { ReactComponent as Estatisticas } from "../../Assets/estatisticas.svg";
import { ReactComponent as AdicionarFoto } from "../../Assets/adicionar.svg";
import { ReactComponent as Sair } from "../../Assets/sair.svg";
import styles from "../../Styles/UserHeaderNav.module.css";

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const [mobile, setMobile] = useState("");

  return (
    <nav className={styles.nav}>
      <NavLink to="/conta" end activeClassName={styles.active}>
        <MinhasFotos />
        {mobile && "Minhas fotos"}
      </NavLink>
      <NavLink to="/conta/estatisticas" activeClassName={styles.active}>
        <Estatisticas />
        {mobile && "Estatísticas"}
      </NavLink>
      <NavLink to="/conta/postar" activeClassName={styles.active}>
        <AdicionarFoto />
        {mobile && "Adicionar foto"}
      </NavLink>
      <button onClick={userLogout}>
        <Sair />
        {mobile && "Sair"}
      </button>
    </nav>
  );
};

export default UserHeaderNav;
