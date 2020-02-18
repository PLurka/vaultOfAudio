import { IPlaylist } from 'app/shared/model/playlist.model';
import { IUser } from 'app/core/user/user.model';

export interface IUserList {
  id?: number;
  listId?: IPlaylist;
  userId?: IUser;
}

export class UserList implements IUserList {
  constructor(public id?: number, public listId?: IPlaylist, public userId?: IUser) {}
}
