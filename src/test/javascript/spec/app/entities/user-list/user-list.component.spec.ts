/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VaultOfAudioTestModule } from '../../../test.module';
import { UserListComponent } from 'app/entities/user-list/user-list.component';
import { UserListService } from 'app/entities/user-list/user-list.service';
import { UserList } from 'app/shared/model/user-list.model';

describe('Component Tests', () => {
  describe('UserList Management Component', () => {
    let comp: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;
    let service: UserListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [UserListComponent],
        providers: []
      })
        .overrideTemplate(UserListComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserListComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserListService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserList(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userLists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
