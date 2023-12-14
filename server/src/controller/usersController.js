const db = require("../postgres");

const addUser = async (req, res) => {
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
  const existingUser = await db.query(checkEmailQuery);

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
    result = await db.query(insertStmt);

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
};

const getUsers = (req, res) => {
  db.query("SELECT * FROM users")
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
};

const login = (req, res) => {
  const password = req.body["password"];
  const emailId = req.body["email"];
  if (!password || !emailId) {
    return res.status(400).json({
      result: { status: 400, message: "Email and password are required." },
    });
  }
  db.query(`SELECT * FROM users WHERE email = '${emailId.toString()}'`)
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
};

const resetPassword = async (req, res) => {
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
    const result = await db.query(update_query);
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
};

module.exports = {
  addUser,
  getUsers,
  login,
  resetPassword,
};
