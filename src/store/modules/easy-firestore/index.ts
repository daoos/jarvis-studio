import { accounts } from '@/store/modules/easy-firestore/accounts';
import { dataModels } from '@/store/modules/easy-firestore/data-models';
import { dataTableDetails } from '@/store/modules/easy-firestore/data-table-details';
import { dataTables } from '@/store/modules/easy-firestore/data-tables';
import { gcpCloudFunctions } from '@/store/modules/easy-firestore/gcpCloudFunctions';
import { getGbqToGbqConfs } from '@/store/modules/easy-firestore/get-gbq-to-gbq-confs';
import { getGbqToGbqRuns } from '@/store/modules/easy-firestore/get-gbq-to-gbq-runs';
import { getGbqToGcsConfs } from '@/store/modules/easy-firestore/get-gbq-to-gcs-confs';
import { getGbqToGcsRuns } from '@/store/modules/easy-firestore/get-gbq-to-gcs-runs';
import { mirrorExcGcsToGbqConfDetails } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gbq-conf-details';
import { mirrorExcGcsToGbqConfs } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gbq-confs';
import { mirrorExcGcsToGbqRuns } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gbq-runs';
import { mirrorExcGcsToGcsConfs } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gcs-confs';
import { mirrorExcGcsToGcsRuns } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gcs-runs';
import { mirrorExcGcsToGcsConfsArchive } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gcs-confs-archive';
import { schemas } from '@/store/modules/easy-firestore/schemas';
import { storageToStorageConfs } from '@/store/modules/easy-firestore/storage-to-storage-confs';
import { storageToStorageRuns } from '@/store/modules/easy-firestore/storage-to-storage-runs';
import { storageToTableConf } from '@/store/modules/easy-firestore/storage-to-table-conf';
import { storageToTableRun } from '@/store/modules/easy-firestore/storage-to-table-run';
import { storageToTablesConfs } from '@/store/modules/easy-firestore/storage-to-tables-confs';
import { storageToTablesRuns } from '@/store/modules/easy-firestore/storage-to-tables-runs';
import { tableToStorageConfs } from '@/store/modules/easy-firestore/table-to-storage-confs';
import { tableToStorageRuns } from '@/store/modules/easy-firestore/table-to-storage-runs';
import { tablesToTablesRun } from '@/store/modules/easy-firestore/tables-to-tables-run';
import { vmLauncherConfs } from '@/store/modules/easy-firestore/vm-launcher-confs';
import { vmLauncherRuns } from '@/store/modules/easy-firestore/vm-launcher-runs';
import { workflowConfs } from '@/store/modules/easy-firestore/workflow-confs';
import { workflowStatus } from '@/store/modules/easy-firestore/workflow-status';

export default [
	gcpCloudFunctions,
	accounts,
	schemas,
	mirrorExcGcsToGcsRuns,
	mirrorExcGcsToGcsConfs,
	mirrorExcGcsToGcsConfsArchive,
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
	storageToStorageRuns,
	storageToTableConf,
	storageToTablesConfs,
	storageToTableRun,
	storageToTablesRuns,
	tablesToTablesRun,
	tableToStorageConfs,
	tableToStorageRuns
];
