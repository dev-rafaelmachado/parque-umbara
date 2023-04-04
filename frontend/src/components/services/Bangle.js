import Style from "../../css/components/bangle.module.css";

import { ReactComponent as AlertIcon } from "../../static/alert_icon.svg";
import { ReactComponent as MapIcon } from "../../static/map_icon.svg";
import { ReactComponent as TrashIcon } from "../../static/trash_icon.svg";

const Bangle = ({ id }) => {
  return (
    <div className={Style.bangle}>
      <h5 className={Style.id}> {id} </h5>
      <div className={Style.actions}>
        <AlertIcon className={Style.icons} />
        <MapIcon className={Style.icons}/>
        <div className={Style.trash}><TrashIcon className={Style.icons}/></div>
        
      </div>
    </div>
  );
};

export default Bangle;
