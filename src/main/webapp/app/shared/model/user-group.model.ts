import { IGroup } from 'app/shared/model/group.model';
import { IUser } from 'app/core/user/user.model';

export interface IUserGroup {
  id?: number;
  groupId?: IGroup;
  userId?: IUser;
}

export class UserGroup implements IUserGroup {
  constructor(public id?: number, public groupId?: IGroup, public userId?: IUser) {}
}
