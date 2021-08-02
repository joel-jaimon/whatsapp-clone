const initialState = {
    modal: null,
};

const globalModalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_GLOBAL_MODAL":
            return {
                ...state,
                modal: action.payload,
            };

        default:
            return state;
    }
};
export default globalModalReducer;
