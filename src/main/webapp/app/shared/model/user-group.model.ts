import { IGroup } from 'app/shared/model/group.model';
import { IUser } from 'app/core/user/user.model';

export interface IUserGroup {
  id?: number;
  group?: IGroup;
  user?: IUser;
}

export class UserGroup implements IUserGroup {
  constructor(public id?: number, public group?: IGroup, public user?: IUser) {}
}
