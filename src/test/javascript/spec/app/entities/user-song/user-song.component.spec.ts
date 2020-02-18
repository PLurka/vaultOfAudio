/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VaultOfAudioTestModule } from '../../../test.module';
import { UserSongComponent } from 'app/entities/user-song/user-song.component';
import { UserSongService } from 'app/entities/user-song/user-song.service';
import { UserSong } from 'app/shared/model/user-song.model';

describe('Component Tests', () => {
  describe('UserSong Management Component', () => {
    let comp: UserSongComponent;
    let fixture: ComponentFixture<UserSongComponent>;
    let service: UserSongService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VaultOfAudioTestModule],
        declarations: [UserSongComponent],
        providers: []
      })
        .overrideTemplate(UserSongComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserSongComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserSongService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserSong(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userSongs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
