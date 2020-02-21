const functions = require('firebase-functions');
const admin = require('firebase-admin');

const listUsersHandler = require('./handlers/list-users');
const getDataModelsHandler = require('./handlers/get-data-models');
const createUserHandler = require('./handlers/create-user');
const updateUserHandler = require('./handlers/update-user');
const deleteUserHandler = require('./handlers/delete-user');

admin.initializeApp();

exports.getDataModels = functions.https.onCall((data, context) => getDataModelsHandler(data, context));
exports.listUsers = functions.https.onCall((data, context) => listUsersHandler(data, context));
exports.createUser = functions.https.onCall((data, context) => createUserHandler(data, context));
exports.updateUser = functions.https.onCall((data, context) => updateUserHandler(data, context));
exports.deleteUser = functions.https.onCall((data, context) => deleteUserHandler(data, context));
