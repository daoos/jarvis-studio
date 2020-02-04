const admin = require('firebase-admin');

module.exports = (data, context) => {
	// check request is made by an superAdmin
	// if (
	//   context.auth.token.studioRoles < 5 ||
	//   context.auth.token.studioRoles === undefined
	// ) {
	//   return { error: "only super admin can add roles and accounts to user!" };
	// }

	// get user and add Jarvis roles and accounts in custom claim
	admin
		.auth()
		.getUserByEmail(data.email)
		.then(user => {
			admin.auth().updateUser(user.uid, {
				email: data.email ? data.email : user.email,
				displayName: data.displayName ? data.displayName : user.displayName,
				photoURL: data.photoURL ? data.photoURL : user.photoURL
			});

			admin.auth().setCustomUserClaims(user.uid, {
				studioRoles: data.studioRoles,
				accounts: data.accounts
			});

			return {
				message: `Success! Accounts and roles have been  added to ${data.email}.`
			};
		})
		.catch(err => {
			return err;
		});
};
