import classes from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../Context";
import { BASE_URL } from "../../../constants";

export default function LoginRegister() {
  const { isLoggedIn, setIsLoggedIn } = useContext(Context);
  const [email, setEmail] = useState("");
  const [placeHolder, setPlaceHolder] = useState("Enter your email");
  const navigate = useNavigate();
  function emailChangeHandler(event) {
    setPlaceHolder("Enter your email");
    setEmail(event.target.value);
  }
  async function clickHandler(event) {
    event.preventDefault();
    const isValid = /\S+@\S+\.\S+/.test(email);
    if (email.length === 0 || !isValid) {
      setPlaceHolder("Enter a valid email.");
      setEmail("");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/login-register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email }),
      });
      if (!response.ok) {
        throw error("error occurred while loggin in.");
      } else {
        localStorage.setItem("user", email);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.container}>
      <form method="post" action="/login-register" className={classes.form}>
        {!isLoggedIn && <p>Please enter your email to proceed.</p>}
        <h2 className={classes.title}>Login/Register</h2>
        <input
          type="email"
          name="email"
          placeholder={placeHolder}
          className={classes.input}
          value={email}
          onChange={emailChangeHandler}
          required
        />
        <button className={classes.button} type="submit" onClick={clickHandler}>
          Submit
        </button>
      </form>
    </div>
  );
}
