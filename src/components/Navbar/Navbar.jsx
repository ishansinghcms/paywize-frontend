import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../../Context";

import classes from "./style.module.css";
import LoginRegister from "../LoginRegister/LoginRegister";
export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(Context);
  const checkUser = localStorage.getItem("user");

  useEffect(() => {
    if (checkUser) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [checkUser]);

  function logoutHandler() {
    const existingUser = localStorage.getItem("user");
    if (existingUser) localStorage.removeItem("user");
    setIsLoggedIn(false);
  }

  return (
    <>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li className={classes.item}>
            <Link to="/" className={classes.link}>
              Dashboard
            </Link>
          </li>
          <li className={classes.item}>
            <Link to="/AI" className={classes.link}>
              AI Chat
            </Link>
          </li>
          <li className={classes.item}>
            <Link to="/login-register" className={classes.link}>
              Login/Register
            </Link>
          </li>
          <li className={classes.item}>
            <button className={classes.button} onClick={logoutHandler}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      {!isLoggedIn && <LoginRegister />}
      {isLoggedIn && <Outlet />}
    </>
  );
}
