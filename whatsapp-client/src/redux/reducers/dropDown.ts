import { dropDownTypes } from "../types/dropDownTypes";

const initialState = {
    dropDown: "",
};

const dropDownReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case dropDownTypes.SET_DROP_DOWN:
            return {
                dropDown: action.payload,
            };
        default:
            return state;
    }
};

export default dropDownReducer;
