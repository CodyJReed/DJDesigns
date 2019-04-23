import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import "./App.css"

import NavBar from "./NavBar/NavBar";
import SideDrawer from "./SideDrawer/SideDrawer";
import Backdrop from "./Backdrop/Backdrop";
import Home from "./Home/Home"
import ProductList from "./ProductList/ProductList"

class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div className="wrapper">
        <BrowserRouter>

          <NavBar drawerClickHandler={this.drawerToggleClickHandler} />

          <SideDrawer show={this.state.sideDrawerOpen} />
          {backdrop}
          
          <Route path="/" exact component={Home}/>

          <Route path="/products" component={ProductList}/>

        </BrowserRouter>
      </div>
    );
  }
}


export default App;
