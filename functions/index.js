const functions = require('firebase-functions');
const admin = require('firebase-admin');

const listUsersHandler = require('./handlers/user/list-users');
const createUserHandler = require('./handlers/user/create-user');
const updateUserHandler = require('./handlers/user/update-user');
const deleteUserHandler = require('./handlers/user/delete-user');
const insertNoteHandler = require('./handlers/notes/insert-note');

admin.initializeApp();

exports.listUsers = functions.https.onCall((data, context) => listUsersHandler(data, context));
exports.createUser = functions.https.onCall((data, context) => createUserHandler(data, context));
exports.updateUser = functions.https.onCall((data, context) => updateUserHandler(data, context));
exports.deleteUser = functions.https.onCall((data, context) => deleteUserHandler(data, context));
exports.insertNote = functions.https.onCall((data, context) => insertNoteHandler(data, context));
