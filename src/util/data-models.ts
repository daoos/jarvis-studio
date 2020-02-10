import { BIG_QUERY_URL } from '@/constants/urls/external';

export const getQueryURL = (projectId: string, datasetId: string, tableId: string) => {
	return `${BIG_QUERY_URL}?project=${projectId}&p=${projectId}&d=${datasetId}&t=${tableId}&page=table`;
};
