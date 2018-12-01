import { fork, call, takeEvery, put, select }        from 'redux-saga/effects';
import { get }                                       from 'libs/xhr';
import {
	LOAD,
	add,
	error,
	loaded,
	loading
}                                                    from '../actions';
import {
	setActiveTransfers,
	applyToAllTransfers,
	APPLY_TO_ALL_TRANSFERS,
	SET_TRANSFER_ACTIVITY,
	SET_TRANSFER_ONLY_ACTIVITY
}                                                    from '../actions/filters';
import { getActiveTransfers, getAvailableTransfers } from '../selectors';


/**
 * Load data and set initial filters
 *
 * @return {IterableIterator<ForkEffect | *>}
 */
export function* dataLoading() {
	yield takeEvery(LOAD, function* () {
		try {
			yield put(loading(true));
			const data = yield call(get, '/tickets');
			yield put(add(data));
			yield put(applyToAllTransfers(true));
			
			yield put(loaded());
		} catch (e) {
			yield put(error(e.message));
		} finally {
			yield put(loading(false));
		}
	});
}


/**
 * Transfer filters
 * Catch filter events and put data results
 *
 * @return {IterableIterator<ForkEffect | *>}
 */
export function* transferFilters() {
	
	yield takeEvery(APPLY_TO_ALL_TRANSFERS, function* ({ payload: { setActive } }) {
		const activeTransfers = yield select(getActiveTransfers);
		if ( setActive ) {
			const availableTransfers = yield select(getAvailableTransfers);
			yield put(setActiveTransfers(availableTransfers.toSet()));
		} else {
			yield put(setActiveTransfers(activeTransfers.clear()));
		}
	});
	
	
	yield takeEvery(SET_TRANSFER_ACTIVITY, function* ({ payload: { transfersCount, setActive } }) {
		const activeTransfers = yield select(getActiveTransfers);
		if ( setActive ) {
			yield put(setActiveTransfers(activeTransfers.add(transfersCount)));
		} else {
			yield put(setActiveTransfers(activeTransfers.delete(transfersCount)));
		}
	});
	
	
	yield takeEvery(SET_TRANSFER_ONLY_ACTIVITY, function* ({ payload: { transfersCount } }) {
		const activeTransfers = yield select(getActiveTransfers);
		yield put(setActiveTransfers(activeTransfers.clear().add(transfersCount)));
	});
	
}


/**
 * Root saga
 *
 * @return {IterableIterator<ForkEffect | *>}
 */
export default function* () {
	yield fork(dataLoading);
	yield fork(transferFilters);
}