import { IPlaylist } from 'app/shared/model/playlist.model';
import { IUser } from 'app/core/user/user.model';

export interface IUserList {
  id?: number;
  playlist?: IPlaylist;
  user?: IUser;
}

export class UserList implements IUserList {
  constructor(public id?: number, public playlist?: IPlaylist, public user?: IUser) {}
}
