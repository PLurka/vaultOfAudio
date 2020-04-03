import { IUserExtra } from 'app/shared/model/user-extra.model';
import { IPlaylist } from 'app/shared/model/playlist.model';

export interface ISong {
  id?: number;
  songName?: string;
  lyrics?: string;
  authors?: string;
  songMetadata?: string;
  year?: number;
  songDescription?: string;
  users?: IUserExtra[];
  createdBy?: IUserExtra;
  playlists?: IPlaylist[];
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
    public users?: IUserExtra[],
    public createdBy?: IUserExtra,
    public playlists?: IPlaylist[]
  ) {}
}
