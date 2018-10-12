'use strict';

const { validate } = use('Validator');
const Transaction = use('App/Models/Transaction');

class TransactionController {
  // get all user transactions
  async getAll({ response, auth }) {
    const user = await auth.getUser();
    const transactions = await user.transactions().fetch();
    return response.status(200).json({
      message: 'Successfully retrieved transactions',
      transactions,
    });
  }

  // create a new transaction
  async create({ request, response, auth }) {
    const user = await auth.getUser();

    const validation = await validate(request.all(), {
      type: 'required, type',
      amount: 'required, amount',
    });

    if (validation.fails()) {
      return response.status(401).json({ messages: validation.messages() });
    }

    const transaction = await Transaction.create({
      type: request.input('type'),
      user_id: user.id,
      amount: Number(request.input('amount')),
    });

    if (!transaction) {
      return response.status(401).json({ message: 'Could not create transaction' });
    }

    if (transaction.type === 'income') {
      user.balance = user.balance + transaction.amount;
      user.total_income = user.total_income + transaction.amount;
    }

    if (transaction.type === 'expense') {
      user.balance = user.balance - transaction.amount;
      user.total_expenses = user.total_expense + transaction.amount;
    }

    await user.save();

    return response.status(200).json({
      message: 'You have successfull created a trasaction',
      transaction,
    });
  }

  // edit a transaction
  async edit({ request, response, auth, params }) {
    const { id } = params;

    const user = await auth.getUser();

    const transaction = await Transaction.find(id);

    if (!transaction) {
      return response.status(401).json({ message: 'Could not edit transaction' });
    }

    if (transaction.type === 'income') {
      user.balance = user.balance - transaction.amount;
      user.total_income = user.total_income - transaction.amount;
    }

    if (transaction.type === 'expense') {
      user.balance = user.balance + transaction.amount;
      user.total_expenses = user.total_expense - transaction.amount;
    }

    await user.save();

    await transaction.merge({ ...request.all() });

    await transaction.save();

    if (transaction.type === 'income') {
      user.balance = user.balance + transaction.amount;
      user.total_income = user.total_income + transaction.amount;
    }

    if (transaction.type === 'expense') {
      user.balance = user.balance - transaction.amount;
      user.total_expenses = user.total_expense + transaction.amount;
    }

    await user.save();

    return response.status(200).json({ message: 'Transaction edited', transaction });
  }

  // delete a transaction
  async delete({ response, auth, params }) {
    const { id } = params;

    const user = await auth.getUser();
    const transaction = await Transaction.find(id);

    if (!transaction) {
      return response.status(401).json({ message: 'Could not delete transaction' });
    }

    await transaction.delete();

    if (transaction.type === 'income') {
      user.balance = user.balance - transaction.amount;
      user.total_income = user.total_income - transaction.amount;
    }

    if (transaction.type === 'expense') {
      user.balance = user.balance + transaction.amount;
      user.total_expenses = user.total_expense - transaction.amount;
    }

    await user.save();

    return response.status(200).json({ message: 'Transaction deleted', transaction });
  }
}

module.exports = TransactionController;
