import { IGroup } from 'app/shared/model/group.model';
import { IUser } from 'app/core/user/user.model';

export interface IUserGroup {
  id?: number;
  createdBy?: boolean;
  groupAccepted?: boolean;
  userAccepted?: boolean;
  group?: IGroup;
  user?: IUser;
}

export class UserGroup implements IUserGroup {
  constructor(
    public id?: number,
    public createdBy?: boolean,
    public groupAccepted?: boolean,
    public userAccepted?: boolean,
    public group?: IGroup,
    public user?: IUser
  ) {
    this.createdBy = this.createdBy || false;
    this.groupAccepted = this.groupAccepted || false;
    this.userAccepted = this.userAccepted || false;
  }
}
