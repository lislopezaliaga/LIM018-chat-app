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
  getAllUsers,
  getUser,
  deleteUsers,
  updateUsers,
  getUserEmail,
} = require('../controllers/authUsers.controllers');
const { logoutUser } = require('../controllers/logout.controllers');

const router = Router();

router.post('/messages', createMessages);
router.get('/messages', getAllMessages);
router.get('/messages/:id', getMessage);
router.delete('/messages/:id', deleteMessages);
router.put('/messages/:id', updateMessages);

router.post('/auth/signUp', signUpUsers);
router.post('/auth/logIn', getUserEmail);

router.get('/users', getAllUsers);

router.get('/users/:idUser', getUser);
// router.get('/userEmail/:emailUser', getUserEmail);
router.delete('/users/:idUser', deleteUsers);
router.put('/users/:idUser', updateUsers);

router.post('/logout', logoutUser);
module.exports = router;
