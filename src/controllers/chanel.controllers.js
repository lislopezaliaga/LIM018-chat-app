const client = require('../conexion_db');

const createChanel = async (req, res, next) => {
  const { nameChanel, idDueño } = req.body;

  try {
    const result = await client.query(
      `INSERT INTO chanel(name, id_dueño) VALUES ($1, $2) RETURNING*`,
      [nameChanel, idDueño]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getAllChanels = async (req, res, next) => {
  try {
    const allMessages = await client.query(`SELECT * FROM chanel`);
    res.json(allMessages.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createChanel,
  getAllChanels,
};
