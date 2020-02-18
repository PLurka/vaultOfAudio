/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VaultOfAudioTestModule } from '../../../test.module';
import { UserListDetailComponent } from 'app/entities/user-list/user-list-detail.component';
import { UserList } from 'app/shared/model/user-list.model';

describe('Component Tests', () => {
  describe('UserList Management Detail Component', () => {
    let comp: UserListDetailComponent;
    let fixture: ComponentFixture<UserListDetailComponent>;
    const route = ({ data: of({ userList: new UserList(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [UserListDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserListDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserListDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userList).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
