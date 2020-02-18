export interface IPlaylist {
  id?: number;
  listId?: number;
  listName?: string;
  listDescription?: string;
}

export class Playlist implements IPlaylist {
  constructor(public id?: number, public listId?: number, public listName?: string, public listDescription?: string) {}
}
