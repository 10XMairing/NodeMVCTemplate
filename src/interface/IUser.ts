export interface IUserData {
  _id: string;
  username: string;
  email: string;
  password?: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IUserInput {
  username: string;
  email: string;
  password: string;
}
