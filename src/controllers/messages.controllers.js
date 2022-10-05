const client = require('../conexion_db');

const getAllMessages = async (req, res, next) => {
  try {
    const allMessages = await client.query(`SELECT * FROM message`);
    res.json(allMessages.rows);
  } catch (error) {
    next(error);
  }
};
// eslint-disable-next-line consistent-return
const getMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await client.query(
      `SELECT * FROM message WHERE id_mensaje=$1`,
      [id]
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

const createMessages = async (req, res, next) => {
  const { textMessage } = req.body;

  try {
    const result = await client.query(
      `INSERT INTO message(text_message) VALUES ($1) RETURNING*`,
      [textMessage]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteMessages = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await client.query(
      `DELETE FROM message WHERE id_mensaje=$1`,
      [id]
    );
    console.log(result);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'not found' });
    }

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateMessages = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { textMessage } = req.body;

    console.log(id);
    const result = await client.query(
      `UPDATE message SET text_message=$1 WHERE id_mensaje=$2 RETURNING*`,
      [textMessage, id]
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
  getAllMessages,
  getMessage,
  createMessages,
  deleteMessages,
  updateMessages,
};
