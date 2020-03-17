// Router for routes
const express = require('express');
const router = express.Router();

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

const authMiddleware = require('./app/middleware/auth');

router.get('/', (req, res) => {
  res.send('server is running');
});

router.get('/admin/users', UserController.index);
router.post('/admin/users', UserController.store);

router.post('/admin/sessions', SessionController.store);

module.exports = router;
