import { IUserExtra } from 'app/shared/model/user-extra.model';
import { ISong } from 'app/shared/model/song.model';
import { ICrowd } from 'app/shared/model/crowd.model';

export interface IPlaylist {
  id?: number;
  listName?: string;
  listDescription?: string;
  users?: IUserExtra[];
  songs?: ISong[];
  createdBy?: IUserExtra;
  crowds?: ICrowd[];
}

export class Playlist implements IPlaylist {
  constructor(
    public id?: number,
    public listName?: string,
    public listDescription?: string,
    public users?: IUserExtra[],
    public songs?: ISong[],
    public createdBy?: IUserExtra,
    public crowds?: ICrowd[]
  ) {}
}
