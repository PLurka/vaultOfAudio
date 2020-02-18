/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VaultOfAudioTestModule } from '../../../test.module';
import { EqualizerSettingComponent } from 'app/entities/equalizer-setting/equalizer-setting.component';
import { EqualizerSettingService } from 'app/entities/equalizer-setting/equalizer-setting.service';
import { EqualizerSetting } from 'app/shared/model/equalizer-setting.model';

describe('Component Tests', () => {
  describe('EqualizerSetting Management Component', () => {
    let comp: EqualizerSettingComponent;
    let fixture: ComponentFixture<EqualizerSettingComponent>;
    let service: EqualizerSettingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [EqualizerSettingComponent],
        providers: []
      })
        .overrideTemplate(EqualizerSettingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EqualizerSettingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EqualizerSettingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EqualizerSetting(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.equalizerSettings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
