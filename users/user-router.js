import express from "express";
import { addUser } from "./add-user.js";

export const router = express.Router();

router.post("/add-user", (req, res) => {
  const { name, age } = req.body;

  res.json(addUser(name, age));
});
