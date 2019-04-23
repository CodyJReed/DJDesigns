import React from "react";
import {Link} from "react-router-dom"

import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "./NavBar.css";

import logo from "../../img/logo.svg"

const NavBar = props => (
  <header className="navbar">
    <nav className="navbar__navigation">
      <div className="navbar__logo">
        <Link to="/">
          <img className="dj__icon" src={logo} alt="logo" />
          <span className="dj__brand">DJ Designs</span>
        </Link>
      </div>
      <div className="spacer" />
      <div className="navbar__toggle-button">
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
      <div className="navbar_navigation-items">
        <ul>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default NavBar;