/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { VaultOfAudioTestModule } from '../../../test.module';
import { UserSongUpdateComponent } from 'app/entities/user-song/user-song-update.component';
import { UserSongService } from 'app/entities/user-song/user-song.service';
import { UserSong } from 'app/shared/model/user-song.model';

describe('Component Tests', () => {
  describe('UserSong Management Update Component', () => {
    let comp: UserSongUpdateComponent;
    let fixture: ComponentFixture<UserSongUpdateComponent>;
    let service: UserSongService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [UserSongUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UserSongUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserSongUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserSongService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserSong(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserSong();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
