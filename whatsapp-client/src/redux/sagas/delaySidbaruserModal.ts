import { delay, takeLatest, put } from "redux-saga/effects";
import {
  allowSidebarModal,
  setSidebarModal,
} from "../reducers/sidebarChatModal";

function* allowDataToPass(action: any) {
  yield delay(5000);
  yield put(allowSidebarModal({ ...action.payload, joel: true }));
}

export function* delaySidebarModal() {
  yield takeLatest(setSidebarModal.type, allowDataToPass);
}
