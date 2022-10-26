const { Router } = require('express');
const {
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
  loginUser,
  usersConnected,
  updateStatusUser,
} = require('../controllers/authUsers.controllers');

const { logoutUser } = require('../controllers/logout.controllers');
const {
  createChanel,
  getAllChanels,
  getMessageChannelGrl,
  deleteChannel,
  updateChannel,
} = require('../controllers/chanel.controllers');

const { deleteCloudinary } = require('../controllers/cloudinary.controllers');
const { updateProfile } = require('../controllers/updateProfile.controllers');
const {
  createMessagesPersonal,
  getAllMessagesPersonal,
} = require('../controllers/chatPersonal.controllers');

const router = Router();

router.post('/messages', createMessages);
router.post('/general/messages', getMessage);
router.delete('/messages/:id', deleteMessages);
router.put('/messages/:id', updateMessages);

router.post('/auth/signUp', signUpUsers);
router.post('/auth/logIn', loginUser);

router.get('/users', tokenValidate);
router.get('/usersConnected', usersConnected);

router.get('/users/:idUser', getUser);
// router.get('/userEmail/:emailUser', getUserEmail);
router.delete('/users/:idUser', deleteUsers);
router.put('/users/:idUser', updateUsers);
router.put('/user/active', updateStatusUser);

router.post('/logout', logoutUser);

// rutas de chanels
router.post('/chanel', createChanel);
router.get('/chanel', getAllChanels);
router.get('/channelGrl', getMessageChannelGrl);
router.delete('/channel/:idChannel', deleteChannel);
router.put('/channel/update', updateChannel);

// rutas de mensajes directos
router.post('/direct/messages', createMessagesPersonal);
router.get('/direct/messages', getAllMessagesPersonal);
// cloudinary
router.delete('/:public_id', deleteCloudinary);

// profile
router.put('/profile', updateProfile);

module.exports = router;
