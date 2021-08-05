import Actions from './actions';
import { ActionObject as Action, UserState } from './types';

const initialState: UserState = {
  list: [],
  error: null
};

const users = (state: UserState = initialState, action: Action) => {
  switch (action.type) {
    case Actions.users.fetchUsers.success.toString():
      return {
        ...state,
        list: action.payload,
        error: null
      };
    case Actions.users.fetchUsers.error.toString():
      return {
        ...state,
        error: action.payload
      };
    case Actions.users.fetchUserPosts.success.toString():
      const userIndex = state.list.findIndex(user => user.id === action.payload[0].userId);

      if (!userIndex || !state.list.length) {
        return {
          ...state,
          error: null
        };
      }

      const newList = [...state.list];

      newList[userIndex].posts = action.payload;

      return {
        ...state,
        list: newList,
        error: null
      };
    case Actions.users.fetchUserPosts.error.toString():
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default users;
