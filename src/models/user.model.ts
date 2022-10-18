import { UserStatus, UserType } from "./enums";

export class User {
  id: string;
  type: UserType;
  rowId: string;
  username: string;
  password: string;
  salt: string;
  status: UserStatus;
}
