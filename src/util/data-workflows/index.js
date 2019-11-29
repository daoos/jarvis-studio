export const getWorkflowName = name => {
	const items = {
		gbqToGcsConfs: 'Table to Storage'
	};

	return items[name];
};

export default {
	getWorkflowName
};
