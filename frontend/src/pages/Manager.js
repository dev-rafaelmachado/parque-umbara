import Aside from "../components/services/Aside";
import Style from "../css/pages/manager.module.css";

const Manager = () => {
  const users = [
    {
      nome: "João",
      cpf: "123.456.789-00",
      email: "joao@example.com",
      senha: "jj1234",
    },
    {
      nome: "Marina",
      cpf: "987.654.321-00",
      email: "marina@example.com",
      senha: "marimari",
    },
    {
      nome: "Luiz",
      cpf: "456.123.789-00",
      email: "luiz@example.com",
      senha: "luiz321",
    },
    {
      nome: "Ana",
      cpf: "111.222.333-44",
      email: "ana@example.com",
      senha: "ana1234",
    },
    {
      nome: "Lucas",
      cpf: "222.333.444-55",
      email: "lucas@example.com",
      senha: "lucas1234",
    },
    {
      nome: "Carla",
      cpf: "333.444.555-66",
      email: "carla@example.com",
      senha: "carla1234",
    },
    {
      nome: "Pedro",
      cpf: "444.555.666-77",
      email: "pedro@example.com",
      senha: "pedro1234",
    },
    {
      nome: "Isabela",
      cpf: "555.666.777-88",
      email: "isabela@example.com",
      senha: "isabela1234",
    },
  ];

  return (
    <main className={Style.manager}>
      <Aside stateLink="manager" />
      <section className={Style.service}>
        <div className={Style.box}>
          <h1>Lista de usuários</h1>
          <table className={Style.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Senha</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.cpf}>
                  <td>{user.nome}</td>
                  <td>{user.cpf}</td>
                  <td>{user.email}</td>
                  <td>{user.senha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={Style.btn}><button className={Style.button}>Cadastrar manualmente</button></div>
      </section>
    </main>
  );
};

export default Manager;
