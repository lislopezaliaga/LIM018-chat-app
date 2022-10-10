const { Router } = require('express');
const {
  getAllMessages,
  getMessage,
  deleteMessages,
  createMessages,
  updateMessages,
} = require('../controllers/messages.controllers');

const {
  signUpUsers,
  tokenValidate,
  getUser,
  deleteUsers,
  updateUsers,
  getUserEmail,
  getAllUser,
} = require('../controllers/authUsers.controllers');
const { logoutUser } = require('../controllers/logout.controllers');
const {
  createChanel,
  getAllChanels,
} = require('../controllers/chanel.controllers');

const router = Router();

router.post('/messages', createMessages);
router.get('/messages', getAllMessages);
router.get('/messages/:id', getMessage);
router.delete('/messages/:id', deleteMessages);
router.put('/messages/:id', updateMessages);

router.post('/auth/signUp', signUpUsers);
router.post('/auth/logIn', getUserEmail);

router.get('/users', tokenValidate);
router.get('/allUsers', getAllUser);

router.get('/users/:idUser', getUser);
// router.get('/userEmail/:emailUser', getUserEmail);
router.delete('/users/:idUser', deleteUsers);
router.put('/users/:idUser', updateUsers);

router.post('/logout', logoutUser);

// rutas de chanels
router.post('/chanel', createChanel);
router.get('/chanel', getAllChanels);

module.exports = router;
