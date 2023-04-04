import Button from "../components/Form/Button";
import Input from "../components/Form/Input";

import Style from "../css/pages/sign.module.css";
import SignImg from "../static/sign_image.jpg"

const Sign = () => {
  return (
    <main className={Style.sign}>
      <div className={Style.esq}>
        <img src={SignImg} alt="" />
      </div>
      <div className={Style.dir}>
        <h1>Bem vindo(a)!</h1>
        <form>
          <Input type={"text"} placehoader={"Nome"} />
          <Input type={"text"} placehoader={"CPF"} />
          <Input type={"email"} placehoader={"E-mail"} />
          <Input type={"password"} placehoader={"Senha"} />
          <Input type={"password"} placehoader={"Confirmar Senha"} />
        </form>
        <Button text={"Registrar"} />
      </div>
    </main>
  );
};

export default Sign;
