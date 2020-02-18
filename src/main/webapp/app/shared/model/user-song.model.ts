import { ISong } from 'app/shared/model/song.model';
import { IUser } from 'app/core/user/user.model';

export interface IUserSong {
  id?: number;
  songId?: ISong;
  userId?: IUser;
}

export class UserSong implements IUserSong {
  constructor(public id?: number, public songId?: ISong, public userId?: IUser) {}
}
