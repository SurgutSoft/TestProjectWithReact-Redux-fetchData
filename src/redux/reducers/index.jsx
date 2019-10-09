import { combineReducers } from "redux";
import { isErroredFetchItems, isLoadingItems, items, addNewItem } from './gallaryItems'

export default combineReducers({
    items,
    isLoading: isLoadingItems,
    isErrored: isErroredFetchItems,
    addNewItem,
})