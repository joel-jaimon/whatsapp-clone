import { roomModalTypes } from "../types/roomModalTypes";

export const setRoomModal = (payload: any) => ({
    type: roomModalTypes.SET_ROOM_MODAL,
    payload,
});
