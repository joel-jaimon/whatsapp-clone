import { dropDownTypes } from "../types/dropDownTypes";

export const setDropDown = (dropDown: any) => {
    return {
        type: dropDownTypes.SET_DROP_DOWN,
        payload: dropDown,
    };
};
