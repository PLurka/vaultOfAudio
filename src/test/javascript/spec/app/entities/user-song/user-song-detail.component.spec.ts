/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VaultOfAudioTestModule } from '../../../test.module';
import { UserSongDetailComponent } from 'app/entities/user-song/user-song-detail.component';
import { UserSong } from 'app/shared/model/user-song.model';

describe('Component Tests', () => {
  describe('UserSong Management Detail Component', () => {
    let comp: UserSongDetailComponent;
    let fixture: ComponentFixture<UserSongDetailComponent>;
    const route = ({ data: of({ userSong: new UserSong(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [UserSongDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserSongDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserSongDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userSong).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
