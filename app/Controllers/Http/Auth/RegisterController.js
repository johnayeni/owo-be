'use strict';

const { validate } = use('Validator');
const User = use('App/Models/User');

class RegisterController {
  async register({ request, response }) {
    const validation = await validate(request.all(), {
      fullname: 'required, fullname',
      email: 'required|email|unique:users, email',
      password: 'required',
    });

    if (validation.fails()) {
      return response.json({ status: 401, messages: validation.messages() });
    }

    const user = await User.create({
      fullname: request.input('fullname'),
      email: request.input('email'),
      password: request.input('password'),
    });

    if (!user) {
      return response.json({ status: 401, message: 'Could not create user' });
    }

    return response.json({ status: 200, message: 'You have successfull created an account' });
  }
}

module.exports = RegisterController;
