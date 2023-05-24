import axios from "axios";
import { useEffect, useState } from "react";
import Aside from "../components/services/Aside";
import FormModal from "../components/Form/FormModal";
import Style from "../css/pages/manager.module.css";

const Manager = () => {
 const [data, setData] = useState(null)
 const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
    .get("http://127.0.0.1:5000/clients")
    .then((response) => {
      setData(response.data)
    })
    .catch((err) => {
      console.log(err)
    });
  }, [])
  
  return (
    <main className={Style.manager}>
      <h2>Gerenciamento Dos usuários</h2>
      <Aside stateLink="manager" />
      <section className={Style.service}>
        <div className={Style.box}>
          <h1>Lista de usuários</h1>
          {data && <table className={Style.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Sexo</th>
                <th>Data Nascimento</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.cpf}>
                  <td>{user.nome}</td>
                  <td>{user.cpf}</td>
                  <td>{user.email}</td>
                  <td>{(user.sexo).toUpperCase()}</td>
                  <td>{(() => {
                  const date = new Date(user.data_nasc);
                  const day = date.getUTCDate();
                  const month = date.getUTCMonth() + 1;
                  const year = date.getUTCFullYear();
                  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
                })()}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
          }
        </div>
        <div className={Style.btn}>
          <button onClick={() => {setIsModalOpen(true)}} className={Style.button}>Cadastrar manualmente</button>
        </div>
        {isModalOpen && <FormModal setIsModalOpen={setIsModalOpen} />}
      </section>
    </main>
  );
};

export default Manager;
