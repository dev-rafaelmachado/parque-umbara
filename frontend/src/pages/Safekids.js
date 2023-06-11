import { useEffect, useState } from "react";
import Aside from "../components/services/Aside";
import Bangle from "../components/services/Bangle";
import BangleAdd from "../components/services/BangleAdd";
import Style from "../css/pages/safekids.module.css";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const Safekids = () => {
  const [userCpf, setUserCpf] = useState("");
  const [listBangles, setListBangles] = useState([]);

  const navigate = useNavigate();

  const updateBangleList = () => {
    api
      .post("/list_bangles", { cpf: userCpf })
      .then((response) => {
        setListBangles(response.data);
      })
      .catch((err) => {
        console.error(err.response.data.error);
      });
  };

  useEffect(() => {
    const storedData = localStorage.getItem("@safekids:1.0#user_cpf");
    if (storedData) {
      const userData = JSON.parse(storedData);
      setUserCpf(userData.cpf);
      api
        .post("/list_bangles", { cpf: userData.cpf })
        .then((response) => {
          setListBangles(response.data);
        })
        .catch((err) => {
          console.error(err.response.data.error);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <main className={Style.safekids}>
      <Aside stateLink="safekids" />
      <section className={Style.service}>
        <h1>SafeKids</h1>
        <BangleAdd func={updateBangleList} userCpf={userCpf} />
        <div className={Style.banglesList}>
          <h2>Suas Pulseiras</h2>
          <div className={Style.list}>
            {listBangles &&
              listBangles.map((item, index) => {
                return <Bangle func={updateBangleList} userCpf={userCpf} key={index} id={item.id_bangle} />;
              })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Safekids;
