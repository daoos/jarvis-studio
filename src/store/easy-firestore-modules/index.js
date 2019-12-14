import gcpcloudfunctions from '@/store/easy-firestore-modules/gcpcloudfunctions';
import accounts from '@/store/easy-firestore-modules/accounts';
import schemas from '@/store/easy-firestore-modules/schemas';
import mirrorExcGcsToGcsRuns from '@/store/easy-firestore-modules/mirror-exc-gcs-to-gcs-runs';
import mirrorExcGcsToGcsConfs from '@/store/easy-firestore-modules/mirror-exc-gcs-to-gcs-confs';
import mirrorExcGcsToGbqRuns from '@/store/easy-firestore-modules/mirror-exc-gcs-to-gbq-runs';
import mirrorExcGcsToGbqConfs from '@/store/easy-firestore-modules/mirror-exc-gcs-to-gbq-confs';
import mirrorExcGcsToGbqConfDetails from '@/store/easy-firestore-modules/mirror-exc-gcs-to-gbq-conf-details';
import getGbqToGcsRuns from '@/store/easy-firestore-modules/get-gbq-to-gcs-runs';
import getGbqToGcsConfs from '@/store/easy-firestore-modules/get-gbq-to-gcs-confs';
import getGbqToGbqConfs from '@/store/easy-firestore-modules/get-gbq-to-gbq-confs';
import getGbqToGbqRuns from '@/store/easy-firestore-modules/get-gbq-to-gbq-runs';
import vmLauncherConfs from '@/store/easy-firestore-modules/vm-launcher-confs';
import vmLauncherRuns from '@/store/easy-firestore-modules/vm-launcher-runs';
import workflowConfs from '@/store/easy-firestore-modules/workflow-confs';
import workflowStatus from '@/store/easy-firestore-modules/workflow-status';
import dataModels from '@/store/easy-firestore-modules/data-models';
import dataTables from '@/store/easy-firestore-modules/data-tables';
import dataTableDetails from '@/store/easy-firestore-modules/data-table-details';
import singleDoc from '@/store/easy-firestore-modules/single-doc';
import storageToStorageConfs from '@/store/easy-firestore-modules/storage-to-storage-confs';
import storageToStorageConf from '@/store/easy-firestore-modules/storage-to-storage-conf';
import storageToStorageRuns from '@/store/easy-firestore-modules/storage-to-storage-runs';
import storageToStorageRun from '@/store/easy-firestore-modules/storage-to-storage-run';
import storageToTableConf from '@/store/easy-firestore-modules/storage-to-table-conf';
import storageToTablesConfs from '@/store/easy-firestore-modules/storage-to-tables-confs';
import storageToTableRun from '@/store/easy-firestore-modules/storage-to-table-run';
import storageToTablesRuns from '@/store/easy-firestore-modules/storage-to-tables-runs';
import tablesToTablesConf from '@/store/easy-firestore-modules/tables-to-tables-conf';
import tablesToTablesRun from '@/store/easy-firestore-modules/tables-to-tables-run';
import tableToStorageConfs from '@/store/easy-firestore-modules/table-to-storage-confs';
import tableToStorageRuns from '@/store/easy-firestore-modules/table-to-storage-runs';

export default [
	gcpcloudfunctions,
	accounts,
	schemas,
	mirrorExcGcsToGcsRuns,
	mirrorExcGcsToGcsConfs,
	mirrorExcGcsToGbqRuns,
	mirrorExcGcsToGbqConfs,
	mirrorExcGcsToGbqConfDetails,
	getGbqToGcsRuns,
	getGbqToGcsConfs,
	getGbqToGbqConfs,
	getGbqToGbqRuns,
	vmLauncherConfs,
	vmLauncherRuns,
	workflowConfs,
	workflowStatus,
	dataModels,
	dataTables,
	dataTableDetails,
	storageToStorageConfs,
	storageToStorageConf,
	storageToStorageRuns,
	storageToStorageRun,
	storageToTableConf,
	storageToTablesConfs,
	storageToTableRun,
	storageToTablesRuns,
	tablesToTablesConf,
	tablesToTablesRun,
	tableToStorageConfs,
	tableToStorageRuns,
	singleDoc
];
