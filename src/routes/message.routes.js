const { Router } = require('express');
const {
  getAllMessages,
  getMessage,
  deleteMessages,
  createMessages,
  updateMessages,
} = require('../controllers/messages.controllers');

const router = Router();

router.get('/messages', getAllMessages);
router.get('/messages/:id', getMessage);
router.post('/messages', createMessages);

router.delete('/messages/:id', deleteMessages);

router.put('/messages/:id', updateMessages);

module.exports = router;
