const express = require("express");
const cors = require("cors");
const user = require("./users");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/adduser", async (req, res) => {
  const username = req.body["name"];
  const password = req.body["password"];
  const emailId = req.body["email"];

  if (!username) {
    return res.status(400).json({
      status: 400,
      result: {
        message: "Username is required",
      },
    });
  }

  if (!password) {
    return res.status(400).json({
      status: 400,
      result: {
        message: "Password is required",
      },
    });
  }

  if (!emailId) {
    return res.status(400).json({
      status: 400,
      result: {
        message: "Email is required",
      },
    });
  }

  const checkEmailQuery = `SELECT * FROM users WHERE email = '${emailId}'`;
  const existingUser = await user.query(checkEmailQuery);

  if (existingUser.rows.length > 0) {
    return res.status(400).json({
      status: 400,
      result: {
        message: "User already exists.",
      },
    });
  }

  const insertStmt = `INSERT INTO users (name, password, email) VALUES ('${username}', '${password}', '${emailId}') returning *`;
  try {
    // Execute the insertion query
    result = await user.query(insertStmt);

    res.status(200).json({
      status: 200,
      result: result.rows[0],
    });
  } catch (err) {
    console.error("Error adding user to the database:", err);
    res
      .status(500)
      .json({ error: { message: "Something went wrong,please try again!" } });
  }
});

app.get("/users", (req, res) => {
  user
    .query("SELECT * FROM users")
    .then((resp) => {
      res.status(200).json({
        result: { status: 200, users: resp.rows },
      });
    })
    .catch((err) => {
      res.status(400).json({
        result: { status: 400, message: "Error fetching users" },
      });
    });
});

app.post("/login", (req, res) => {
  const password = req.body["password"];
  const emailId = req.body["email"];
  if (!password || !emailId) {
    return res.status(400).json({
      result: { status: 400, message: "Email and password are required." },
    });
  }
  user
    .query(`SELECT * FROM users WHERE email = '${emailId.toString()}'`)
    .then((resp) => {
      if (resp.rows.length === 0) {
        return res.status(404).json({
          result: { status: 404, message: "User not found." },
        });
      }

      const userFromDb = resp.rows[0];

      if (userFromDb.password !== password.toString()) {
        // Password does not match
        return res.status(401).json({
          result: { status: 401, message: "Wrong Credentials!" },
        });
      }
      return res.status(200).json({
        status: 200,
        result: userFromDb,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        result: { status: 500, message: err },
      });
    });
});

app.post("/add_todo", async (req, res) => {
  const id = req.body["id"];
  const task = req.body["task"];
  const user_id = req.body["user_id"];
  const description = req.body["description"];
  const created_date = req.body["created_date"];
  const is_completed = req.body["is_completed"];

  if (id) {
    const update_query = `
      UPDATE todo
      SET task = '${task}', user_id = '${user_id}', description = '${description}', is_completed = '${is_completed}'
      WHERE id = '${id}'`;

    try {
      await user.query(update_query);

      res.status(200).json({
        status: 200,
        result: { message: "Todo updated successfully." },
      });
    } catch (updateErr) {
      return res
        .status(500)
        .json({ error: "Something went wrong, Todo not updated" });
    }
  } else {
    if (!task) {
      return res.status(500).json({
        result: { status: 500, message: "Please add task." },
      });
    }
    if (!user_id) {
      return res.status(500).json({
        result: { status: 500, message: "user_id is required." },
      });
    }

    const insert_query = `INSERT INTO todo (task, user_id, description, created_date, is_completed) VALUES ('${task}', '${user_id}', '${description}', '${created_date}', '${is_completed}')`;

    try {
      await user.query(insert_query);

      res.status(200).json({
        status: 200,
        result: { message: "Todo added successfully." },
      });
    } catch (err) {
      console.error("Error adding user to the database:", err);
      res
        .status(500)
        .json({ error: { message: "Something went wrong , Task not added" } });
    }
  }
});

app.get("/todos/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  if (!user_id) {
    return res.status(400).json({
      result: { status: 400, message: "user_id is required." },
    });
  }
  const current_date = new Date().toLocaleDateString("en-GB");
  user
    .query(
      `SELECT * FROM todo WHERE user_id = '${user_id}' AND created_date = '${current_date}'`
    )
    .then((resp) => {
      return res.status(200).json({
        status: 200,
        result: resp.rows,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        result: { status: 500, message: err },
      });
    });
});

app.post("/delete_todo", async (req, res) => {
  const id = req.body["id"];
  const user_id = req.body["user_id"];
  if (!id) {
    return res.status(400).json({
      result: { status: 400, message: "id is required." },
    });
  }
  const delete_query = `DELETE FROM todo WHERE id = '${id}'`;
  try {
    await user.query(delete_query);
    const result = await user.query(
      `SELECT * FROM todo WHERE user_id = '${user_id}'`
    );
    return res.status(200).json({
      status: 200,
      result: result.rows,
    });
  } catch (err) {
    console.error("Error adding user to the database:", err);
    res
      .status(500)
      .json({ error: { message: "Something went wrong , Task not deleted" } });
  }
});

app.post("/updatecompleted", async (req, res) => {
  const id = req.body["id"];
  const is_completed = req.body["is_completed"];
  if (!id) {
    return res.status(400).json({
      result: { status: 400, message: "id is required." },
    });
  }

  const update_query = `UPDATE todo SET is_completed = '${is_completed}' WHERE id = '${id}' returning *`;
  try {
    const result = await user.query(update_query);
    return res.status(200).json({
      status: 200,
      result: result.rows[0],
    });
  } catch (err) {
    console.error("Error adding user to the database:", err);
    res
      .status(500)
      .json({ error: { message: "Something went wrong , Task not added" } });
  }
});

app.post("/filterTodos", async (req, res) => {
  const user_id = req.body["user_id"];
  const is_completed = req.body["is_completed"];
  const task = req.body["task"];
  const created_date = req.body["created_date"];
  if (!user_id) {
    return res.status(400).json({
      result: { status: 400, message: "user_id is required." },
    });
  }

  let search_query = `SELECT * FROM todo WHERE user_id = '${user_id}'`;

  if (created_date) {
    search_query += ` AND created_date = '${created_date}'`;
  }

  if (task) {
    search_query += ` AND task ILIKE '%${task}%'`;
  }

  if (is_completed !== null) {
    search_query += ` AND is_completed = '${is_completed}'`;
  }
  try {
    const result = await user.query(search_query);
    return res.status(200).json({
      status: 200,
      result: result.rows,
    });
  } catch (err) {
    res.status(500).json({ error: { message: "Something went wrong" } });
  }
});

app.put("/resetPassword", async (req, res) => {
  const email = req.body["email"];
  const password = req.body["password"];
  if (!email) {
    return res.status(400).json({
      status: 400,
      result: {
        message: "Email is required",
      },
    });
  }
  if (!password) {
    return res.status(400).json({
      status: 400,
      result: {
        message: "Password is required",
      },
    });
  }

  const update_query = `UPDATE users SET password = '${password}' WHERE email = '${email}' returning *`;

  try {
    const result = await user.query(update_query);
    return res.status(200).json({
      status: 200,
      result: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      result: {
        message: "Something went wrong,Password not updated.",
      },
    });
  }
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
