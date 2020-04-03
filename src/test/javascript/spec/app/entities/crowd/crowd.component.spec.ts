/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VaultOfAudioTestModule } from '../../../test.module';
import { CrowdComponent } from 'app/entities/crowd/crowd.component';
import { CrowdService } from 'app/entities/crowd/crowd.service';
import { Crowd } from 'app/shared/model/crowd.model';

describe('Component Tests', () => {
  describe('Crowd Management Component', () => {
    let comp: CrowdComponent;
    let fixture: ComponentFixture<CrowdComponent>;
    let service: CrowdService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [CrowdComponent],
        providers: []
      })
        .overrideTemplate(CrowdComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CrowdComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CrowdService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Crowd(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.crowds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
