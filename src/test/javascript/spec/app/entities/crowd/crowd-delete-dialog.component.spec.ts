/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { VaultOfAudioTestModule } from '../../../test.module';
import { CrowdDeleteDialogComponent } from 'app/entities/crowd/crowd-delete-dialog.component';
import { CrowdService } from 'app/entities/crowd/crowd.service';

describe('Component Tests', () => {
  describe('Crowd Management Delete Component', () => {
    let comp: CrowdDeleteDialogComponent;
    let fixture: ComponentFixture<CrowdDeleteDialogComponent>;
    let service: CrowdService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [CrowdDeleteDialogComponent]
      })
        .overrideTemplate(CrowdDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CrowdDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CrowdService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
