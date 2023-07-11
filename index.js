import express from "express";
import { router } from "./users/user-router.js";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
  console.log("req: ", req);
  res.send("Success");
});

app.use("/", router);

app.listen(PORT, () => {
  console.log("Server listening at PORT: ", PORT);
});
