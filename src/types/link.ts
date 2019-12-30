import { Location } from 'vue-router';

export interface Link {
	icon: string;
	title: string;
	link: Location;
	displayRule?(): boolean;
}
