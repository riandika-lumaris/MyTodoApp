import React from "react";
import useFormInput from "../../utilities/useFormInput";
import { useHistory } from "react-router-dom";

const Register = () => {
  const username = useFormInput("");
  const password = useFormInput("");
  const confpassword = useFormInput("");
  const history = useHistory();

  const handleSubmit = async () => {
    const result = await fetch("/api/register", {
      method : "POST",
      headers : { "Content-Type" : "application/json" },
      body : JSON.stringify({ username : username.value , password : password.value })
    });
    if (result.status == 200) {
      history.push("/login");
    }
  }

  return <main id="mainContent">
    <div className="container">
      <div className="row">
        <h3>Register</h3>
      </div>
      <div className="row">
        <div>
          Username : <input type="text" {...username} /><br />
          Password : <input type="password" {...password} /><br />
          Confirm Password : <input type="password" {...confpassword} /><br />
          <button onClick={handleSubmit}>Register</button>
        </div>
      </div>
    </div>
  </main>;
}
export default Register;
