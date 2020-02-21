const admin = require('firebase-admin');
var flatMap = require('array.prototype.flatmap');

module.exports = (data, context) => {
	// check request is made by an admin
	// if (context.auth.token.studioRoles.superAdmin !== true) {
	//   return { error: "only super admin can get all users list!" };
	// }

	// if (!userAccounts) return 'You have to provide user accounts';

	// const { userAccounts } = data;
	const dataModelsCollection = 'gbq-table-preview';
	const getCollection = collectionName =>
		admin
			.firestore()
			.collection(collectionName)
			.get();

	return getCollection(dataModelsCollection)
		.then(snapshot => {
			let models = [];
			const subCollections = flatMap(snapshot.docs, doc => ({
				id: doc.id,
				subCollectionIds: doc.data().sub_collections
			}));

			for (let index = 0; index < subCollections.length; index++) {
				for (let j = 0; j < subCollections[index].subCollectionIds.length; j++) {
					const id = subCollections[index].subCollectionIds[j];
					const doc = subCollections[index];
					// TODO: Use .where('account', 'in', ['000040'])
					// const element = admin
					// 	.firestore()
					// 	.collection(`${dataModelsCollection}/${doc.id}/${id}`)
					// 	.get();

					models.push(`${dataModelsCollection}/${doc.id}/${id}`);
				}
			}

			return models;
		})
		.catch(error => {
			return error;
		});
};
