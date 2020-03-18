// Router for routes
const express = require('express');
const router = express.Router();

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const MessageController = require('./app/controllers/MessageController');

const authMiddleware = require('./app/middleware/auth');

router.get('/', (req, res) => {
  res.send('server is running');
});

router.get('/admin/users', UserController.index);
router.post('/admin/users', UserController.store); // SHOULD be under auth

router.post('/admin/sessions', SessionController.store);

router.use(authMiddleware);

router.get('/admin/chat', MessageController.index);
router.delete('/admin/chat', MessageController.delete);

module.exports = router;
