import api from "../utils/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Form/Button";
import Input from "../components/Form/Input";

import Style from "../css/pages/login.module.css";
import LoginImage from "../static/login_image.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    api
      .post("/login", { email, senha: password })
      .then((response) => {
        navigate("/safekids");
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <main className={Style.login}>
      <div className={Style.esq}>
        <h1>Bem vindo(a) de volta!</h1>
        {error && <span className={Style.err}>{error}</span>}
        <form>
          <Input type={"email"} placehoader={"E-mail"} setState={setEmail} />
          <Input
            type={"password"}
            placehoader={"Senha"}
            setState={setPassword}
          />
        </form>
        <Button onClick={handleClick} text={"Entrar"} />
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
