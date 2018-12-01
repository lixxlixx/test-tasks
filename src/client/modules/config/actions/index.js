export const ADD = 'CONFIG/ADD';

export const add = config => ({
	type: ADD,
	payload: { config }
});
