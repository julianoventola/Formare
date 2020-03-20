const ChatUsersController = require('./ChatUsersController');

class RoomController {
  async index(req, res) {
    return res.json({
      ok: true,
    });
  }
}

module.exports = new RoomController();
