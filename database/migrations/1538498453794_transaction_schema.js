'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TransactionSchema extends Schema {
  up() {
    this.create('transactions', (table) => {
      table.increments();
      table.string('type', 80).notNullable();
      table.integer('user_id').notNullable();
      table.float('amount').notNullable();
      table.string('description').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('transactions');
  }
}

module.exports = TransactionSchema;
