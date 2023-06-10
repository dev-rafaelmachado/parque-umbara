import { useState } from "react";

import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

import Button from "../components/Form/Button";
import Input from "../components/Form/Input";

import Style from "../css/pages/sign.module.css";
import SignImg from "../static/sign_image.jpg";

const Sign = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const HandleRegister = () => {
    if (
      !cpf ||
      !nome ||
      !password ||
      !email ||
      !gender ||
      !dataNasc ||
      !cfPassword
    ) {
      setError("Preencha todos os campos");
      return;
    }
    api
      .post("/cadastro", {
        cpf,
        nome,
        senha: password,
        email,
        sexo: gender,
        data_nasc: dataNasc,
      })
      .then((response) => {
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <main className={Style.sign}>
      <div className={Style.esq}>
        <img src={SignImg} alt="" />
      </div>
      <div className={Style.dir}>
        {error && <span className={Style.err}>{error}</span>}
        <h1>Bem vindo(a)!</h1>
        <form>
          <Input type={"text"} placehoader={"Nome"} setState={setNome} />
          <Input type={"text"} placehoader={"CPF"} setState={setCpf} />
          <Input type={"email"} placehoader={"E-mail"} setState={setEmail} />
          <select
            className={Style.gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option>Gênero</option>
            <option value="m">Masculino</option>
            <option value="f">Feminino</option>
            <option value="b">Não Binário</option>
          </select>
          <Input
            type={"date"}
            placehoader={"Data de Nascimento"}
            setState={setDataNasc}
          />
          <Input
            type={"password"}
            placehoader={"Senha"}
            setState={setPassword}
          />
          <Input
            type={"password"}
            placehoader={"Confirmar Senha"}
            setState={setCfPassword}
          />
        </form>
        <Button onClick={HandleRegister} text={"Registrar"} />
      </div>
    </main>
  );
};

export default Sign;
