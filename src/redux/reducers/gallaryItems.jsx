import { IS_LOADING_ITEMS, IS_ERRORED_FETCH_ITEMS, FETCH_ITEMS_IS_SUCCESS } from "../actions/gallaryItems"

export function isErroredFetchItems(state = false, action) {
    switch (action.type) {
        case IS_ERRORED_FETCH_ITEMS:
            return action.isErrored;

        default:
            return state;
    }
}

export function isLoadingItems(state = false, action) {
    switch (action.type) {
        case IS_LOADING_ITEMS:
            return action.isLoading;

        default:
            return state;
    }
}

export function items(state = [], action) {
    switch (action.type) {
        case FETCH_ITEMS_IS_SUCCESS:
            return action.payload;

        default:
            return state;
    }
}