import socketIOClient from "socket.io-client";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

import Style from "../../css/components/modalmap.module.css";
import { X } from "@phosphor-icons/react";
import { Icon } from "leaflet";

export const ModalMap = ({ setModalIsOpen, id }) => {
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState([0, 0]);

  useEffect(() => {
    const socket = socketIOClient("http://127.0.0.1:5000");

    socket.on("connect", () => {
      console.log("Conectado ao servidor SocketIO");
    });

    socket.on("dados_gps", (data) => {
      setMessage(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const custumIcon = new Icon({
    iconUrl:
      "https://cdn-icons-png.flaticon.com/512/57/57003.png?w=826&t=st=1686463074~exp=1686463674~hmac=a98818fe6d73c9a61e459feede5f41f56cac7e141a8d88265877c70e93913129",
    iconSize: [38, 38],
  });
  console.log(message);
  if (message) {
    const dados = JSON.parse(message);
    if (
      dados.id === id &&
      position[0] !== dados.latitude &&
      position[1] !== dados.longitude
    ) {
      setPosition([dados.latitude, dados.longitude]);
    }
  }

  return (
    <div className={Style.outModal}>
      <div className={Style.modal}>
        <X
          onClick={() => {
            setModalIsOpen(false);
          }}
          className={Style.x}
          size={32}
        />
        <MapContainer center={[-25.4501, -49.25182]} zoom={14}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={custumIcon}></Marker>
        </MapContainer>
      </div>
    </div>
  );
};
