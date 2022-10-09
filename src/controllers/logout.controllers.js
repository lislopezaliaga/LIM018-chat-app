const { verify } = require('jsonwebtoken');

const cookie = require('cookie');
const logoutUser = async (req, res, next) => {
  const tokenLogin = req.headers.authorization;

  if (!tokenLogin) {
    return res.status(401).json({ error: 'no token' });
  }
  try {
    verify(tokenLogin, 'secret');
    cookie.serialize()
  } catch (error) {
    
  }

};

module.exports = {
  logoutUser,
};
