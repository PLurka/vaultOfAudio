import { IUserExtra } from 'app/shared/model/user-extra.model';

export interface IEqualizerSetting {
  id?: number;
  equalizerName?: string;
  first?: number;
  second?: number;
  third?: number;
  fourth?: number;
  fifth?: number;
  sixth?: number;
  seventh?: number;
  eight?: number;
  ninth?: number;
  tenth?: number;
  users?: IUserExtra[];
  createdBy?: IUserExtra;
}

export class EqualizerSetting implements IEqualizerSetting {
  constructor(
    public id?: number,
    public equalizerName?: string,
    public first?: number,
    public second?: number,
    public third?: number,
    public fourth?: number,
    public fifth?: number,
    public sixth?: number,
    public seventh?: number,
    public eight?: number,
    public ninth?: number,
    public tenth?: number,
    public users?: IUserExtra[],
    public createdBy?: IUserExtra
  ) {}
}
