'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route');

Route.on('/').render('welcome');

Route.group(() => {
  Route.post('register', 'Auth/RegisterController.register').as('register');
  Route.post('login', 'Auth/LoginController.login').as('login');
}).prefix('auth');

Route.group(() => {
  Route.get('user', 'UserController.get');
  Route.get('transactions', 'TransactionController.all');
  Route.post('transaction', 'TransactionController.create');
  Route.put('transaction/:id', 'TransactionController.edit');
  Route.delete('transaction/:id', 'TransactionController.delete');
})
  .prefix('api')
  .middleware('auth');
