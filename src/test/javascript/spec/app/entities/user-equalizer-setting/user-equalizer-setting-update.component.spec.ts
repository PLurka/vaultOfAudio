/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { VaultOfAudioTestModule } from '../../../test.module';
import { UserEqualizerSettingUpdateComponent } from 'app/entities/user-equalizer-setting/user-equalizer-setting-update.component';
import { UserEqualizerSettingService } from 'app/entities/user-equalizer-setting/user-equalizer-setting.service';
import { UserEqualizerSetting } from 'app/shared/model/user-equalizer-setting.model';

describe('Component Tests', () => {
  describe('UserEqualizerSetting Management Update Component', () => {
    let comp: UserEqualizerSettingUpdateComponent;
    let fixture: ComponentFixture<UserEqualizerSettingUpdateComponent>;
    let service: UserEqualizerSettingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [UserEqualizerSettingUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UserEqualizerSettingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserEqualizerSettingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserEqualizerSettingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserEqualizerSetting(123);
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
        const entity = new UserEqualizerSetting();
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
