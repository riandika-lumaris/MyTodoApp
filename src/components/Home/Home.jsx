import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import useFormInput from "../../utilities/useFormInput";

const Home = () => {
  const [task, setTask] = useState([]);
  const newTask = useFormInput("");
  const history = useHistory();

  if (window.localStorage.getItem("user") == null) {
    history.push("/login");
  }

  const token = window.localStorage.getItem("user");

  async function getTaskList() {
    const res = await fetch("/api/task", {
      headers : { "x-access-token" : token }
    });
    if (res.status == 200)
      setTask(await res.json());
  }

  useEffect(() => {
    getTaskList();
  },[])

  const handleTambah = async () => {
    const result = await fetch("/api/task", {
      method : "POST",
      headers : { "x-access-token" : token, "Content-Type" : "application/json" },
      body : JSON.stringify({ nama : newTask.value })
    })
    if (result.status == 200) {
      getTaskList();
    } else {
      window.alert(await result.json());
    }
  }

  const handleToggle = async (id) => {
    const result = await fetch("/api/task", {
      method : "PATCH",
      headers : { "x-access-token" : token, "Content-Type" : "application/json" },
      body : JSON.stringify({ id : id })
    })
    if (result.status == 200) {
      getTaskList();
    } else {
      window.alert(await result.json());
    }
  }

  const handleDelete = async (id) => {
    const result = await fetch("/api/task", {
      method : "DELETE",
      headers : { "x-access-token" : token, "Content-Type" : "application/json" },
      body : JSON.stringify({ id : id })
    })
    if (result.status == 200) {
      getTaskList();
    } else {
      window.alert(await result.json());
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    history.push("/login");
  }

  let items = null;

  if (task.length == 0) {
    items = <li>Tidak ada aktivitas</li>;
  } else {
    items = task.map(item => {
      return (
        <li key={item.kode}>
          {item.status == 0 ? item.nama : <strike>{item.nama}</strike>}
          &nbsp;
          <button onClick={() => handleToggle(item.kode)}>Toggle Status</button>
          <button onClick={() => handleDelete(item.kode)}>Delete</button>
        </li>
      );
    })
  }

  return <main id="mainContent">
    <div className="container">
      <div className="row">
        <div className="col">
           <h3>Home</h3>
           <p><a href="#" onClick={handleLogout}>Logout</a></p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h5>Aktivitas Anda</h5>
          <ul>{items}</ul>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h5>Tambah Aktivitas</h5>
          <div>
            Nama Aktivitas: <input type="text" {...newTask} />
            <button onClick={handleTambah}>Tambah</button>
          </div>
        </div>
      </div>
    </div>
  </main>;
}
export default Home;
