import Style from "../../css/components/input.module.css"

const Input = ({ placehoader, type, setState }) => {
  return <input type={type} className={Style.input} placeholder={placehoader} onChange={e => setState(e.target.value)}/>;
};

export default Input;
