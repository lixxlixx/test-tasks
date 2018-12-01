import { connect } from 'react-redux';
import Component   from '../components';
import { load }    from '../actions';
import {
	setTransferFilter,
	setTransferFilterOnly,
	applyToAllTransfers
}                  from '../actions/filters';
import {
	getFilteredTickets,
	getLoading,
	getAvailableTransfers,
	getActiveTransfers,
	
}                  from '../selectors';


const mapStateToProps = state => ({
	loading: getLoading(state),
	tickets: getFilteredTickets(state),
	availableTransfers: getAvailableTransfers(state),
	activeTransfers: getActiveTransfers(state),
});


const mapDispatchToProps = {
	onMount: load,
	onChangeTransfer: setTransferFilter,
	onChangeTransferOnly: setTransferFilterOnly,
	onApplyToAllTransfers: applyToAllTransfers
};


export default connect(mapStateToProps, mapDispatchToProps)(Component);
