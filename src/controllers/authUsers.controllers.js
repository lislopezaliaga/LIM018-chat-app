const jwt = require('jsonwebtoken');
const { verify } = require('jsonwebtoken');
const { serialize } = require('cookie');
const client = require('../conexion_db');

const signUpUsers = async (req, res, next) => {
  const { nameUser, emailUser, passwordUser } = req.body;

  try {
    const result = await client.query(
      `INSERT INTO users(name_user, email_user, password_user)  VALUES ($1, $2, $3) RETURNING*`,
      [nameUser, emailUser, passwordUser]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    // const allMessages = await client.query(`SELECT * FROM users`);

    const tokenLogin = req.headers.authorization;

    const user = verify(tokenLogin, 'secret');

    console.log(user);

    res.json({ name: user.name, email: user.email, status: user.status });
  } catch (error) {
    return res.status(404).json({ error: 'invalid token' });
    // next(error);
  }
};
// // eslint-disable-next-line consistent-return
const getUser = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const result = await client.query(`SELECT * FROM users WHERE id_user=$1`, [
      idUser,
    ]);

    if (result.rows.length === 0) {
      // throw new Error();
      return res.status(404).json({ message: 'not found' });
    }
    return res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getUserEmail = async (req, res, next) => {
  try {
    const { emailUser, passwordUser } = req.body;
    const result = await client.query(
      `SELECT * FROM users WHERE email_user=$1 AND password_user=$2`,
      [emailUser, passwordUser]
    );
    if (result.rows.length === 0) {
      // throw new Error();
      return res.status(404).json({ message: 'Email or Password invalid' });
    }

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        // emailUser,
        email: result.rows[0].email_user,
        name: result.rows[0].name_user,
        status: result.rows[0].status_user,
      },
      'secret'
    );

    // const serialized = serialize('tokenLogin', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'none',
    //   maxAge: 1000 * 60 * 60 * 24 * 30,
    //   path: '/',
    // });
    // console.log('cookie', serialized);
    // http://localhost:3000
    // res.setHeader('Set-Cookie', token);
    res.cookie('cookieName', token);
    console.log();

    return res.json(token);
  } catch (error) {
    next(error);
  }
};

const deleteUsers = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const result = await client.query(`DELETE FROM users WHERE id_user=$1`, [
      idUser,
    ]);
    console.log(result);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'not found' });
    }

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateUsers = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const { nameUser, emailUser, passwordUser, statusUser } = req.body;

    console.log(idUser);
    const result = await client.query(
      `UPDATE users SET name_user=$1, email_user=$2, password_user=$3,status_user=$4 WHERE id_user=$5 RETURNING*`,
      [nameUser, emailUser, passwordUser, statusUser, idUser]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'not found' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUpUsers,
  getAllUsers,
  getUser,
  deleteUsers,
  updateUsers,
  getUserEmail,
};
