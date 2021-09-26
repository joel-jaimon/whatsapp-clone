import { AuthUserType } from "./authSlice.types";

export interface ParticipantsType {
  objectId: string;
  lastViewed: number | null;
}

export interface ChatInfoType {
  _id: string;
  participants: ParticipantsType[];
  modifiendOn: number;
  type: string;
  clientSide?: boolean;
  loading?: boolean;
  // For groups
  name?: string;
  createdOn?: string;
  desc?: string;
}

export interface MsgTypes {
  _id?: string;
  type: string;
  msgType: string;
  msgParams?: any;
  refId?: string;
  timestamp: number;
  sentby: string;
  stillSending?: boolean;
  tempId?: string;
}

export interface ChatType {
  chatInfo: ChatInfoType;
  messages: MsgTypes[];
  stillSaving?: boolean;
}

export interface ChatStateType {
  authUsers: { [k: string]: AuthUserType };
  guestUsers: { [k: string]: AuthUserType };
  activeChat: null | string;
  loading: boolean;
  chat: { [k: string]: ChatType };
}
