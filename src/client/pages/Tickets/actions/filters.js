export const SET_ACTIVE_TRANSFERS       = 'PAGES/TICKETS/FILTERS/SET_ACTIVE_TRANSFERS';
export const SET_TRANSFER_ACTIVITY      = 'PAGES/TICKETS/FILTERS/SET_TRANSFER_ACTIVITY';
export const SET_TRANSFER_ONLY_ACTIVITY = 'PAGES/TICKETS/FILTERS/SET_TRANSFER_ONLY_ACTIVITY';
export const APPLY_TO_ALL_TRANSFERS     = 'PAGES/TICKETS/FILTERS/APPLY_TO_ALL_TRANSFERS';
export const SET_CURRENCY               = 'PAGES/TICKETS/FILTERS/SET_CURRENCY';


/**
 * Set data results
 * 
 * @param transfers {Immutable.Set}
 * @return {{type: string, payload: {transfers: Immutable.Set}}}
 */
export const setActiveTransfers = transfers => ({
	type: SET_ACTIVE_TRANSFERS,
	payload: { transfers }
});


/**
 * Set value of transfer
 * 
 * @param transfersCount {number}
 * @param setActive {boolean}
 * @return {{type: string, payload: {transfersCount: number, setActive: boolean}}}
 */
export const setTransferFilter = (transfersCount, setActive) => ({
	type: SET_TRANSFER_ACTIVITY,
	payload: { transfersCount, setActive }
});


/**
 * Set just one value of transfer
 * Disable other transfers
 * 
 * @param transfersCount {number}
 * @return {{type: string, payload: {transfersCount: number}}}
 */
export const setTransferFilterOnly = transfersCount => ({
	type: SET_TRANSFER_ONLY_ACTIVITY,
	payload: { transfersCount }
});


/**
 * Apply activity to all transfers
 * 
 * @param setActive {boolean}
 * @return {{type: string, payload: {setActive: boolean}}}
 */
export const applyToAllTransfers = setActive => ({
	type: APPLY_TO_ALL_TRANSFERS,
	payload: { setActive }
});


/**
 * Set filter currency
 * 
 * @param currency {string}
 * @return {{type: string, payload: {currency: string}}}
 */
export const setCurrency = currency => ({
	type: SET_CURRENCY,
	payload: { currency }
});