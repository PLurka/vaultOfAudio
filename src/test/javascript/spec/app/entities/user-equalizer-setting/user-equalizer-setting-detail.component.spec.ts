/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VaultOfAudioTestModule } from '../../../test.module';
import { UserEqualizerSettingDetailComponent } from 'app/entities/user-equalizer-setting/user-equalizer-setting-detail.component';
import { UserEqualizerSetting } from 'app/shared/model/user-equalizer-setting.model';

describe('Component Tests', () => {
  describe('UserEqualizerSetting Management Detail Component', () => {
    let comp: UserEqualizerSettingDetailComponent;
    let fixture: ComponentFixture<UserEqualizerSettingDetailComponent>;
    const route = ({ data: of({ userEqualizerSetting: new UserEqualizerSetting(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [UserEqualizerSettingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserEqualizerSettingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserEqualizerSettingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userEqualizerSetting).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
