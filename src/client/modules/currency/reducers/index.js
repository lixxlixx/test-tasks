import { Map }               from 'immutable';
import { ADD_RATE, LOADING } from '../actions';


export const initialState = new Map({
	loading: false
});


export function currencyRate(state = initialState, action) {
	
	switch (action.type) {
		
		case ADD_RATE: {
			const { from, to, rate } = action.payload;
			let newState = state;
			
			if ( ! newState.get(from) ) {
				newState = newState.set(from, new Map({}));
			}
			newState = newState.setIn([from, to], rate);
			
			return newState;
		}
		
		case LOADING:
			return state.set('loading', action.payload.isLoading);
		
		default:
			return state;
	}
}


export default {};