export interface IUser {
  avatar: string;
  favorites?: any[];
  appointments?: any[];
}

export interface IUserActions {
  type: 'setAvatar';
  payload: IUser;
}
