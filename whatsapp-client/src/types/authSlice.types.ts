export interface AuthUserType {
  objectId: string;
  displayName: string;
  email: string;
  avatar: string;
  createdOn: string;
  about: string;
  lastSeen: number;
  loading?: boolean;
  status?: boolean;
  uid?: string;
  _id?: string;
  color?: string;
}

export interface AuthStateType {
  auth: AuthUserType | null;
  loading: boolean;
  error: any;
  socketStatus: boolean;
}
