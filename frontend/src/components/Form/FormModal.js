import { X } from "@phosphor-icons/react";
import api from "../utils/axios";
import { useState } from "react";
import Style from "../../css/components/formmodal.module.css";
import Button from "./Button";
import Input from "./Input";

const FormModal = ({ setIsModalOpen }) => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");

  const [error, setError] = useState(null);

  const HandleRegister = (event) => {
    event.preventDefault();
    if (!cpf || !nome || !password || !email || !gender || !dataNasc) {
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
        setIsModalOpen(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <div className={Style.outModal}>
      <div className={Style.modal}>
        {error && <span className={Style.err}>{error}</span>}
        <X
          onClick={() => {
            setIsModalOpen(false);
          }}
          className={Style.x}
          size={32}
        />
        <h1>Cadastrar Usuário</h1>
        <form>
          <div className={Style.esq}>
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
          </div>
          <div className={Style.dir}>
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
            <Button onClick={HandleRegister} text={"Registrar"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
