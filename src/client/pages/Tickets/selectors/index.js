import { createSelector } from 'utils/memoization';


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
		
		if ( tickets ) {
			return tickets.sortBy(ticket => ticket.get('price'));
		}
	},
	data => data
);


/**
 * Select transfers from tickets
 * Show only uniques and sort
 */
export const getAvailableTransfers = createSelector(
	state => {
		const tickets = state.ticketsPage.get('tickets');
		if ( tickets ) {
			return tickets
				.toSet()
				.map(ticket => ticket.get('stops'))
				.sort();
		}
	},
	data => data
);


/**
 * Select active transfers
 */
export const getActiveTransfers = createSelector(
	state => state.ticketsPage.get('filteredTransfers'),
	data => data
);


/**
 * Filter tickets by active transfers
 *
 * Select all tickets
 * Select activeTransfers
 *
 * Filter
 *
 * @private
 */
const _getFilteredTickets = createSelector(
	getTickets,
	getActiveTransfers,
	(tickets, activeTransfers) => tickets && tickets
		.filter(ticket => activeTransfers.has(ticket.get('stops')))
);


/**
 * Memoize filter results
 */
export const getFilteredTickets = createSelector(
	_getFilteredTickets,
	filteredTickets => filteredTickets
);


/**
 * Get filter currency
 */
export const getCurrency = createSelector(
	state => state.ticketsPage.get('filterCurrency'),
	currency => currency
);



export default {};