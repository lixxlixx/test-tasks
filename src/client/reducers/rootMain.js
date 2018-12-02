import { combineReducers } from 'redux';
import { config }          from 'modules/config/reducers';
import { currencyRate }    from 'modules/currency/reducers';
import { ticketsPage }     from 'pages/Tickets/reducers';


export default combineReducers({
	config,
	currencyRate,
	ticketsPage
});