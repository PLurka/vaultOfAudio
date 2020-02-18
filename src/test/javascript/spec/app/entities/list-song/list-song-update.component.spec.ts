/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { VaultOfAudioTestModule } from '../../../test.module';
import { ListSongUpdateComponent } from 'app/entities/list-song/list-song-update.component';
import { ListSongService } from 'app/entities/list-song/list-song.service';
import { ListSong } from 'app/shared/model/list-song.model';

describe('Component Tests', () => {
  describe('ListSong Management Update Component', () => {
    let comp: ListSongUpdateComponent;
    let fixture: ComponentFixture<ListSongUpdateComponent>;
    let service: ListSongService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [ListSongUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ListSongUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ListSongUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ListSongService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ListSong(123);
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
        const entity = new ListSong();
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
