/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { EqualizerSettingService } from 'app/entities/equalizer-setting/equalizer-setting.service';
import { IEqualizerSetting, EqualizerSetting } from 'app/shared/model/equalizer-setting.model';

describe('Service Tests', () => {
  describe('EqualizerSetting Service', () => {
    let injector: TestBed;
    let service: EqualizerSettingService;
    let httpMock: HttpTestingController;
    let elemDefault: IEqualizerSetting;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(EqualizerSettingService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new EqualizerSetting(0, 'AAAAAAA', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a EqualizerSetting', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new EqualizerSetting(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a EqualizerSetting', async () => {
        const returnedFromService = Object.assign(
          {
            equalizerName: 'BBBBBB',
            first: 1,
            second: 1,
            third: 1,
            fourth: 1,
            fifth: 1,
            sixth: 1,
            seventh: 1,
            eight: 1,
            ninth: 1,
            tenth: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of EqualizerSetting', async () => {
        const returnedFromService = Object.assign(
          {
            equalizerName: 'BBBBBB',
            first: 1,
            second: 1,
            third: 1,
            fourth: 1,
            fifth: 1,
            sixth: 1,
            seventh: 1,
            eight: 1,
            ninth: 1,
            tenth: 1
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a EqualizerSetting', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
