import { IUserList } from 'app/shared/model/user-list.model';
import { IGroupList } from 'app/shared/model/group-list.model';
import { IListSong } from 'app/shared/model/list-song.model';

export interface IPlaylist {
  id?: number;
  listName?: string;
  listDescription?: string;
  userLists?: IUserList[];
  groupLists?: IGroupList[];
  listSongs?: IListSong[];
}

export class Playlist implements IPlaylist {
  constructor(
    public id?: number,
    public listName?: string,
    public listDescription?: string,
    public userLists?: IUserList[],
    public groupLists?: IGroupList[],
    public listSongs?: IListSong[]
  ) {}
}
