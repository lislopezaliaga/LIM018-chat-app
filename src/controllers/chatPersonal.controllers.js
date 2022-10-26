const client = require('../conexion_db');

const createMessagesPersonal = async (req, res, next) => {
  const {
    textmessagePersonal,
    idUserSendPersonal,
    nameUserSendPersonal,
    dateTimePersonal,
    nameUserRecivePersonal,
    idUserRecivePersonal,
  } = req.body;
  //   id_mensaje, textmessage, id_usersend, name_usersend, date_time, name_userrecive, id_userrecive)
  try {
    const result = await client.query(
      `INSERT INTO directmessage( textmessage, id_usersend,name_usersend, date_time, name_userrecive,id_userrecive) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*`,
      [
        textmessagePersonal,
        idUserSendPersonal,
        nameUserSendPersonal,
        dateTimePersonal,
        nameUserRecivePersonal,
        idUserRecivePersonal,
      ]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getAllMessagesPersonal = async (req, res, next) => {
  try {
    const allMessages = await client.query(`SELECT * FROM directmessage`);
    res.json(allMessages.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMessagesPersonal,
  getAllMessagesPersonal,
};
