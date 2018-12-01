import { connect }             from 'react-redux';
import Component               from '../components';
import { load }                from '../actions';
import { getTickets, getLoading } from '../selectors';

const mapStateToProps = state => ({
	loading: getLoading(state),
	tickets: getTickets(state)
});


export default connect(mapStateToProps, { onMount: load })(Component);
