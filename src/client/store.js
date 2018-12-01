import { createStore, applyMiddleware, compose }    from 'redux';
import createSagaMiddleware                         from 'redux-saga';


const sagaMiddleware = createSagaMiddleware();
let sagaTask;

export default function (
	rootReducer = state => state,
	rootSaga = false,
	initialState,
	middlewares = [],
) {
	// Send data to chrome plugin
	// https://github.com/zalmoxisus/redux-devtools-extension
	let composeEnhancers = compose;
	
	if (
		
		typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
		env !== 'production' // eslint-disable-line
	) {
		composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
	}
	
	// Store creationg
	const store = createStore(
		rootReducer,
		initialState,
		composeEnhancers(...[].concat([
			applyMiddleware(...[sagaMiddleware].concat(middlewares)),
		])),
	);
	
	// Run saga
	if (rootSaga) {
		sagaTask = sagaMiddleware.run(rootSaga);
	}
	
	return store;
}

/**
 * HMR saga updater
 * Stop current saga, and run new
 * 
 * @param newSaga
 */
export function updateSagaTask(newSaga) {
	sagaTask.cancel();
	sagaTask.done.then(() => {
		sagaTask = sagaMiddleware.run(newSaga);
	});
}

