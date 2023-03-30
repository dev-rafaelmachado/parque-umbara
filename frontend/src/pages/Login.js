import Button from "../components/Form/Button";
import Input from "../components/Form/Input";

import Style from "../css/pages/login.module.css";
import LoginImage from "../static/login_image.png";
const Login = () => {
  return (
    <main className={Style.login}>
      <div className={Style.esq}>
        <h1>Bem vindo(a) de volta!</h1>
        <form>
          <Input type={"email"} placehoader={"E-mail"} />
          <Input type={"password"} placehoader={"Senha"} />
        </form>
        <Button text={"Entrar"} />
        <div className={Style.links}>
          <a href="/">Esqueci minha senha</a>
          <a href="/sign">Não possui conta? Registre-se</a>
        </div>
      </div>
      <div className={Style.dir}>
        <img src={LoginImage} alt="" />
      </div>
    </main>
  );
};

export default Login;
