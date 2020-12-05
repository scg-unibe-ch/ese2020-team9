import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

fdescribe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpTestingController]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  afterEach(() => {
      httpTestingController.verify();
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user', () => {
    const mockUser = {
          userId: 1,
          userName: 'Nora'
        };
    console.log(service.getUser(1));
    service.getUser(1)
          .subscribe(userData => {
            expect(userData).toEqual(1);
          });
    const req = httpTestingController.expectOne('http://localhost:4200/user/1');

    expect(req.request.method).toEqual('GET');

    req.flush(mockUser);

  });



});
