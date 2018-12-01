import Immutable                                 from 'immutable';
import { createSelectorCreator, defaultMemoize } from 'reselect';


/**
 * Compare immutable objects
 * 
 */
export const createSelector = createSelectorCreator(defaultMemoize, Immutable.is);


export default {};