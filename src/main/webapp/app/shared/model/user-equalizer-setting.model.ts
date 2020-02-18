import { IEqualizerSetting } from 'app/shared/model/equalizer-setting.model';
import { IUser } from 'app/core/user/user.model';

export interface IUserEqualizerSetting {
  id?: number;
  equalizerSetting?: IEqualizerSetting;
  user?: IUser;
}

export class UserEqualizerSetting implements IUserEqualizerSetting {
  constructor(public id?: number, public equalizerSetting?: IEqualizerSetting, public user?: IUser) {}
}
