const admin = require('firebase-admin');

module.exports = (data, context) => {
	// check request is made by an admin
	// if (context.auth.token.studioRoles.superAdmin !== true) {
	//   return { error: "only super admin can get all users list!" };
	// }

	return admin
		.auth()
		.listUsers(1000, data.nextPageToken)
		.then(listUsersResult => {
			listUsersResult.users.forEach(users => {
				console.log('user', users.toJSON());
			});
			// if (listUsersResult.pageToken) {
			//   // List next batch of users.
			//   listAllUsers(listUsersResult.pageToken);
			// }
			return listUsersResult;
		})
		.catch(err => {
			console.log('Error listing users:', error);
			return err;
		});
};
