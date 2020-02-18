/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VaultOfAudioTestModule } from '../../../test.module';
import { ListSongDetailComponent } from 'app/entities/list-song/list-song-detail.component';
import { ListSong } from 'app/shared/model/list-song.model';

describe('Component Tests', () => {
  describe('ListSong Management Detail Component', () => {
    let comp: ListSongDetailComponent;
    let fixture: ComponentFixture<ListSongDetailComponent>;
    const route = ({ data: of({ listSong: new ListSong(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [ListSongDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ListSongDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ListSongDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.listSong).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
