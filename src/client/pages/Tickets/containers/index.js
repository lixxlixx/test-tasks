import { connect }         from 'react-redux';
import { getExchangeRate } from 'modules/currency/selectors';
import {
	getAvailableCurrencies,
	getTicketsCurrency
}                          from 'modules/config/selectors';
import Component           from '../components';
import { load }            from '../actions';
import {
	setTransferFilter,
	setTransferFilterOnly,
	applyToAllTransfers,
	setCurrency
}                          from '../actions/filters';
import {
	getFilteredTickets,
	getLoading,
	getAvailableTransfers,
	getActiveTransfers,
	getCurrency,
	getTickets
}                          from '../selectors';


const mapStateToProps = state => {
	const filterCurrency = getCurrency(state);
	const ticketsCurrency = getTicketsCurrency(state);
	const totalTickets = getTickets(state);
	
	
	return {
		loading: getLoading(state),
		tickets: getFilteredTickets(state),
		availableCurrencies: getAvailableCurrencies(state),
		exchangeRate: getExchangeRate(state, ticketsCurrency, filterCurrency),
		availableTransfers: getAvailableTransfers(state),
		activeTransfers: getActiveTransfers(state),
		totalCount: totalTickets ? totalTickets.count() : 0,
		filterCurrency
	};
};


const mapDispatchToProps = {
	onMount: load,
	onChangeTransfer: setTransferFilter,
	onChangeTransferOnly: setTransferFilterOnly,
	onApplyToAllTransfers: applyToAllTransfers,
	onSetCurrency: setCurrency
};


export default connect(mapStateToProps, mapDispatchToProps)(Component);
