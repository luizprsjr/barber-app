import {IUser, IUserActions} from '../interfaces/User';

export const initialState: IUser = {
  avatar: '',
  favorites: [],
  appointments: [],
};

export const UserReducer = (state: IUser, action: IUserActions) => {
  switch (action.type) {
    case 'setAvatar':
      return {...state, avatar: action.payload.avatar};
    // break;

    default:
      return state;
  }
};
