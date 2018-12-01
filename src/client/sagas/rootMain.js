import axios        from 'axios';
import {
	fork,
	select,
	call,
	put,
	all
}                   from 'redux-saga/effects';
import mainPageSaga from 'pages/Tickets/sagas';
import { add }      from 'modules/config/actions';
import {
	getApiMaxContentLength,
	getApiRequestTimeout
}                   from 'modules/config/selectors';


export function* addConfig() {
	yield put(add(window.__config));
}


export function* xhrSettings() {
	const [maxContentLength, apiRequestTimeout] = yield all([
		select(getApiMaxContentLength),
		select(getApiRequestTimeout)
	]);
	
	Object.assign(axios.defaults, {
		withCredentials: true,
		maxContentLength: (maxContentLength * 1024) * 1024,
		timeout: apiRequestTimeout,
	});
}


export default function* rootSaga() {
	yield call(addConfig);
	yield call(xhrSettings);
	yield fork(mainPageSaga);
}