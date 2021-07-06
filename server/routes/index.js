const express = require("express");
const mysql = require("mysql");
const util = require("util");
const jwt = require("jwt-simple");

const router = express.Router();
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "db_aktivitas",
});
connection.query = util.promisify(connection.query);
const mykey = "MYKEY";

router.post("/register", async (req, res) => {
  try {
    const result = await connection.query("insert into user values(?,?)", [
      req.body.username,
      req.body.password,
    ]);
    res.status(200).send("OK");
  } catch (error) {
    res.status(401).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await connection.query(
      "select * from user where username=? and password=?",
      [req.body.username, req.body.password]
    );
    if (result.length > 0) {
      const token = jwt.encode({ user: req.body.username }, mykey);
      res.status(200).send(token);
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

router.get("/task", async (req, res) => {
  try {
    const { user } = jwt.decode(req.headers["x-access-token"], mykey);
    const result = await connection.query(
      "select * from aktivitas where username=?",
      user
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});

router.post("/task", async (req, res) => {
  try {
    const { user } = jwt.decode(req.headers["x-access-token"], mykey);
    const result = await connection.query(
      "insert into aktivitas values(null,?,?,0)",
      [user, req.body.nama]
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});

router.patch("/task", async (req, res) => {
  try {
    const { user } = jwt.decode(req.headers["x-access-token"], mykey);
    const result = await connection.query(
      "update aktivitas set status = (status+1) % 2 where kode=?",
      [req.body.id]
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});

router.delete("/task", async (req, res) => {
  try {
    const { user } = jwt.decode(req.headers["x-access-token"], mykey);
    console.log(req.body.id);
    const result = await connection.query(
      "delete from aktivitas where kode=?",
      [req.body.id]
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});

module.exports = router;
