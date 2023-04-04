import Style from "../../css/components/bangleadd.module.css"
const BangleAdd = () => {
  return <div className={Style.box}>
    <input type="text" placeholder="Código da Pulseira" className={Style.input}/>
    <button className={Style.buttton}>Cadastrar</button>
  </div>;
};

export default BangleAdd;
