import React, {createContext, useReducer} from 'react';

import {initialState, UserReducer} from '../reducers/UserReducer';
import {IUser, IUserActions} from '../interfaces/User';

interface UserContextData {
  state: IUser;
  dispatch: React.Dispatch<IUserActions>;
}

export const UserContext = createContext<UserContextData>(
  {} as UserContextData,
);

export const UserContextProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
