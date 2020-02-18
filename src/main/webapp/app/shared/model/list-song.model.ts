import { IPlaylist } from 'app/shared/model/playlist.model';
import { ISong } from 'app/shared/model/song.model';

export interface IListSong {
  id?: number;
  listId?: IPlaylist;
  songId?: ISong;
}

export class ListSong implements IListSong {
  constructor(public id?: number, public listId?: IPlaylist, public songId?: ISong) {}
}
