import { IEqualizerSetting } from 'app/shared/model/equalizer-setting.model';
import { IUser } from 'app/core/user/user.model';

export interface IUserEqualizerSetting {
  id?: number;
  equalizerId?: IEqualizerSetting;
  userId?: IUser;
}

export class UserEqualizerSetting implements IUserEqualizerSetting {
  constructor(public id?: number, public equalizerId?: IEqualizerSetting, public userId?: IUser) {}
}
