const jwt = require('jsonwebtoken');
const { verify } = require('jsonwebtoken');
// const { serialize } = require('cookie');
const bcrypt = require('bcrypt');
const client = require('../conexion_db');

const updateUsers = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const { nameUser, emailUser, passwordUser, statusUser } = req.body;
    const hashedPass = await bcrypt.hash(passwordUser, 10);
    // console.log(idUser);
    const result = await client.query(
      `UPDATE users SET name_user=$1, email_user=$2, password_user=$3,status_user=$4 WHERE id_user=$5 RETURNING*`,
      [nameUser, emailUser, hashedPass, statusUser, idUser]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'not found' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
const updateStatusUser = async (req, res, next) => {
  try {
    const { statusUser, idUser } = req.body;

    const result = await client.query(
      `UPDATE users SET status_user=$1 WHERE id_user=$2 RETURNING*`,
      [statusUser, idUser]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'not found' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const signUpUsers = async (req, res, next) => {
  const { nameUser, emailUser, passwordUser } = req.body;
  const imgUser =
    'https://res.cloudinary.com/dv95g7xon/image/upload/v1666386036/unfcoqck6jietlr7jwhi.png';
  const hashedPass = await bcrypt.hash(passwordUser, 10);
  try {
    const result = await client.query(
      `INSERT INTO users(name_user, email_user, password_user, imguser)  VALUES ($1, $2, $3, $4) RETURNING*`,
      [nameUser, emailUser, hashedPass, imgUser]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const tokenValidate = async (req, res, next) => {
  try {
    // const allMessages = await client.query(`SELECT * FROM users`);

    const tokenLogin = req.headers.authorization;

    const user = verify(tokenLogin, 'secret');

    // console.log(user);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      imguser: user.imguser,
    });
  } catch (error) {
    return res.status(404).json({ error: 'invalid token' });
    // next(error);
  }
};

const usersConnected = async (req, res, next) => {
  try {
    const status = 1;
    const result = await client.query(
      `SELECT * FROM users WHERE status_user=$1`,
      [status]
    );

    if (result.rows.length === 0) {
      // throw new Error();
      return res.status(404).json({ message: 'not found' });
    }
    return res.json(result.rows);
  } catch (error) {
    next(error);
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

const loginUser = async (req, res, next) => {
  try {
    const { emailUser, passwordUser } = req.body;
    const result = await client.query(
      `SELECT * FROM users WHERE email_user=$1 `,
      [emailUser]
    );
    if (result.rows.length === 0) {
      // throw new Error();
      return res.status(404).json({ message: 'Correo inválido' });
    }
    if (result.rowCount > 0) {
      const isSamePass = await bcrypt.compare(
        passwordUser,
        result.rows[0].password_user
      );
      if (isSamePass) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            // emailUser,
            id: result.rows[0].id_user,
            email: result.rows[0].email_user,
            name: result.rows[0].name_user,
            status: result.rows[0].status_user,
            imguser: result.rows[0].imguser,
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

        return res.json(token);
      }
      return res.status(404).json({ message: 'Correo o contraseña inválidas' });
    }
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
    // console.log(result);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'not found' });
    }

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUpUsers,
  tokenValidate,
  getUser,
  deleteUsers,
  updateUsers,
  loginUser,
  usersConnected,
  updateStatusUser,
};
