import { createSelector } from 'utils/memoization';


export const getApiRequestTimeout = createSelector(
	state => state.config.get('apiRequestTimeout'),
	timeout => timeout,
);


export const getApiMaxContentLength = createSelector(
	state => state.config.get('maxContentLength'),
	maxContentLength => maxContentLength,
);


export const getDefaultLang = createSelector(
	state => state.config.get('defaultLang'),
	defaultLang => defaultLang,
);



export default {};