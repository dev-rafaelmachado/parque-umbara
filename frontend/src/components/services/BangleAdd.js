import { useState } from "react";
import Style from "../../css/components/bangleadd.module.css";
import api from "../../utils/axios";
const BangleAdd = ({ userCpf, func }) => {
  const [idBangle, setIdBangle] = useState(0);
  const [error, setError] = useState("");

  const handleAddBangle = () => {
    api
      .post("/insert_register", { cpf: userCpf, id_bangle: idBangle })
      .then((response) => {
        func();
      })
      .catch((err) => {
        console.error(err.response.data.error);
        setError(err.response.data.error);
      });
  };

  return (
    <div className={Style.box}>
      {error && <span className={Style.err}>{error}</span>}
      <input
        type="number"
        placeholder="Código da Pulseira"
        className={Style.input}
        onChange={(e) => setIdBangle(e.target.value)}
      />
      <button onClick={handleAddBangle} className={Style.buttton}>
        Cadastrar
      </button>
    </div>
  );
};

export default BangleAdd;
