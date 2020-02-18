import { IPlaylist } from 'app/shared/model/playlist.model';
import { ISong } from 'app/shared/model/song.model';

export interface IListSong {
  id?: number;
  playlist?: IPlaylist;
  song?: ISong;
}

export class ListSong implements IListSong {
  constructor(public id?: number, public playlist?: IPlaylist, public song?: ISong) {}
}
