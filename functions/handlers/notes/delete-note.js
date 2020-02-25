const admin = require('firebase-admin');

module.exports = (data, context) => {
	const { relatedCollectionName, relatedDocId, noteId } = data;

	return admin
		.firestore()
		.collection('notes')
		.doc(relatedCollectionName)
		.collection(relatedDocId)
		.doc(noteId)
		.delete();
};
