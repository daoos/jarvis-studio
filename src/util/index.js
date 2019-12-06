import dataWorkflow from '@/util/data-workflows';
import configuration from '@/util/data-workflows/configuration';
import run from '@/util/data-workflows/run';

export default {
	...dataWorkflow,
	...configuration,
	...run
};
