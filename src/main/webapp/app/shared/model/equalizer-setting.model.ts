export interface IEqualizerSetting {
  id?: number;
  equalizerId?: number;
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
}

export class EqualizerSetting implements IEqualizerSetting {
  constructor(
    public id?: number,
    public equalizerId?: number,
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
    public tenth?: number
  ) {}
}
