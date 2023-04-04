import Style from "../../css/components/header.module.css";
import { ReactComponent as Logo } from "../../static/logo.svg";
import { Link } from "react-router-dom";
import { Link as Lk } from "react-scroll";

const Header = () => {
  return (
    <header id="header" className={Style.header}>
        <Logo />
      <div className={Style.nav}>
        <Lk className={Style.link_pg} to="about" smooth={true} duration={500}>
          Sobre
        </Lk>
        <Lk className={Style.link_pg} to="sfabout" smooth={true} duration={500}>
          SafeKids
        </Lk>
        <Lk className={Style.link_pg} to="contato" smooth={true} duration={500}>
          Contato
        </Lk>
        <div className={Style.user}>
          <Link className={Style.link} to={"/login"}>
            Log In
          </Link>
          <Link className={Style.link} to={"/sign"}>
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
