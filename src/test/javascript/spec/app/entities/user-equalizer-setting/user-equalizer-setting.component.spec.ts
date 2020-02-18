/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VaultOfAudioTestModule } from '../../../test.module';
import { UserEqualizerSettingComponent } from 'app/entities/user-equalizer-setting/user-equalizer-setting.component';
import { UserEqualizerSettingService } from 'app/entities/user-equalizer-setting/user-equalizer-setting.service';
import { UserEqualizerSetting } from 'app/shared/model/user-equalizer-setting.model';

describe('Component Tests', () => {
  describe('UserEqualizerSetting Management Component', () => {
    let comp: UserEqualizerSettingComponent;
    let fixture: ComponentFixture<UserEqualizerSettingComponent>;
    let service: UserEqualizerSettingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [UserEqualizerSettingComponent],
        providers: []
      })
        .overrideTemplate(UserEqualizerSettingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserEqualizerSettingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserEqualizerSettingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserEqualizerSetting(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userEqualizerSettings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
