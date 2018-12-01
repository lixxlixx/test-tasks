import { combineReducers } from 'redux';
import { config }          from 'modules/config/reducers';
import { ticketsPage }     from 'pages/Tickets/reducers';


export default combineReducers({
	config,
	ticketsPage
});