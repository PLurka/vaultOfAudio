import { IGroup } from 'app/shared/model/group.model';
import { IPlaylist } from 'app/shared/model/playlist.model';

export interface IGroupList {
  id?: number;
  group?: IGroup;
  playlist?: IPlaylist;
}

export class GroupList implements IGroupList {
  constructor(public id?: number, public group?: IGroup, public playlist?: IPlaylist) {}
}
