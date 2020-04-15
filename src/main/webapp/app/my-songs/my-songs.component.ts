import { Component, OnInit } from '@angular/core';
import { SongService } from 'app/entities/song';
import { Account, AccountService, IUser } from 'app/core';
import { ISong } from 'app/shared/model/song.model';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra';

@Component({
  selector: 'jhi-my-songs',
  templateUrl: './my-songs.component.html',
  styleUrls: ['my-songs.component.scss']
})
export class MySongsComponent implements OnInit {
  message: string;
  songs: ISong[];
  allSongs: ISong[];
  userSongs: ISong[];
  currentUser: IUserExtra;
  currentAccount: Account;
  eventSubscriber: Subscription;

  constructor(
    protected songService: SongService,
    protected userExtraService: UserExtraService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {
    this.message = 'MySongsComponent message';
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
    let songsTemp: ISong[] = [];
    this.songService
      .getLogin()
      .pipe(
        filter((res: HttpResponse<string>) => res.ok),
        map((res: HttpResponse<string>) => res.body)
      )
      .subscribe((res: string) => {
        if (res != undefined) {
          console.error('getLogin(): ' + res);
          this.songService
            .query()
            .pipe(
              filter((resp: HttpResponse<ISong[]>) => resp.ok),
              map((resp: HttpResponse<ISong[]>) => resp.body)
            )
            .subscribe(
              (resp: ISong[]) => {
                this.songs = resp;
                this.allSongs = this.songs;
                resp.forEach(function(song) {
                  song.users.forEach(function(user) {
                    if (user['user']['login'] === res) {
                      songsTemp.push(song);
                    }
                  });
                });
              },
              (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
      });
    this.userSongs = songsTemp;
  }

  songHasUser(song: ISong): boolean {
    let songHasUserBool: boolean = false;
    song.users.forEach(user => {
      if (user.user.login === this.currentAccount.login) {
        songHasUserBool = true;
      }
    });
    return songHasUserBool;
  }

  addUserToSong(song: ISong) {
    song.users.push(this.currentUser);
    this.songService.update(null, song).subscribe(event => {
      alert('Added user succesfully');
    });
    this.loadAll();
    let showUserSongsOnly = <HTMLInputElement>document.getElementById('userSongsOnly');
    showUserSongsOnly.checked = false;
  }

  removeUserFromSong(song: ISong) {
    song.users.forEach(userExtra => {
      if (userExtra.id === this.currentUser.id) {
        song.users.splice(song.users.indexOf(userExtra), 1);
      }
    });
    this.songService.update(null, song).subscribe(event => {
      alert('Removed user succesfully');
    });
    this.loadAll();
    let showUserSongsOnly = <HTMLInputElement>document.getElementById('userSongsOnly');
    showUserSongsOnly.checked = false;
  }

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.currentAccount = account;
    });
    this.loadAll();
    this.registerChangeInSongs();

    let showUserSongsOnly = <HTMLInputElement>document.getElementById('userSongsOnly');

    showUserSongsOnly.addEventListener(
      'input',
      () => {
        if (showUserSongsOnly.checked === true) {
          this.songs = this.userSongs;
        } else {
          this.songs = this.allSongs;
        }
      },
      false
    );
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISong) {
    return item.id;
  }

  registerChangeInSongs() {
    this.eventSubscriber = this.eventManager.subscribe('songListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
