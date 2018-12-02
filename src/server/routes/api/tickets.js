const express       = require('express');
const _             = require('lodash');
const mockData      = require('./tickets.json');
const exchange      = require('../../models/exchange');
const config        = require('../../../../config');


const routes        = express.Router({ mergeParams: true });


routes.get('/', async(req, res) => {
	try {
		
		const ticketCurrency = config('ticketsCurrency', 'client');
		
		if (ticketCurrency === 'RUB') {
			// Add fake search timeout
			setTimeout(() => {
				res.answer(mockData.tickets);
			}, 900);
		} else {
			const rateValues = await exchange('RUB', ticketCurrency);
			const { value } = rateValues.find(currency => currency.currency === ticketCurrency);
			const newMockObject = _.cloneDeep(mockData);
			
			// Add fake search timeout
			setTimeout(() => {
				res.answer(newMockObject.tickets.map(ticket => {
					ticket.price *= value;
					return ticket;
				}));
			}, 900);
			
		}
	} catch (e) {
		res.report(e);
	}
	
});

module.exports = routes;