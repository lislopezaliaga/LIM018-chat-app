const client = require('../conexion_db');

const updateProfile = async (req, res, next) => {
  try {
    const { imgUser, nameUser, idUser } = req.body;

    const result = await client.query(
      `UPDATE users SET imguser=$1, name_user=$2 WHERE id_user=$3 RETURNING*`,
      [imgUser, nameUser, idUser]
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
  updateProfile,
};
