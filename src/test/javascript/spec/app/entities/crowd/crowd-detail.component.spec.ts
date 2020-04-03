/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VaultOfAudioTestModule } from '../../../test.module';
import { CrowdDetailComponent } from 'app/entities/crowd/crowd-detail.component';
import { Crowd } from 'app/shared/model/crowd.model';

describe('Component Tests', () => {
  describe('Crowd Management Detail Component', () => {
    let comp: CrowdDetailComponent;
    let fixture: ComponentFixture<CrowdDetailComponent>;
    const route = ({ data: of({ crowd: new Crowd(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [CrowdDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CrowdDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CrowdDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.crowd).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
