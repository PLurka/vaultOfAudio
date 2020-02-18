/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { VaultOfAudioTestModule } from '../../../test.module';
import { EqualizerSettingUpdateComponent } from 'app/entities/equalizer-setting/equalizer-setting-update.component';
import { EqualizerSettingService } from 'app/entities/equalizer-setting/equalizer-setting.service';
import { EqualizerSetting } from 'app/shared/model/equalizer-setting.model';

describe('Component Tests', () => {
  describe('EqualizerSetting Management Update Component', () => {
    let comp: EqualizerSettingUpdateComponent;
    let fixture: ComponentFixture<EqualizerSettingUpdateComponent>;
    let service: EqualizerSettingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [EqualizerSettingUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EqualizerSettingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EqualizerSettingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EqualizerSettingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EqualizerSetting(123);
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
        const entity = new EqualizerSetting();
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
