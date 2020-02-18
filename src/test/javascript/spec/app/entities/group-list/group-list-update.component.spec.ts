/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { VaultOfAudioTestModule } from '../../../test.module';
import { GroupListUpdateComponent } from 'app/entities/group-list/group-list-update.component';
import { GroupListService } from 'app/entities/group-list/group-list.service';
import { GroupList } from 'app/shared/model/group-list.model';

describe('Component Tests', () => {
  describe('GroupList Management Update Component', () => {
    let comp: GroupListUpdateComponent;
    let fixture: ComponentFixture<GroupListUpdateComponent>;
    let service: GroupListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [GroupListUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GroupListUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GroupListUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GroupListService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GroupList(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new GroupList();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
