import { takeLatest, call, put } from "@redux-saga/core/effects";
// import { getActiveSocket } from "config/globalSocket";
import { callingActive, initCall } from "redux/reducers/room";
import { setRoomModal } from "redux/reducers/roomModal";
import store from "redux/store";
import { v4 as uuidv4 } from "uuid";

export function* initCallSaga() {
  yield takeLatest(initCall.type, function* (action: any) {
    // const socket = getActiveSocket();
    const peerId = uuidv4();
    // yield socket.emit("callOtherUser", { ...action.payload, peerId });
    yield put(callingActive(action.payload));
    yield put(
      setRoomModal({
        peerId,
        callBy: action.payload.callBy,
        groupInfo:
          store.getState().chatState.chat[action.payload.refId].chatInfo,
        extraParam: { ...action.payload, peerId },
        acceptedCall: false,
      })
    );
  });
}
