/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VaultOfAudioTestModule } from '../../../test.module';
import { GroupListDetailComponent } from 'app/entities/group-list/group-list-detail.component';
import { GroupList } from 'app/shared/model/group-list.model';

describe('Component Tests', () => {
  describe('GroupList Management Detail Component', () => {
    let comp: GroupListDetailComponent;
    let fixture: ComponentFixture<GroupListDetailComponent>;
    const route = ({ data: of({ groupList: new GroupList(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [GroupListDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GroupListDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GroupListDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.groupList).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
