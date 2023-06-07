import Aside from "../components/services/Aside";
import Bangle from "../components/services/Bangle";
import BangleAdd from "../components/services/BangleAdd";
import { Map } from "../components/services/Map";
import Style from "../css/pages/safekids.module.css";

const Safekids = () => {
  const bangle = [
    "1234-5678-9012",
    "9876-5432-1098",
    "2468-1357-5790",
    "5555-4444-3333",
  ];
  return (
    <main className={Style.safekids}>
      <Aside stateLink="safekids" />
      <section className={Style.service}>
        <h1>SafeKids</h1>
        <BangleAdd />
        <div className={Style.banglesList}>
          <h2>Suas Pulseiras</h2>
          <div className={Style.list}>
            {bangle.map((id, index) => {
              return <Bangle key={index} id={id} />;
            })}
          </div>
        <Map />
        </div>
      </section>
    </main>
  );
};

export default Safekids;
