import { RunStatus } from '@/types';

export const dagRunAirflowUrl = (dag_id: string, run_id: string, execution_date: string) => {
	const airflowRootUrl = process.env.VUE_APP_AIRFLOW_URL;
	const dagIdEncoded = encodeURIComponent(dag_id);
	const runIdEncoded = encodeURIComponent(run_id);
	const executionDateEncoded = encodeURIComponent(execution_date);
	return `${airflowRootUrl}/admin/airflow/graph?dag_id=${dagIdEncoded}&run_id=${runIdEncoded}&execution_date=${executionDateEncoded}`;
};

export const getStatusColor = (status: RunStatus) => {
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
