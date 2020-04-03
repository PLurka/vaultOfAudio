import { IUserExtra } from 'app/shared/model/user-extra.model';
import { IPlaylist } from 'app/shared/model/playlist.model';

export interface ICrowd {
  id?: number;
  crowdName?: string;
  crowdDescription?: string;
  crowdPhotoContentType?: string;
  crowdPhoto?: any;
  users?: IUserExtra[];
  accepteds?: IUserExtra[];
  playlists?: IPlaylist[];
  createdBy?: IUserExtra;
}

export class Crowd implements ICrowd {
  constructor(
    public id?: number,
    public crowdName?: string,
    public crowdDescription?: string,
    public crowdPhotoContentType?: string,
    public crowdPhoto?: any,
    public users?: IUserExtra[],
    public accepteds?: IUserExtra[],
    public playlists?: IPlaylist[],
    public createdBy?: IUserExtra
  ) {}
}
