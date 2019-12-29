export const dagRunAirflowUrl = (dag_id, run_id, execution_date) => {
	const airflowRootUrl = 'https://v48232bfe51601b92-tp.appspot.com';
	const dagIdEncoded = encodeURIComponent(dag_id);
	const runIdEncoded = encodeURIComponent(run_id);
	const executionDateEncoded = encodeURIComponent(execution_date);
	return `${airflowRootUrl}/admin/airflow/graph?dag_id=${dagIdEncoded}&run_id=${runIdEncoded}&execution_date=${executionDateEncoded}`;
};

export const getStatusColor = status => {
	let statusColor;

	switch (status) {
		case 'SUCCESS':
			statusColor = 'green';
			break;
		case 'FAILED':
			statusColor = 'red';
			break;
		case 'RUNNING':
			statusColor = 'light-blue';
			break;
		default:
			statusColor = 'orange';
			break;
	}
	return statusColor;
};

export default {
	dagRunAirflowUrl,
	getStatusColor
};
