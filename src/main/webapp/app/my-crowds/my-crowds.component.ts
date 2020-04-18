import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICrowd } from 'app/shared/model/crowd.model';
import { CrowdService } from 'app/entities/crowd';
import { AccountService } from 'app/core';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { SongService } from 'app/entities/song';
import { UserExtraService } from 'app/entities/user-extra';
import { IPlaylist } from 'app/shared/model/playlist.model';

@Component({
  selector: 'jhi-my-crowds',
  templateUrl: './my-crowds.component.html',
  styleUrls: ['my-crowds.component.scss']
})
export class MyCrowdsComponent implements OnInit, OnDestroy {
  crowds: ICrowd[];
  allCrowds: ICrowd[];
  userCrowds: ICrowd[];
  currentAccount: any;
  currentUser: IUserExtra;
  eventSubscriber: Subscription;

  constructor(
    protected crowdService: CrowdService,
    protected songService: SongService,
    protected userExtraService: UserExtraService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
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
    let crowdsTemp: ICrowd[] = [];
    this.songService
      .getLogin()
      .pipe(
        filter((res: HttpResponse<string>) => res.ok),
        map((res: HttpResponse<string>) => res.body)
      )
      .subscribe((res: string) => {
        if (res != undefined) {
          console.error('getLogin(): ' + res);
          this.crowdService
            .query()
            .pipe(
              filter((resp: HttpResponse<ICrowd[]>) => resp.ok),
              map((resp: HttpResponse<ICrowd[]>) => resp.body)
            )
            .subscribe(
              (resp: ICrowd[]) => {
                this.crowds = resp;
                this.allCrowds = this.crowds;
                resp.forEach(function(playlist) {
                  playlist.users.forEach(function(user) {
                    if (user['user']['login'] === res) {
                      crowdsTemp.push(playlist);
                    }
                  });
                });
              },
              (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
      });
    this.userCrowds = crowdsTemp;
  }

  crowdHasUser(crowd: ICrowd): boolean {
    let crowdHasUserBool: boolean = false;
    crowd.users.forEach(user => {
      if (user.user.login === this.currentAccount.login) {
        crowdHasUserBool = true;
      }
    });
    return crowdHasUserBool;
  }

  addUserToCrowd(crowd: ICrowd) {
    crowd.users.push(this.currentUser);
    this.crowdService.update(crowd).subscribe(event => {
      alert('Added user succesfully');
    });
    this.loadAll();
    let showUserCrowdsOnly = <HTMLInputElement>document.getElementById('userCrowdsOnly');
    showUserCrowdsOnly.checked = false;
  }

  removeUserFromCrowd(crowd: ICrowd) {
    crowd.users.forEach(userExtra => {
      if (userExtra.id === this.currentUser.id) {
        crowd.users.splice(crowd.users.indexOf(userExtra), 1);
      }
    });
    this.crowdService.update(crowd).subscribe(event => {
      alert('Removed user succesfully');
    });
    this.loadAll();
    let showUserCrowdsOnly = <HTMLInputElement>document.getElementById('userCrowdsOnly');
    showUserCrowdsOnly.checked = false;
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCrowds();

    let showUserCrowdsOnly = <HTMLInputElement>document.getElementById('userCrowdsOnly');

    showUserCrowdsOnly.addEventListener(
      'input',
      () => {
        if (showUserCrowdsOnly.checked === true) {
          this.crowds = this.userCrowds;
        } else {
          this.crowds = this.allCrowds;
        }
      },
      false
    );
  }

  isUserAccepted(crowd: ICrowd, user: IUserExtra): boolean {
    let isAccepted: boolean = false;
    crowd.accepteds.forEach(accepted => {
      if (accepted.id === user.id) {
        isAccepted = true;
        return isAccepted;
      }
    });
    return isAccepted;
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICrowd) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInCrowds() {
    this.eventSubscriber = this.eventManager.subscribe('crowdListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
