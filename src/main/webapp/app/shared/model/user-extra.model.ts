import { IUser } from 'app/core/user/user.model';
import { IEqualizerSetting } from 'app/shared/model/equalizer-setting.model';
import { ISong } from 'app/shared/model/song.model';
import { IPlaylist } from 'app/shared/model/playlist.model';
import { ICrowd } from 'app/shared/model/crowd.model';

export interface IUserExtra {
  id?: number;
  user?: IUser;
  createdEqualizerSettings?: IEqualizerSetting[];
  createdSongs?: ISong[];
  createdPlaylists?: IPlaylist[];
  createdCrowds?: ICrowd[];
  equalizerSettings?: IEqualizerSetting[];
  songs?: ISong[];
  playlists?: IPlaylist[];
  crowds?: ICrowd[];
  acceptedCrowds?: ICrowd[];
}

export class UserExtra implements IUserExtra {
  constructor(
    public id?: number,
    public user?: IUser,
    public createdEqualizerSettings?: IEqualizerSetting[],
    public createdSongs?: ISong[],
    public createdPlaylists?: IPlaylist[],
    public createdCrowds?: ICrowd[],
    public equalizerSettings?: IEqualizerSetting[],
    public songs?: ISong[],
    public playlists?: IPlaylist[],
    public crowds?: ICrowd[],
    public acceptedCrowds?: ICrowd[]
  ) {}
}
