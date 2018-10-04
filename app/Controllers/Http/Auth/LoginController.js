'use strict';

class LoginController {
  async login({ request, auth, response }) {
    const { email, password } = request.all();
    const { token } = await auth.attempt(email, password);
    return response.status(200).json({ message: 'Logged in successfully', token });
  }
}

module.exports = LoginController;
