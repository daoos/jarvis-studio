const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Rôles to manage Jarvis throw from Studio
// Roles hierachy : superAdmin >> admin >> writer >> user >> viewer >> member
// superAdmin = 5, admin = 4, writer = 3, user = 2, viewer = 1, member = 0
// A user can have access to multiple accounts
// The user has necessary the same role for the different accounts

exports.listAllUsers = functions.https.onCall((data, context) => {
  // check request is made by an admin
  // if (context.auth.token.studioRoles.superAdmin !== true) {
  //   return { error: "only super admin can get all users list!" };
  // }

  // List batch of users, 1000 at a time.
  return admin
    .auth()
    .listUsers(1000, data.nextPageToken)
    .then(listUsersResult => {
      listUsersResult.users.forEach(users => {
        console.log("user", users.toJSON());
      });
      // if (listUsersResult.pageToken) {
      //   // List next batch of users.
      //   listAllUsers(listUsersResult.pageToken);
      // }
      return listUsersResult;
    })
    .catch(err => {
      console.log("Error listing users:", error);
      return err;
    });
});

exports.addRolesAndAccounts = functions.https.onCall((data, context) => {
  // check request is made by an superAdmin
  // if (
  //   context.auth.token.studioRoles < 5 ||
  //   context.auth.token.studioRoles === undefined
  // ) {
  //   return { error: "only super admin can add roles and accounts to user!" };
  // }

  // get user and add Jarvis roles and accounts in custom claim
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        studioRoles: data.studioRoles,
        accounts: data.accounts
      });
    })
    .then(() => {
      return {
        message: `Success! Accounts and roles have been  added to ${
          data.email
        }.`
      };
    })
    .catch(err => {
      return err;
    });
});

exports.createUser = functions.https.onCall((data, context) => {
  // check request is made by an superAdmin
  // if (
  //   context.auth.token.studioRoles < 5 ||
  //   context.auth.token.studioRoles === undefined
  // ) {
  //   return { error: "only super admin can add roles and accounts to user!" };
  // }

  // get user and add Jarvis roles and accounts in custom claim
  return admin
    .auth()
    .createUser({
      email: data.email,
      emailVerified: data.emailVerified,
      password: data.password,
      displayName: data.displayName,
      photoURL: data.photoURL,
      disabled: data.disabled
    })
    .then(userRecord => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
      return admin.auth().setCustomUserClaims(userRecord.uid, {
        studioRoles: data.studioRoles,
        accounts: data.accounts
      });
    })
    .then(() => {
      return {
        message: `Success! Accounts and roles have been  added to the new user ${
          data.email
        }.`
      };
    })
    .catch(error => {
      console.log("Error creating new user:", error);
    });
});
