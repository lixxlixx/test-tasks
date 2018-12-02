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


export const getTicketsCurrency = createSelector(
	state => state.config.get('ticketsCurrency'),
	ticketsCurrency => ticketsCurrency,
);


export const getAvailableCurrencies = createSelector(
	state => state.config.get('availableCurrencies'),
	availableCurrencies => availableCurrencies,
);



export default {};