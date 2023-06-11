import { useState } from "react";
import Style from "../../css/components/bangle.module.css";

import { ReactComponent as AlertIcon } from "../../static/alert_icon.svg";
import { ReactComponent as MapIcon } from "../../static/map_icon.svg";
import { ReactComponent as TrashIcon } from "../../static/trash_icon.svg";
import { ModalMap } from "./ModalMap.js";
import api from "../../utils/axios";

const Bangle = ({ id, func, userCpf }) => {
  const [alert, setAlert] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleRemovebangle = () => {
    api
      .post("/remove_bangle", { cpf: userCpf, id_bangle: id })
      .then((response) => {
        func();
      })
      .catch((err) => {
        console.error(err.response.data.error);
      });
  };

  const handleAlert = () => {
    if (alert)
      api
        .post("alert_off", { cpf: userCpf, id_bangle: id })
        .then((response) => {
          setAlert(false);
        })
        .catch((err) => {
          console.error(err);
        });
    else
      api
        .post("alert_on", { cpf: userCpf, id_bangle: id })
        .then((response) => {
          setAlert(true);
        })
        .catch((err) => {
          console.error(err);
        });
  };

  return (
    <div className={Style.bangle}>
      <h5 className={Style.id}> {id} </h5>
      <div className={Style.actions}>
        <AlertIcon
          onClick={handleAlert}
          className={alert ? `${Style.icons} ${Style.red}` : `${Style.icons}`}
        />
        <MapIcon
          onClick={() => {
            setModalIsOpen(true);
          }}
          className={Style.icons}
        />
        <div onClick={handleRemovebangle} className={Style.trash}>
          <TrashIcon className={Style.icons} />
        </div>
      </div>
      {modalIsOpen && <ModalMap id={id} setModalIsOpen={setModalIsOpen} />}
    </div>
  );
};

export default Bangle;
