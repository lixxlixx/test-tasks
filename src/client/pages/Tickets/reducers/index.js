import { Map, fromJS, Set }     from 'immutable';
import { LOADING, ADD }         from '../actions';
import { SET_ACTIVE_TRANSFERS } from '../actions/filters';


export const initialState = new Map({
	tickets: null,
	filteredTransfers: new Set(),
	loading: false
});


export function ticketsPage(state = initialState, action) {
	switch (action.type) {
		case ADD:
			return state.set('tickets', fromJS(action.payload.tickets));
		case LOADING:
			return state.set('loading', action.payload.isLoading);
		case SET_ACTIVE_TRANSFERS:
			return state.set('filteredTransfers', action.payload.transfers);
		
		default:
			return state;
	}
}

export default {};