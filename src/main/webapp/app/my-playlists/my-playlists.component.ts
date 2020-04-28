import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPlaylist } from 'app/shared/model/playlist.model';
import { PlaylistService } from 'app/entities/playlist';
import { AccountService } from 'app/core';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { SongService } from 'app/entities/song';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra';
import { ISong } from 'app/shared/model/song.model';

@Component({
  selector: 'jhi-my-playlists',
  templateUrl: './my-playlists.component.html',
  styleUrls: ['my-playlists.component.scss']
})
export class MyPlaylistsComponent implements OnInit, OnDestroy {
  playlists: IPlaylist[];
  allPlaylists: IPlaylist[];
  userPlaylists: IPlaylist[];
  currentAccount: any;
  currentUser: IUserExtra;
  eventSubscriber: Subscription;

  constructor(
    protected playlistService: PlaylistService,
    protected songService: SongService,
    protected userExtraService: UserExtraService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {
    this.userExtraService
      .query()
      .pipe(
        filter((res: HttpResponse<IUserExtra[]>) => res.ok),
        map((res: HttpResponse<IUserExtra[]>) => res.body)
      )
      .subscribe((res: IUserExtra[]) => {
        if (res != undefined) {
          res.forEach(userExtra => {
            if (userExtra.user.login === this.currentAccount.login) this.currentUser = userExtra;
          });
        }
      });
  }

  loadAll() {
    let playlistsTemp: IPlaylist[] = [];
    this.songService
      .getLogin()
      .pipe(
        filter((res: HttpResponse<string>) => res.ok),
        map((res: HttpResponse<string>) => res.body)
      )
      .subscribe((res: string) => {
        if (res != undefined) {
          this.playlistService
            .query()
            .pipe(
              filter((resp: HttpResponse<IPlaylist[]>) => resp.ok),
              map((resp: HttpResponse<IPlaylist[]>) => resp.body)
            )
            .subscribe(
              (resp: IPlaylist[]) => {
                this.playlists = resp;
                this.allPlaylists = this.playlists;
                resp.forEach(function(playlist) {
                  playlist.users.forEach(function(user) {
                    if (user['user']['login'] === res) {
                      playlistsTemp.push(playlist);
                    }
                  });
                });
              },
              (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
      });
    this.userPlaylists = playlistsTemp;
  }

  listHasUser(list: IPlaylist): boolean {
    let listHasUserBool: boolean = false;
    list.users.forEach(user => {
      if (user.user.login === this.currentAccount.login) {
        listHasUserBool = true;
      }
    });
    return listHasUserBool;
  }

  addUserToList(list: IPlaylist) {
    list.users.push(this.currentUser);
    this.playlistService.update(list).subscribe(event => {
      alert('Added user succesfully');
    });
    this.loadAll();
    let showUserListsOnly = <HTMLInputElement>document.getElementById('userPlaylistsOnly');
    showUserListsOnly.checked = false;
  }

  removeUserFromList(list: IPlaylist) {
    list.users.forEach(userExtra => {
      if (userExtra.id === this.currentUser.id) {
        list.users.splice(list.users.indexOf(userExtra), 1);
      }
    });
    this.playlistService.update(list).subscribe(event => {
      alert('Removed user succesfully');
    });
    this.loadAll();
    let showUserListsOnly = <HTMLInputElement>document.getElementById('userPlaylistsOnly');
    showUserListsOnly.checked = false;
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlaylists();

    let showUserPlaylistsOnly = <HTMLInputElement>document.getElementById('userPlaylistsOnly');

    showUserPlaylistsOnly.addEventListener(
      'input',
      () => {
        if (showUserPlaylistsOnly.checked === true) {
          this.playlists = this.userPlaylists;
        } else {
          this.playlists = this.allPlaylists;
        }
      },
      false
    );
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlaylist) {
    return item.id;
  }

  registerChangeInPlaylists() {
    this.eventSubscriber = this.eventManager.subscribe('playlistListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
