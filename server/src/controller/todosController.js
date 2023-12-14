const db = require("../postgres");

const addTodo = async (req, res) => {
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
      await db.query(update_query);

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
      await db.query(insert_query);

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
};

const findTodo = async (req, res) => {
  const user_id = req.params.user_id;
  if (!user_id) {
    return res.status(400).json({
      result: { status: 400, message: "user_id is required." },
    });
  }
  const current_date = new Date().toLocaleDateString("en-GB");
  db.query(
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
};

const deleteTodo = async (req, res) => {
  const id = req.body["id"];
  const user_id = req.body["user_id"];
  if (!id) {
    return res.status(400).json({
      result: { status: 400, message: "id is required." },
    });
  }
  const delete_query = `DELETE FROM todo WHERE id = '${id}'`;
  try {
    await db.query(delete_query);
    const result = await db.query(
      `SELECT * FROM todo WHERE user_id = '${user_id}'`
    );
    return res.status(200).json({
      status: 200,
      result: result.rows,
    });
  } catch (err) {
    console.error("Something went wrong:", err);
    res
      .status(500)
      .json({ error: { message: "Something went wrong , Task not deleted" } });
  }
};

const updateCompleted = async (req, res) => {
  const id = req.body["id"];
  const is_completed = req.body["is_completed"];
  if (!id) {
    return res.status(400).json({
      result: { status: 400, message: "id is required." },
    });
  }

  const update_query = `UPDATE todo SET is_completed = '${is_completed}' WHERE id = '${id}' returning *`;
  try {
    const result = await db.query(update_query);
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
};

const filterTodos = async (req, res) => {
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
    const result = await db.query(search_query);
    return res.status(200).json({
      status: 200,
      result: result.rows,
    });
  } catch (err) {
    res.status(500).json({ error: { message: "Something went wrong" } });
  }
};

module.exports = {
  addTodo,
  findTodo,
  deleteTodo,
  updateCompleted,
  filterTodos,
};
