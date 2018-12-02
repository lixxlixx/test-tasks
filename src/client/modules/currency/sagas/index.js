import { fork, call, takeEvery, put } from 'redux-saga/effects';
import { get }                        from 'libs/xhr';
import {
	LOAD,
	add,
	loading,
	loaded,
	error
}                                     from '../actions';

/**
 * Load data and set initial filters
 *
 * @return {IterableIterator<ForkEffect | *>}
 */
export function* dataLoading() {
	yield takeEvery(LOAD, function* ({ payload: { from, to } }) {
		try {
			yield put(loading(true));
			const data = yield call(get, '/exchange', { from, to: to.toJS() });
			for (const currencyRate of data) {
				yield put(add(from, currencyRate.currency, currencyRate.value));
			}
			yield put(loaded());
		} catch (e) {
			yield put(error(e.message));
		} finally {
			yield put(loading(false));
		}
	});
}


/**
 * Root saga
 *
 * @return {IterableIterator<ForkEffect | *>}
 */
export default function* () {
	yield fork(dataLoading);
}