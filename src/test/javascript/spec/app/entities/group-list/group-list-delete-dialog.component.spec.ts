/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { VaultOfAudioTestModule } from '../../../test.module';
import { GroupListDeleteDialogComponent } from 'app/entities/group-list/group-list-delete-dialog.component';
import { GroupListService } from 'app/entities/group-list/group-list.service';

describe('Component Tests', () => {
  describe('GroupList Management Delete Component', () => {
    let comp: GroupListDeleteDialogComponent;
    let fixture: ComponentFixture<GroupListDeleteDialogComponent>;
    let service: GroupListService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [GroupListDeleteDialogComponent]
      })
        .overrideTemplate(GroupListDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GroupListDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GroupListService);
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
