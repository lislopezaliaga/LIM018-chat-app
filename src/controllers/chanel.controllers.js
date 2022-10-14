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
    return res.status(404).json({ message: '*Este canal existe' });
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


// chatGeneral
const getMessageChannelGrl = async (req, res, next) => {
  try {
    const nameChannelGrl = '#channelGeneral';
    const result = await client.query(
      `SELECT * FROM channel WHERE namechanel=$1`,
      [nameChannelGrl]
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


module.exports = {
  createChanel,
  getAllChanels,
  getMessageChannelGrl,
};
