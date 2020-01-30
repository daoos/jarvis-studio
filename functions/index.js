const functions = require('firebase-functions');
const admin = require('firebase-admin');

const listAllUsersHandler = require('./handlers/list-all-users');
const addRolesAndAccountsHandler = require('./handlers/add-roles-and-accounts');
const createUserHandler = require('./handlers/create-user');
const deleteUserHandler = require('./handlers/delete-user');

admin.initializeApp();

exports.listAllUsers = functions.https.onCall((data, context) => listAllUsersHandler(data, context));
exports.addRolesAndAccounts = functions.https.onCall((data, context) => addRolesAndAccountsHandler(data, context));
exports.createUser = functions.https.onCall((data, context) => createUserHandler(data, context));
exports.deleteUser = functions.https.onCall((data, context) => deleteUserHandler(data, context));
