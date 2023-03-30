import Style from "../../css/panel.module.css";
import img_home from "../../static/home_img.png";

const Panel = () => {
  return (
    <section className={Style.panel}>
      <div className={Style.text}>
        <h1>
          Emoção, diversão, <br /> Parque Umbara.
        </h1>
        <h2>
          O destino perfeito para <br /> o seu próximo passeio!
        </h2>
      </div>
      <div className={Style.img}>
        <img src={img_home} alt="" />
      </div>
    </section>
  );
};

export default Panel;
