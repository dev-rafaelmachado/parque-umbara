import Style from "../../footer.module.css";
import { ReactComponent as WhatsappIcon } from "../../static/whatsapp_icon.svg";
import { ReactComponent as TwiterIcon } from "../../static/twiter_icon.svg";
import { ReactComponent as InstaIcon } from "../../static/insta_icon.svg";
import { ReactComponent as FaceIcon } from "../../static/facebook_icon.svg";

const Footer = () => {
  return (
    <footer id="contato" className={Style.footer}>
      <p>Copyright 2023</p>
      <div className={Style.social}>
        <a href="">
          <WhatsappIcon className={Style.icon} />{" "}
        </a>
        <a href="">
          <TwiterIcon className={Style.tt} />
        </a>
        <a href="">
          <InstaIcon className={Style.icon} />
        </a>
        <a href="">
          <FaceIcon className={Style.icon} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
