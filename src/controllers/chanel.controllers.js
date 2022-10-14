const client = require('../conexion_db');

const createChanel = async (req, res, next) => {
  const { namechanel, idDueño } = req.body;

  try {
    const result = await client.query(
      `INSERT INTO channel(namechanel, id_creator) VALUES ($1, $2) RETURNING*`,
      [namechanel, idDueño]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getAllChanels = async (req, res, next) => {
  try {
    const allMessages = await client.query(`SELECT * FROM channel`);
    res.json(allMessages.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createChanel,
  getAllChanels,
};
