import { IGroup } from 'app/shared/model/group.model';
import { IPlaylist } from 'app/shared/model/playlist.model';

export interface IGroupList {
  id?: number;
  groupId?: IGroup;
  listId?: IPlaylist;
}

export class GroupList implements IGroupList {
  constructor(public id?: number, public groupId?: IGroup, public listId?: IPlaylist) {}
}
