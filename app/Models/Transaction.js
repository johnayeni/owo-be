'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Transaction extends Model {
  /**
   * @method users
   *
   * @return {Object}
   */
  users() {
    return this.hasOne('App/Models/User');
  }
}

module.exports = Transaction;
