import { call, takeEvery, put } from 'redux-saga/effects';
import { get } from 'libs/xhr';
import {
	LOAD,
	add,
	error,
	loaded,
	loading
} from '../actions';

export default function* () {
	yield takeEvery(LOAD, function* () {
		try {
			yield put(loading(true));
			const data = yield call(get, '/tickets');
			yield put(add(data));
			
			yield put(loaded());
		} catch (e) {
			yield put(error(e.message));
		} finally {
			yield put(loading(false));
		}
	});
}