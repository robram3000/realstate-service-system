import React from "react";
import { FaHome, FaUser, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar__logo}>
                <Link to="/">Betheland</Link>
            </div>

            <ul className={styles.navbar__links}>
                <li>
                    <Link to="/">
                        <FaHome /> Home
                    </Link>
                </li>
                <li>
                    <Link to="/about">
                        <FaUser /> About
                    </Link>
                </li>
                <li>
                    <Link to="">
                        <FaUser /> 
                    </Link>
                </li>
            </ul>

            <div className={styles.navbar__auth}>
                <Link to="/login" className={styles.authLink}>
                    <FaSignInAlt /> Login
                </Link>
                <Link to="/register" className={styles.authLink}>
                    <FaUserPlus /> Register
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;