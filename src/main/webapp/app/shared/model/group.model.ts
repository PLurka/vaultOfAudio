import { IUserGroup } from 'app/shared/model/user-group.model';
import { IGroupList } from 'app/shared/model/group-list.model';

export interface IGroup {
  id?: number;
  groupName?: string;
  groupDescription?: string;
  groupPhotoContentType?: string;
  groupPhoto?: any;
  userGroups?: IUserGroup[];
  groupLists?: IGroupList[];
}

export class Group implements IGroup {
  constructor(
    public id?: number,
    public groupName?: string,
    public groupDescription?: string,
    public groupPhotoContentType?: string,
    public groupPhoto?: any,
    public userGroups?: IUserGroup[],
    public groupLists?: IGroupList[]
  ) {}
}
