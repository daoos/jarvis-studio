const admin = require('firebase-admin');

module.exports = (data, context) => {
	const { relatedCollectionName, relatedDocId, noteId, text } = data;

	return admin
		.firestore()
		.collection('notes')
		.doc(relatedCollectionName)
		.collection(relatedDocId)
		.doc(noteId)
		.update({
			text: text,
			updatedAt: Date.now()
		});
};
