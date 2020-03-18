import moment from 'moment';

export const oneDayLimit = (timestamp: string): string => {
	const now = moment(Date.now());
	const reference = moment(timestamp);
	const oneHourAfter = moment(timestamp).add(1, 'hours');
	const oneDayAfter = moment(timestamp).add(1, 'day');

	if (now.isAfter(oneDayAfter)) return reference.format('YYYY/MM/DD - HH:mm');
	return now.isAfter(oneHourAfter) ? reference.format('HH:mm') : reference.fromNow();
};
