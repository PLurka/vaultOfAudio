/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VaultOfAudioTestModule } from '../../../test.module';
import { EqualizerSettingDetailComponent } from 'app/entities/equalizer-setting/equalizer-setting-detail.component';
import { EqualizerSetting } from 'app/shared/model/equalizer-setting.model';

describe('Component Tests', () => {
  describe('EqualizerSetting Management Detail Component', () => {
    let comp: EqualizerSettingDetailComponent;
    let fixture: ComponentFixture<EqualizerSettingDetailComponent>;
    const route = ({ data: of({ equalizerSetting: new EqualizerSetting(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [EqualizerSettingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EqualizerSettingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EqualizerSettingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.equalizerSetting).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
