const express = require("express");
const cors = require("cors");
const db = require("./postgres");
const usersRouter = require("./routes/users");
const todosRouter = require("./routes/todos");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", usersRouter);
app.use("/todos", todosRouter);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
