import Style from "../../css/components/button.module.css"

const Button = ({ text, onClick }) => {
  return <button onClick={onClick} className={Style.button}> {text} </button>;
};

export default Button;
