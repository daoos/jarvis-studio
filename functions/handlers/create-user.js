const admin = require('firebase-admin');

module.exports = (data, context) => {
	// check request is made by an superAdmin
	// if (
	//   context.auth.token.studioRoles < 5 ||
	//   context.auth.token.studioRoles === undefined
	// ) {
	//   return { error: "only super admin can add roles and accounts to user!" };
	// }

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
			return admin.auth().setCustomUserClaims(userRecord.uid, {
				studioRoles: data.studioRoles,
				accounts: data.accounts
			});
		})
		.then(() => {
			return {
				message: `Success! Accounts and roles have been  added to the new user ${data.email}.`
			};
		})
		.catch(error => {
			console.log('Error creating new user:', error);
		});
};
