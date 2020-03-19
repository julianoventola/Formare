const Message = require('../models/Message');

class MessageController {
  async store(username, message) {
    await Message.create({ username, message });
  }

  async index(req, res) {
    const { username, order = 1 } = req.query;
    let { data } = req.query;
    // All message by username and data
    if (username && data) {
      let startDate = data + 'T00:00:00.794Z';
      let endDate = data + 'T23:59:59.794Z';

      const messages = await Message.find({
        username: username.trim().toLowerCase(),
        updatedAt: {
          $gt: startDate,
          $lt: endDate,
        },
      });
      return res.json(messages).sort({ createdAt: order });
    }

    // All message by username
    if (username) {
      const messages = await Message.find({
        username: username.trim().toLowerCase(),
      }).sort({ createdAt: order });
      return res.json(messages);
    }

    // All message by data
    if (data) {
      let startDate = data + 'T00:00:00.794Z';
      let endDate = data + 'T23:59:59.794Z';

      const messages = await Message.find({
        updatedAt: {
          $gt: startDate,
          $lt: endDate,
        },
      }).sort({ createdAt: order });
      return res.json(messages);
    }

    // All message

    if (!username) {
      const messages = await Message.find().sort({ createdAt: order });
      return res.json(messages);
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    await Message.deleteOne({ _id: id });
    return res.json({ ok: true });
  }
}

module.exports = new MessageController();
