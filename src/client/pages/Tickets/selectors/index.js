import { createSelector }   from 'utils/memoization';


/**
 * select loading status
 */
export const getLoading = createSelector(
	state => state.ticketsPage.get('loading'),
	loading => loading
);


/**
 * Select tickets data
 */
export const getTickets = createSelector(
	state => state.ticketsPage.get('tickets'),
	data => data
);



export default {};