import express from "express";
import { v4 as uuidv4 } from "uuid";
import {
  addUser,
  fetchUserById,
  updateUserById,
  deleteUserById,
  fetchAllUsers,
} from "./utils.js";

export const router = express.Router();

router.post("/add", (req, res) => {
  const { name, age } = req.body;

  const uuid = uuidv4();

  res.json(addUser(name, age, uuid));
});

router.get("/all", (req, res) => {
  const users = fetchAllUsers();

  res.json(users);
});

router.get("/:uuid", (req, res) => {
  const uuid = req.params["uuid"];

  // function to fetch the respec. user form the DB.
  const user = fetchUserById(uuid);

  res.json(user);
});

router.put("/:uuid", (req, res) => {
  const { name, age } = req.body;
  const uuid = req.params["uuid"];

  // function to update the user details in the DB.
  const result = updateUserById(uuid, name, age);

  res.json(result);
});

router.delete("/:uuid", (req, res) => {
  const uuid = req.params["uuid"];

  // function to delete the user from the DB.
  const result = deleteUserById(uuid);

  res.json(result);
});
