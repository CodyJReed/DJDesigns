import React from "react";
import {Link} from "react-router-dom";

import "./SideDrawer.css";

const SideDrawer = props => {
    let drawerClasses = ["side-drawer"];
    if (props.show) {
        drawerClasses = ["side-drawer open"];
    }

    return (
        <nav className={drawerClasses}>
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
        </nav>
    );
};

export default SideDrawer;