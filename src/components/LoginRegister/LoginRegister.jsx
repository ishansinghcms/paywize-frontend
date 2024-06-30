import classes from "./style.module.css";
import { Form, redirect } from "react-router-dom";

export default function LoginRegister() {
  return (
    <div className={classes.container}>
      <Form method="post" className={classes.form}>
        <h2 className={classes.title}>Login/Register</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className={classes.input}
          required
        />
        <button className={classes.button}>Submit</button>
      </Form>
    </div>
  );
}

export async function action({ request, params }) {
  const data = await request.formData();
  const email = data.get("email");
  const response = await fetch("http://localhost:3000/login-register", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: email }),
  });
  if (!response.ok) {
    throw error("error occurred while loggin in.");
  }
  return redirect("/");
}
