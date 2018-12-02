export const LOAD       = 'CURRENCY/LOAD';
export const ADD_RATE   = 'CURRENCY/ADD_RATE';
export const LOADING    = 'CURRENCY/LOADING';
export const LOADED     = 'CURRENCY/LOADED';
export const ERROR      = 'CURRENCY/ERROR';


/**
 * Load currency
 *
 * @param from {string}
 * @param to {string|Immutable.list<string>}
 * @return {{type: string, payload: {from: string, to: string|Immutable.list<string>}}}
 */
export const load = (from, to) => ({
	type: LOAD,
	payload: { from, to }
});


/**
 * Add currency with exchange rate
 *
 * @param from {string}
 * @param to {string}
 * @param rate {number}
 * @return {{type: string, payload: {from: string, to: string, rate: number}}}
 */
export const add = (from, to, rate) => ({
	type: ADD_RATE,
	payload: { from, to, rate }
});


/**
 * Set loading status
 *
 * @param isLoading {boolean}
 * @return {{type: string, payload: {isLoading: boolean}}}
 */
export const loading = isLoading => ({
	type: LOADING,
	payload: { isLoading }
});


/**
 * Loaded signal
 *
 * @return {{type: string, payload: {}}}
 */
export const loaded = () => ({
	type: LOADED,
	payload: {}
});


/**
 * Error signal with msg
 *
 * @param msg {string}
 * @return {{type: string, payload: {msg: string}}}
 */
export const error = msg => ({
	type: ERROR,
	payload: { msg }
});
