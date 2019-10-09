import {
    IS_LOADING_ITEMS,
    IS_ERRORED_FETCH_ITEMS,
    FETCH_ITEMS_IS_SUCCESS,
    ADD_ITEM,
} from "../actions/gallaryItems"

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
        case ADD_ITEM:
            return state.concat([{ data: action.addedNewItem }])
        default:
            return state;
    }
}

// export function addNewItem(state = [], action) {
//     switch (action.type) {
//         case ADD_ITEM:
//             return state.concat([{ data: action.addedNewItem }])

//         default:
//             return state;
//     }
// }

export const addNewItem = (item) => {
    return(dispatch) => {
        dispatch({
            type: ADD_ITEM,
            item
        })
    }
}