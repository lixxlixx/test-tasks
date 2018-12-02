import { createSelector } from 'utils/memoization';


export const getExchangeRate = createSelector(
	(state, from, to) => state.currencyRate.getIn([from, to]),
	rate => rate,
);



export default {};