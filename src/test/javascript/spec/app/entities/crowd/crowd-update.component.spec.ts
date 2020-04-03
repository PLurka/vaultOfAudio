/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { VaultOfAudioTestModule } from '../../../test.module';
import { CrowdUpdateComponent } from 'app/entities/crowd/crowd-update.component';
import { CrowdService } from 'app/entities/crowd/crowd.service';
import { Crowd } from 'app/shared/model/crowd.model';

describe('Component Tests', () => {
  describe('Crowd Management Update Component', () => {
    let comp: CrowdUpdateComponent;
    let fixture: ComponentFixture<CrowdUpdateComponent>;
    let service: CrowdService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [CrowdUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CrowdUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CrowdUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CrowdService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Crowd(123);
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
        const entity = new Crowd();
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
