import { Link, useNavigate } from "react-router-dom";
import Style from "../../css/components/aside.module.css";
import { X, List } from "@phosphor-icons/react";
import { ReactComponent as HamburgMenu } from "../../static/hamburguer_menu.svg";
import { ReactComponent as CompassIcon } from "../../static/compass_icon.svg";
import { ReactComponent as PeopleIcon } from "../../static/people_icon.svg";
import { ReactComponent as ExitIcon } from "../../static/exit_icon.svg";
import { useEffect, useState } from "react";

const Aside = ({ stateLink }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const navigate = useNavigate();
  const handleExit = () => {
    navigate("/");
  };

  const handleResize = () => {
    if (window.innerWidth > 1200) {
      setMenuIsOpen(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return menuIsOpen ? (
    <div className={Style.aside}>
      <div className={Style.header}>
        <X
          onClick={() => setMenuIsOpen(false)}
          className={Style.X}
          size={"3rem"}
          color="#fff"
        />
        <HamburgMenu className={Style.hbmenu} width="3rem" />
        <h1>Serviços</h1>
      </div>
      <div className={Style.links}>
        <Link
          to={"/safekids"}
          className={`${Style.link} ${
            stateLink === "safekids" ? Style.makeBlue : ""
          }`}
        >
          <CompassIcon className={Style.icon} />
          <h3>SafeKids</h3>
        </Link>
        <Link
          to={"/manager"}
          className={`${Style.link} ${
            stateLink === "manager" ? Style.makeBlue : ""
          }`}
        >
          <PeopleIcon className={Style.icon} />
          <h3>
            Gerenciamento <br /> dos usuários
          </h3>
        </Link>
      </div>
      <div onClick={handleExit} className={Style.exit}>
        <ExitIcon className={Style.icon} />
        <h3>Sair</h3>
      </div>
    </div>
  ) : (
    <List
      onClick={() => setMenuIsOpen(true)}
      className={Style.menu}
      size="3rem"
      color="#000"
    />
  );
};

export default Aside;
