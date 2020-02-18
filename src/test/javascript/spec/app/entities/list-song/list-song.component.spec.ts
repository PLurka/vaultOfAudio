/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VaultOfAudioTestModule } from '../../../test.module';
import { ListSongComponent } from 'app/entities/list-song/list-song.component';
import { ListSongService } from 'app/entities/list-song/list-song.service';
import { ListSong } from 'app/shared/model/list-song.model';

describe('Component Tests', () => {
  describe('ListSong Management Component', () => {
    let comp: ListSongComponent;
    let fixture: ComponentFixture<ListSongComponent>;
    let service: ListSongService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [ListSongComponent],
        providers: []
      })
        .overrideTemplate(ListSongComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ListSongComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ListSongService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ListSong(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.listSongs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
