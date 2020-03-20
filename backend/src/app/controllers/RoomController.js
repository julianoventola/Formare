const ChatUsersController = require('./ChatUsersController');

class RoomController {
  async index(req, res) {
    const allUsers = ChatUsersController.getAllUsers();
    /**
     * ATENÇÃO
     * Condição para o balanceamento:
     * - A sala com mais usuários deve ultrapassar 3 unidades da menor sala
     *
     * Para os teste você deve alterar:
     * - imaginaryUsers: colocando o nome(numero) e a sala em que ele esta
     * - Room: colocando a soma de quantos usuarios tem em cada sala individual
     * - totalUsers: colocando a soma total de usuários ao todo
     *
     */

    const imaginaryUsers = [
      { user: '1', room: '1' },
      { user: '2', room: '1' },
      { user: '3', room: '1' },
      { user: '4', room: '1' },
      { user: '5', room: '1' },
      { user: '6', room: '1' },
      { user: '7', room: '1' },
      { user: '8', room: '1' },
      { user: '9', room: '2' },
      { user: '10', room: '2' },
      { user: '11', room: '2' },
      { user: '12', room: '2' },
      { user: '13', room: '2' },
      { user: '14', room: '3' },
      { user: '15', room: '3' },
      { user: '16', room: '3' },
      { user: '17', room: '3' },
      { user: '18', room: '3' },
      { user: '19', room: '4' },
    ];
    const Room = [
      { users: 8, room: 1 },
      { users: 5, room: 2 },
      { users: 5, room: 3 },
      { users: 1, room: 4 },
    ];

    const sumByRoom = [
      Room[0].users,
      Room[1].users + Room[0].users,
      Room[2].users + Room[1].users + Room[0].users,
      Room[3].users + Room[2].users + Room[1].users + Room[0].users,
    ];

    const diffRoomToIdeal = [];

    let Room1 = 0;
    let Room2 = 0;
    let Room3 = 0;
    let Room4 = 0;

    const overflow = [];
    let maxUsersInRoom = 1;
    let minUsersInRoom = 100;
    let idealUsersInRoom = 0;
    let totalUsers = 19;

    // Count every user for every room in the real user array
    /*if (allUsers.length > 0) {
      for (const user of allUsers) {
        if (user.room === '1') {
          Room1 += 1;
        }
        if (user.room === '2') {
          Room2 += 1;
        }
        if (user.room === '3') {
          Room3 += 1;
        }
        if (user.room === '4') {
          Room4 += 1;
        }
      }

      totalUsers = Room1 + Room2 + Room3 + Room4;
        if (totalUsers > 7) {
          idealUsersInRoom = totalUsers / 4;
        }
    }*/

    // Check max and min users in the rooms
    for (const room of Room) {
      if (room.users > maxUsersInRoom) {
        maxUsersInRoom = room.users;
      }
      if (room.users < minUsersInRoom) {
        minUsersInRoom = room.users;
      }
    }

    // Check if balance is necessary
    if (maxUsersInRoom > minUsersInRoom + 3 && totalUsers > 8) {
      idealUsersInRoom = parseInt(totalUsers / 4);
      // Check how many user are over OR less than the ideal number for each room
      for (let index = 0; index < 4; index++) {
        if (Room[index].users > idealUsersInRoom) {
          let room = index + 1;
          let diff = Room[index].users - idealUsersInRoom;
          diffRoomToIdeal.push({ room, qty: +diff });
        } else {
          let room = index + 1;
          let diff = idealUsersInRoom - Room[index].users;
          diffRoomToIdeal.push({ room, qty: -diff });
        }
      }

      // Check how many users are on "overflow"
      for (const item of diffRoomToIdeal) {
        if (item.room == '1' && item.qty > 0) {
          let total = sumByRoom[0];
          for (let index = idealUsersInRoom; index < total; index++) {
            overflow.push(imaginaryUsers[index]);
          }
        }
        if (item.room == '2' && item.qty > 0) {
          let total = sumByRoom[1];
          for (
            let index = sumByRoom[0] + idealUsersInRoom;
            index < total;
            index++
          ) {
            overflow.push(imaginaryUsers[index]);
          }
        }
        if (item.room == '3' && item.qty > 0) {
          let total = sumByRoom[2];
          for (
            let index = sumByRoom[1] + idealUsersInRoom;
            index < total;
            index++
          ) {
            overflow.push(imaginaryUsers[index]);
          }
        }
        if (item.room == '4' && item.qty > 0) {
          let total = sumByRoom[3];
          for (
            let index = sumByRoom[2] + idealUsersInRoom;
            index < total;
            index++
          ) {
            overflow.push(imaginaryUsers[index]);
          }
        }

        // Put 'overflow' users in missing rooms
        if (item.qty < 0 && overflow.length > 0) {
          for (
            let index = idealUsersInRoom + item.qty;
            index < idealUsersInRoom;
            index++
          ) {
            overflow[index].room = `${item.room}`;
          }
        }
      }
    }

    return res.json({
      recommended: idealUsersInRoom,
      diffRoomToIdeal,
      correctRooms: overflow,
    });
  }
}

module.exports = new RoomController();
