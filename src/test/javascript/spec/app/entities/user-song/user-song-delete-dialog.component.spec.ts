/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { VaultOfAudioTestModule } from '../../../test.module';
import { UserSongDeleteDialogComponent } from 'app/entities/user-song/user-song-delete-dialog.component';
import { UserSongService } from 'app/entities/user-song/user-song.service';

describe('Component Tests', () => {
  describe('UserSong Management Delete Component', () => {
    let comp: UserSongDeleteDialogComponent;
    let fixture: ComponentFixture<UserSongDeleteDialogComponent>;
    let service: UserSongService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [UserSongDeleteDialogComponent]
      })
        .overrideTemplate(UserSongDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserSongDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserSongService);
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
