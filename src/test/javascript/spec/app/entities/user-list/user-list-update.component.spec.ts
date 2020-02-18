/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { VaultOfAudioTestModule } from '../../../test.module';
import { UserListUpdateComponent } from 'app/entities/user-list/user-list-update.component';
import { UserListService } from 'app/entities/user-list/user-list.service';
import { UserList } from 'app/shared/model/user-list.model';

describe('Component Tests', () => {
  describe('UserList Management Update Component', () => {
    let comp: UserListUpdateComponent;
    let fixture: ComponentFixture<UserListUpdateComponent>;
    let service: UserListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [UserListUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UserListUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserListUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserListService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserList(123);
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
        const entity = new UserList();
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
