const axios = require('axios');

class ParticipantsController {
  async store(req, res) {
    const apiUsers = await axios.get('https://uinames.com/api/?amount=117');
    const newUsers = [];
    if (apiUsers) {
      apiUsers.data.forEach(element => {
        newUsers.push({ name: element.name });
      });
    }

    // INSIRA MONGOOSE CREATE AQUI
    //const users = await MODEL.create(newUsers);

    return res.json(newUsers);
  }
}
module.exports = new ParticipantsController();
