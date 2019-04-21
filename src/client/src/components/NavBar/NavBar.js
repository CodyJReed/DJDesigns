import React from "react";

import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "./NavBar.css";

import logo from "../../img/logo.svg"

const NavBar = props => (
  <header className="navbar">
    <nav className="navbar__navigation">
      <div className="navbar__logo">
        <a href="/spi_dev">
          <img className="dj__icon" src={logo} alt="logo" />
          <span className="dj__brand">DJ Designs</span>
        </a>
      </div>
      <div className="spacer" />
      <div className="navbar__toggle-button">
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
      <div className="navbar_navigation-items">
        <ul>
          <li>
            <a href="/spi_dev">Products</a>
          </li>
          <li>
            <a href="/spi_dev">Contact Us</a>
          </li>
          <li className="login-btn">
            <a href="/spi_dev" >Sign In</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default NavBar;