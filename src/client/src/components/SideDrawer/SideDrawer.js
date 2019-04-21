import React from "react";

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
                    <a href="/spi_dev">Products</a>
                </li>
                <li>
                    <a href="/spi_dev">Contact</a>
                </li>
                <li>
                    <a href="/spi_dev">Sign In</a>
                </li>
            </ul>
        </nav>
    );
};

export default SideDrawer;