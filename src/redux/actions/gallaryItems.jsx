export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "DELETE_ITEM";
export const FETCH_ITEMS_IS_SUCCESS = "FETCH_ITEMS_IS_SUCCESS";
export const IS_ERRORED_FETCH_ITEMS = "IS_ERRORED_FETCH_ITEMS";
export const IS_LOADING_ITEMS = "IS_LOADING_ITEMS";

export function erroredFetchItems(boolean) {
    return {
        type: IS_ERRORED_FETCH_ITEMS,
        isErrored: boolean,
    };
}

export function isLoadingItems(boolean) {
    return {
        type: IS_LOADING_ITEMS,
        isLoading: boolean,
    };
}

export function fetchItemsSuccess(items) {
    return {
        type: FETCH_ITEMS_IS_SUCCESS,
        payload: items,
    }
}

export function addNewItem(addedNewItem) {
    return {
        type: ADD_ITEM,
        addedNewItem: addedNewItem,
    }
}

// export function fetchDataItems(url) {
//     return (dispatch) => {
//         dispatch(isLoadingItems(true));

//         fetch(url)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw Error(response.statusText);
//                 }

//                 dispatch(isLoadingItems(false));
//                 return response;
//             })
//             .then((response) => response.json())
//             .then((items) => dispatch(fetchItemsSuccess(items.data.children)))
//             .catch(() => dispatch(erroredFetchItems(true)));
//     };
// }

export function fetchDataItems(url) {
    return async (dispatch) => {
        dispatch(isLoadingItems(true));
        let response = await fetch(url);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        dispatch(isLoadingItems(false));

        let items = await response.json();
        dispatch(fetchItemsSuccess(items.data.children));
    };
}