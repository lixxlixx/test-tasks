import { Map, fromJS }  from 'immutable';
import { ADD }          from '../actions';


export const initialState = new Map({});


export function config(state = initialState, action) {
	
	switch (action.type) {
		
		case ADD: {
			return fromJS(action.payload.config);
		}
		
		default: return state;
	}
}


export default {};