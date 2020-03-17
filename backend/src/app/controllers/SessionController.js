let Yup = require('yup');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json({ error: 'Username not found' });
    }

    let passwordMatch = password;

    if (!(await bcrypt.compare(passwordMatch, user.password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { _id } = user;

    return res.json({
      user,
      // id de usuário, string de payload, tempo para espirar
      token: jwt.sign({ _id }, 'palavrachave', {
        expiresIn: '7d',
      }),
    });
  }
}

module.exports = new SessionController();
