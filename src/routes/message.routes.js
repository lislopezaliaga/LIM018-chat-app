const { Router } = require('express');
const {
  getAllMessages,
  deleteMessages,
  createMessages,
  updateMessages,
} = require('../controllers/messages.controllers');

const router = Router();

router.get('/messages', getAllMessages);

router.post('/messages', createMessages);

router.delete('/messages', deleteMessages);

router.put('/messages', updateMessages);


module.exports = router;
