import React from "react";

import logo from "../images/logo.png";
import style from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.navbarContainer}>
      <a href="/">
        <img
          src={logo}
          alt="Air Travel Footprint Logo"
          className={style.logo}
        />
        <span className={style.title}>Air Travel Footprint Calculator</span>
      </a>
    </nav>
  );
};

export default Navbar;
