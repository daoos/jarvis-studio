const admin = require('firebase-admin');

module.exports = (data, context) => {
	const { moduleName, relatedDocId, noteId, text } = data;

	return admin
		.firestore()
		.collection('notes')
		.doc(moduleName)
		.collection(relatedDocId)
		.doc(noteId)
		.update({
			text: text,
			updatedAt: Date.now()
		});
};
