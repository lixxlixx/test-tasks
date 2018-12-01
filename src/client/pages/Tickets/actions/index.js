export const LOAD       = 'PAGES/TICKETS/LOAD';
export const ADD        = 'PAGES/TICKETS/ADD';
export const LOADING    = 'PAGES/TICKETS/LOADING';
export const LOADED     = 'PAGES/TICKETS/LOADED';
export const ERROR      = 'PAGES/TICKETS/ERROR';


/**
 * Load tickets data
 * 
 * @return {{type: string, payload: {}}}
 */
export const load = () => ({
	type: LOAD,
	payload: {}
});


/**
 * Add loaded tickets
 * 
 * @param tickets {Array}
 * @return {{type: string, payload: { tickets: Array }}}
 */
export const add = tickets => ({
	type: ADD,
	payload: { tickets }
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

