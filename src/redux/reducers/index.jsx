import { combineReducers } from "redux";
import { isErroredFetchItems, isLoadingItems, items } from './gallaryItems'

export default combineReducers({
    items,
    isLoading: isLoadingItems,
    isErrored: isErroredFetchItems,
})