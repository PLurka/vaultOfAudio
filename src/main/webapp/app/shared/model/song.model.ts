import { IUserSong } from 'app/shared/model/user-song.model';
import { IListSong } from 'app/shared/model/list-song.model';

export interface ISong {
  id?: number;
  songName?: string;
  lyrics?: string;
  authors?: string;
  songMetadata?: string;
  year?: number;
  songDescription?: string;
  userSongs?: IUserSong[];
  listSongs?: IListSong[];
}

export class Song implements ISong {
  constructor(
    public id?: number,
    public songName?: string,
    public lyrics?: string,
    public authors?: string,
    public songMetadata?: string,
    public year?: number,
    public songDescription?: string,
    public userSongs?: IUserSong[],
    public listSongs?: IListSong[]
  ) {}
}
