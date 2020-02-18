import { ISong } from 'app/shared/model/song.model';
import { IUser } from 'app/core/user/user.model';

export interface IUserSong {
  id?: number;
  song?: ISong;
  user?: IUser;
}

export class UserSong implements IUserSong {
  constructor(public id?: number, public song?: ISong, public user?: IUser) {}
}
