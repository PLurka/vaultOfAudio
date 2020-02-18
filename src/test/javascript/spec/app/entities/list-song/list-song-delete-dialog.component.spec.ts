/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { VaultOfAudioTestModule } from '../../../test.module';
import { ListSongDeleteDialogComponent } from 'app/entities/list-song/list-song-delete-dialog.component';
import { ListSongService } from 'app/entities/list-song/list-song.service';

describe('Component Tests', () => {
  describe('ListSong Management Delete Component', () => {
    let comp: ListSongDeleteDialogComponent;
    let fixture: ComponentFixture<ListSongDeleteDialogComponent>;
    let service: ListSongService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [ListSongDeleteDialogComponent]
      })
        .overrideTemplate(ListSongDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ListSongDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ListSongService);
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
