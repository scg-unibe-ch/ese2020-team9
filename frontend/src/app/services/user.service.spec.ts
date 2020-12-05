import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '../models/user.model';
import { UserService } from './user.service';

fdescribe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  afterEach(() => {
      httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user', () => {
    const mockUser: any = {
        userId: 1,
        userName: 'Nora'
    };

    console.log(service.getUser(1));

    service.getUser(1)
          .subscribe((userData: any) => {
            expect(userData.userId).toEqual(1);
            expect(userData.userName).toEqual('Nora');
    });

    const req = httpTestingController.expectOne('http://localhost:3000/user/1');

    expect(req.request.method).toEqual('GET');

    req.flush(mockUser);

  });



});
