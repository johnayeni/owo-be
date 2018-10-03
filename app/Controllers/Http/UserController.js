'use strict';

class UserController {
  async get({ auth, response }) {
    const user = await auth.getUser();
    return response.json({ status: 200, message: 'User details gotten', user });
  }
}

module.exports = UserController;
