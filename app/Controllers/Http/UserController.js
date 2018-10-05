'use strict';

class UserController {
  async get({ auth, response }) {
    const user = await auth.getUser();
    return response.status(200).json({ message: 'User details gotten', user });
  }
}

module.exports = UserController;
