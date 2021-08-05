export type Action = (
  payload?: any
) => ActionObject & {
  toString: () => string;
};

export type ActionObject = {
  type: string;
  payload?: any;
};

export type Routine = {
  trigger: Action;
  success: Action;
  error: Action;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
  posts: UserPost[];
};

export type UserPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type UserState = {
  list: User[];
  error?: any;
};

export type State = {
  users: UserState;
};
