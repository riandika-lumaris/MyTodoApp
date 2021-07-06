import React from "react";
import { useHistory } from "react-router-dom";
import useFormInput from "../../utilities/useFormInput";

const Login = () => {
  const username = useFormInput("");
  const password = useFormInput("");
  const history = useHistory();

  const handleSubmit = async () => {
    const result = await fetch("/api/login", {
      method : "POST",
      headers : { "Content-Type" : "application/json" },
      body : JSON.stringify({ username : username.value , password : password.value })
    });
    if (result.status == 200) {
      window.localStorage.setItem("user", await result.text());
      history.push("/");
    } else {
      window.alert("Gagal login");
    }
  }

  return <main id="mainContent">
    <div className="container">
      <div className="row">
        <h3>Login</h3>
      </div>
      <div className="row">
        <div>
          Username : <input type="text" {...username} /><br />
          Password : <input type="password" {...password} /><br />
          <button onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  </main>;
}
export default Login;
