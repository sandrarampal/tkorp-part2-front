import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/logo.png";

import styles from "../../styles/components/header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/" style={{ textDecoration: "none" }}>
        <div className={`${styles.homeLink} container`}>
          <Image
            src={logo}
            alt="logo of the association"
            width={80}
            height={80}
          />
          <h1>Pet Owners Association</h1>
        </div>
      </Link>
    </div>
  );
};

export default Header;
