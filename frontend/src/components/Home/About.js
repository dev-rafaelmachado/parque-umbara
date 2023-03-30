import Style from "../../css/components/about.module.css";
import about_img from "../../static/about_img.png"


const About = () => {
  return (
    <section id="about" className={Style.about}>
      <div className={Style.text}>
        <div className={Style.block}>
          <h1>Diversão para toda a família:</h1>
          <p>O Parque Umbara oferece atrações para todas as idades, desde as mais tranquilas até as mais radicais.</p>
        </div>
        <div className={Style.block}>
          <h1>Aventuras emocionantes:</h1>
          <p>Com montanhas-russas, brinquedos aquáticos, jogos eletrônicos e muito mais, o Parque Umbara é o lugar perfeito para quem busca adrenalina.</p>
        </div>
        <div className={Style.block}>
          <h1>Shows e eventos especiais:</h1>
          <p>O parque conta com diversos shows e eventos ao longo do ano, como festivais de música, apresentações de dança e espetáculos temáticos.</p>
        </div>
        <div className={Style.block}>
          <h1>Comida deliciosa:</h1>
          <p>O Parque Umbara oferece uma variedade de opções de alimentação, desde lanches rápidos até restaurantes com pratos elaborados, para que você possa recarregar as energias entre as atrações.</p>
        </div>
      </div>
      <div className={Style.img}>
        <img src={about_img} alt="" />
      </div>
    </section>
  );
};

export default About;
