import { Link, useNavigate } from "react-router-dom";
import Style from "../../css/components/aside.module.css";
import { ReactComponent as HamburgMenu } from "../../static/hamburguer_menu.svg";
import { ReactComponent as CompassIcon } from "../../static/compass_icon.svg";
import { ReactComponent as PeopleIcon } from "../../static/people_icon.svg";
import { ReactComponent as ExitIcon } from "../../static/exit_icon.svg";

const Aside = ({ stateLink }) => {
    const navigate = useNavigate()
    const handleExit = () =>{
        navigate("/")
    }
  return (
    <div className={Style.aside}>
      <div className={Style.header}>
        <HamburgMenu width="42px" />
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
          <ExitIcon className={Style.icon}/>
          <h3>Sair</h3>
        </div>
    </div>
  );
};

export default Aside;
