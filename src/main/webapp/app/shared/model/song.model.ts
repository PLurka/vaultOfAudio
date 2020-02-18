export interface ISong {
  id?: number;
  songId?: number;
  songName?: string;
  lyrics?: string;
  authors?: string;
  songMetadata?: string;
  year?: number;
  songDescription?: string;
}

export class Song implements ISong {
  constructor(
    public id?: number,
    public songId?: number,
    public songName?: string,
    public lyrics?: string,
    public authors?: string,
    public songMetadata?: string,
    public year?: number,
    public songDescription?: string
  ) {}
}
