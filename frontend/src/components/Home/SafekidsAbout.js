import Style from "../../css/components/safekidsabout.module.css";
import { ReactComponent as LockIcon } from "../../static/lock_icon.svg";
import { ReactComponent as CarfIcon } from "../../static/careful_icon.svg";
import { ReactComponent as ControlIcon } from "../../static/control_icon.svg";

const SafekidsAbout = () => {
  return (
    <section id="sfabout" className={Style.sfabout}>
      <h1>Safe Kids</h1>
      <h4>
        Proteja o que mais importa com a pulseira GPS mais confiável do mercado!
      </h4>
      <div className={Style.cards}>
        <div className={Style.card}>
          <div className={Style.icon}><LockIcon /></div>
          <h2>Segurança</h2>
          <p>
            Tenha a tranquilidade de saber sempre onde está a sua criança, mesmo
            em lugares movimentados.
          </p>
        </div>
        <div className={Style.card}>
          <div className={Style.icon}><CarfIcon /></div>
          <h2>Cuidado</h2>
          <p>
            Com o Safe Kids, você pode ter toda certeza de que seu filho está
            sempre protegido e cuidado.
          </p>
        </div>
        <div className={Style.card}>
          <div className={Style.icon}><ControlIcon /></div>
          <h2>Controle</h2>
          <p>
            Mantenha o controle sobre a localização de sua criança em tempo real
            e esteja sempre a par de seus movimentos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SafekidsAbout;
