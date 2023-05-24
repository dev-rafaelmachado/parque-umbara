import styles from "../../css/components/mobilemenu.module.css";

import { List, X } from "@phosphor-icons/react";

import { useState } from "react";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.mobileMenu}>
      {isOpen ? (
        <X
          className={styles.menuButton}
          onClick={toggleMenu}
          size={"3rem"}
          color="#000"
        />
      ) : (
        <List
          size={"3rem"}
          color="#000"
          className={styles.menuButton}
          onClick={toggleMenu}
        />
      )}

      {isOpen && (
        <ul className={styles.menuList}>
          <Link className={styles.link} to={"/login"}>
            Log In
          </Link>
          <Link className={styles.link} to={"/sign"}>
            Sign Up
          </Link>
        </ul>
      )}
    </div>
  );
};

export default MobileMenu;
