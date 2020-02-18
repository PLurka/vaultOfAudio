export interface IGroup {
  id?: number;
  groupId?: number;
  groupName?: string;
  groupDescription?: string;
  groupPhotoContentType?: string;
  groupPhoto?: any;
}

export class Group implements IGroup {
  constructor(
    public id?: number,
    public groupId?: number,
    public groupName?: string,
    public groupDescription?: string,
    public groupPhotoContentType?: string,
    public groupPhoto?: any
  ) {}
}
