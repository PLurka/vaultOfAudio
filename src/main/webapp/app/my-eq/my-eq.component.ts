import { Component, OnInit, OnDestroy } from '@angular/core';
import { IEqualizerSetting } from 'app/shared/model/equalizer-setting.model';
import { EqualizerSettingService } from 'app/entities/equalizer-setting';
import { AccountService } from 'app/core';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { IPlaylist } from 'app/shared/model/playlist.model';
import { PlaylistService } from 'app/entities/playlist';
import { SongService } from 'app/entities/song';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra';

@Component({
  selector: 'jhi-my-eq',
  templateUrl: './my-eq.component.html',
  styleUrls: ['my-eq.component.scss']
})
export class MyEqComponent implements OnInit {
  equalizerSettings: IEqualizerSetting[];
  allEqualizerSettings: IEqualizerSetting[];
  userEqualizerSettings: IEqualizerSetting[];
  currentUser: IUserExtra;
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected equalizerSettingService: EqualizerSettingService,
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
    let equalizerSettingsTemp: IPlaylist[] = [];
    this.songService
      .getLogin()
      .pipe(
        filter((res: HttpResponse<string>) => res.ok),
        map((res: HttpResponse<string>) => res.body)
      )
      .subscribe((res: string) => {
        if (res != undefined) {
          console.error('getLogin(): ' + res);
          this.equalizerSettingService
            .query()
            .pipe(
              filter((resp: HttpResponse<IPlaylist[]>) => resp.ok),
              map((resp: HttpResponse<IPlaylist[]>) => resp.body)
            )
            .subscribe(
              (resp: IPlaylist[]) => {
                this.equalizerSettings = resp;
                this.allEqualizerSettings = this.equalizerSettings;
                resp.forEach(function(playlist) {
                  playlist.users.forEach(function(user) {
                    if (user['user']['login'] === res) {
                      equalizerSettingsTemp.push(playlist);
                    }
                  });
                });
              },
              (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
      });
    this.userEqualizerSettings = equalizerSettingsTemp;
  }

  eqHasUser(eq: IEqualizerSetting): boolean {
    let eqHasUserBool: boolean = false;
    eq.users.forEach(user => {
      if (user.user.login === this.currentAccount.login) {
        eqHasUserBool = true;
      }
    });
    return eqHasUserBool;
  }

  addUserToEq(eq: IEqualizerSetting) {
    eq.users.push(this.currentUser);
    this.equalizerSettingService.update(eq).subscribe(event => {
      alert('Added user succesfully');
    });
    this.loadAll();
    let showUserEqOnly = <HTMLInputElement>document.getElementById('userEqOnly');
    showUserEqOnly.checked = false;
  }

  removeUserFromEq(eq: IEqualizerSetting) {
    eq.users.forEach(userExtra => {
      if (userExtra.id === this.currentUser.id) {
        eq.users.splice(eq.users.indexOf(userExtra), 1);
      }
    });
    this.equalizerSettingService.update(eq).subscribe(event => {
      alert('Removed user succesfully');
    });
    this.loadAll();
    let showUserEqOnly = <HTMLInputElement>document.getElementById('userEqOnly');
    showUserEqOnly.checked = false;
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEqualizerSettings();

    let showUserEqOnly = <HTMLInputElement>document.getElementById('userEqOnly');

    showUserEqOnly.addEventListener(
      'input',
      () => {
        if (showUserEqOnly.checked === true) {
          this.equalizerSettings = this.userEqualizerSettings;
        } else {
          this.equalizerSettings = this.allEqualizerSettings;
        }
      },
      false
    );
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEqualizerSetting) {
    return item.id;
  }

  registerChangeInEqualizerSettings() {
    this.eventSubscriber = this.eventManager.subscribe('equalizerSettingListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
