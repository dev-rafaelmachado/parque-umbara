import Style from "../../css/components/button.module.css"

const Button = ({ text }) => {
  return <button className={Style.button}> {text} </button>;
};

export default Button;
