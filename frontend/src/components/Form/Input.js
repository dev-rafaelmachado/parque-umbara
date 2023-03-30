import Style from "../../css/components/input.module.css"

const Input = ({ placehoader, type }) => {
  return <input type={type} className={Style.input} placeholder={placehoader}></input>;
};

export default Input;
