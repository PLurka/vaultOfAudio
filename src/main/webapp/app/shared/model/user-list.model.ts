import { IPlaylist } from 'app/shared/model/playlist.model';
import { IUser } from 'app/core/user/user.model';

export interface IUserList {
  id?: number;
  createdBy?: boolean;
  playlist?: IPlaylist;
  user?: IUser;
}

export class UserList implements IUserList {
  constructor(public id?: number, public createdBy?: boolean, public playlist?: IPlaylist, public user?: IUser) {
    this.createdBy = this.createdBy || false;
  }
}
