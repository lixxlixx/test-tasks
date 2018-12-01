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
	state => {
		const tickets = state.ticketsPage.get('tickets');
		
		if (tickets) {
			return tickets.sortBy(ticket => ticket.get('price'));
		}
	},
	data => data
);



export default {};