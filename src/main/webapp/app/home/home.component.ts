import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { filter, map } from 'rxjs/operators';

import { LoginModalService, AccountService, Account, UserService, User } from 'app/core';
import { CrowdService } from 'app/entities/crowd';
import { Crowd, ICrowd } from 'app/shared/model/crowd.model';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  account: Account;
  modalRef: NgbModalRef;
  crowds: ICrowd[];
  usersDivide: ICrowd[];
  acceptedsDivide: ICrowd[];
  currentUser: IUserExtra;

  constructor(
    private accountService: AccountService,
    protected userExtraService: UserExtraService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    protected jhiAlertService: JhiAlertService,
    private crowdService: CrowdService
  ) {
    this.loadAllCrowds();
    this.userExtraService
      .query()
      .pipe(
        filter((res: HttpResponse<IUserExtra[]>) => res.ok),
        map((res: HttpResponse<IUserExtra[]>) => res.body)
      )
      .subscribe((res: IUserExtra[]) => {
        if (res != undefined) {
          res.forEach(userExtra => {
            if (userExtra.user.login === this.account.login) this.currentUser = userExtra;
          });
        }
      });
  }

  loadAllCrowds() {
    let usersTemp: ICrowd[] = [];
    let acceptedsTemp: ICrowd[] = [];
    this.crowdService
      .query()
      .pipe(
        filter((res: HttpResponse<ICrowd[]>) => res.ok),
        map((res: HttpResponse<ICrowd[]>) => res.body)
      )
      .subscribe(
        (res: ICrowd[]) => {
          if (res != undefined) {
            this.crowds = res;
            this.crowds.forEach(crowd => {
              crowd.users.forEach(user => {
                let userCrowd = new Crowd(
                  crowd.id,
                  crowd.crowdName,
                  crowd.crowdDescription,
                  crowd.crowdPhotoContentType,
                  crowd.crowdPhoto,
                  crowd.users,
                  crowd.accepteds,
                  crowd.playlists,
                  crowd.createdBy
                );
                userCrowd.users = [];
                userCrowd.users.push(user);
                usersTemp.push(userCrowd);
                console.error('userCrowdUser: ' + userCrowd.users[0]['login']);
              });
              crowd.accepteds.forEach(accepted => {
                let userCrowd = new Crowd(
                  crowd.id,
                  crowd.crowdName,
                  crowd.crowdDescription,
                  crowd.crowdPhotoContentType,
                  crowd.crowdPhoto,
                  crowd.users,
                  crowd.accepteds,
                  crowd.playlists,
                  crowd.createdBy
                );
                userCrowd.accepteds = [];
                userCrowd.accepteds.push(accepted);
                acceptedsTemp.push(userCrowd);
              });
            });
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.usersDivide = usersTemp;
    this.acceptedsDivide = acceptedsTemp;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  isRequestAccepted(user: IUserExtra, crowd: ICrowd): boolean {
    let isAccepted: boolean = false;
    this.crowds.forEach(currentCrowd => {
      if (currentCrowd.id === crowd.id) {
        currentCrowd.accepteds.forEach(accepted => {
          if (accepted.id === user.id) isAccepted = true;
          return true;
        });
      }
    });
    return isAccepted;
  }

  isUserAccepted(user: IUserExtra, crowd: ICrowd) {
    let isAccepted: boolean = false;
    this.crowds.forEach(currentCrowd => {
      if (currentCrowd.id === crowd.id) {
        currentCrowd.users.forEach(usr => {
          if (usr.id === user.id) isAccepted = true;
          return true;
        });
      }
    });
    return isAccepted;
  }

  addUserToCrowd(crowd: ICrowd, user: IUserExtra) {
    crowd.users.push(user);
    this.crowdService.update(crowd).subscribe(event => {
      alert('Added user succesfully');
    });
  }

  removeUserFromCrowd(crowd: ICrowd, user: IUserExtra) {
    crowd.users.forEach(userExtra => {
      if (userExtra.id === user.id) {
        crowd.users.splice(crowd.users.indexOf(userExtra), 1);
      }
    });
    this.crowdService.update(crowd).subscribe(event => {
      alert('Removed user succesfully');
    });
  }

  addCrowdToUser(crowd: ICrowd, user: IUserExtra) {
    crowd.accepteds.push(user);
    this.crowdService.update(crowd).subscribe(event => {
      alert('Added user succesfully');
    });
  }

  removeCrowdFromUser(crowd: ICrowd, user: IUserExtra) {
    crowd.accepteds.forEach(userExtra => {
      if (userExtra.id === user.id) {
        crowd.accepteds.splice(crowd.accepteds.indexOf(userExtra), 1);
      }
    });
    this.crowdService.update(crowd).subscribe(event => {
      alert('Removed user succesfully');
    });
  }

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
    console.error(this.accountService);
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }
}
