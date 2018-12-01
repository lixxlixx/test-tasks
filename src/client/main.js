import React                           from 'react';
import { render }                      from 'react-dom';
import { AppContainer }                from 'react-hot-loader';
import { Provider }                    from 'react-redux';
import TicketsPage                     from 'pages/Tickets/containers';
import rootSaga                        from 'sagas/rootMain';
import rootReducer                     from 'reducers/rootMain';
import { I18nextProvider }             from 'react-i18next';
import { getDefaultLang }              from 'modules/config/selectors';
import i18n                            from 'libs/i18n';
import createStore, { updateSagaTask } from 'store';


let store;
if ( env !== 'production' ) { // eslint-disable-line
	store = window.store || createStore(rootReducer, rootSaga);
	window.store = store;
} else {
	store = createStore(rootReducer, rootSaga);
}

const lng = getDefaultLang(store.getState());

render(
	<Provider store={store}>
		<I18nextProvider i18n={i18n({ lng })}>
			<AppContainer>
				<TicketsPage />
			</AppContainer>
		</I18nextProvider>
	</Provider>,
	document.getElementById('root'),
);

if ( module.hot ) {
	module.hot.accept();
	
	module.hot.accept(['reducers/rootMain'], () => {
		window.store.replaceReducer(require('reducers/rootMain').default);
	});
	
	module.hot.accept('sagas/rootMain', () => {
		updateSagaTask(require('sagas/rootMain').default);
	});
}