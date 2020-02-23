const admin = require('firebase-admin');

module.exports = (data, context) => {
	const { relatedCollectionName, relatedDocId, text } = data;
	const note = {
		text,
		user: admin
			.firestore()
			.collection('users-social-information')
			.doc('test-user'), // TODO: Use id provided by client
		createdAt: Date.now(),
		updatedAt: null
	};

	return admin
		.firestore()
		.collection('notes')
		.doc(relatedCollectionName)
		.collection(relatedDocId)
		.add(note);
};
