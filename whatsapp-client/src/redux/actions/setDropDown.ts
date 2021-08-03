import { dropDownTypes } from "../types/dropDownTypes";

export const setDropDown = (payload: any) => {
    return {
        type: dropDownTypes.SET_DROP_DOWN,
        payload,
    };
};
