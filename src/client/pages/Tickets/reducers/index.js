import { Map, fromJS }  from 'immutable';
import { LOADING, ADD } from '../actions';


export const initialState = new Map({
	tickets: null,
	loading: false
});


export function ticketsPage(state = initialState, action) {
	switch (action.type) {
		case ADD: return state.set('tickets', fromJS(action.payload.tickets));
		case LOADING: return state.set('loading', action.payload.isLoading);
		
		default: return state;
	}
}

export default {};