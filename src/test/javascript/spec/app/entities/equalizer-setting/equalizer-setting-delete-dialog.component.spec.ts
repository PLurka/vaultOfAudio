/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { VaultOfAudioTestModule } from '../../../test.module';
import { EqualizerSettingDeleteDialogComponent } from 'app/entities/equalizer-setting/equalizer-setting-delete-dialog.component';
import { EqualizerSettingService } from 'app/entities/equalizer-setting/equalizer-setting.service';

describe('Component Tests', () => {
  describe('EqualizerSetting Management Delete Component', () => {
    let comp: EqualizerSettingDeleteDialogComponent;
    let fixture: ComponentFixture<EqualizerSettingDeleteDialogComponent>;
    let service: EqualizerSettingService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [EqualizerSettingDeleteDialogComponent]
      })
        .overrideTemplate(EqualizerSettingDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EqualizerSettingDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EqualizerSettingService);
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
