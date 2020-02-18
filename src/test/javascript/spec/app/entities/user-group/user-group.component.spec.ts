/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VaultOfAudioTestModule } from '../../../test.module';
import { UserGroupComponent } from 'app/entities/user-group/user-group.component';
import { UserGroupService } from 'app/entities/user-group/user-group.service';
import { UserGroup } from 'app/shared/model/user-group.model';

describe('Component Tests', () => {
  describe('UserGroup Management Component', () => {
    let comp: UserGroupComponent;
    let fixture: ComponentFixture<UserGroupComponent>;
    let service: UserGroupService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [UserGroupComponent],
        providers: []
      })
        .overrideTemplate(UserGroupComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserGroupComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserGroupService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserGroup(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
