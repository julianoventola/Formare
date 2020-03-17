const User = require('../models/User');
const bcrypt = require('bcryptjs');
let Yup = require('yup');

class UserController {
  async index(req, res) {
    const users = await User.find();
    res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let { username, password } = req.body;

    const userExists = await User.findOne({ username: username });

    if (userExists) {
      return res.status(401).json({ error: 'Username already exists' });
    }

    password = await bcrypt.hash(password, 8);
    const users = await User.create({ username, password });
    return res.json(users);
  }
}

module.exports = new UserController();
