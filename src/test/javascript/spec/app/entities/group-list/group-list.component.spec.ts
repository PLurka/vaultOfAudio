/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VaultOfAudioTestModule } from '../../../test.module';
import { GroupListComponent } from 'app/entities/group-list/group-list.component';
import { GroupListService } from 'app/entities/group-list/group-list.service';
import { GroupList } from 'app/shared/model/group-list.model';

describe('Component Tests', () => {
  describe('GroupList Management Component', () => {
    let comp: GroupListComponent;
    let fixture: ComponentFixture<GroupListComponent>;
    let service: GroupListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [GroupListComponent],
        providers: []
      })
        .overrideTemplate(GroupListComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GroupListComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GroupListService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GroupList(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.groupLists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
