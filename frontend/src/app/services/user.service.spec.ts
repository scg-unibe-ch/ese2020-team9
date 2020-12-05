import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
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

    service.getUser(1)
          .subscribe((userData: any) => {
            expect(userData.userId).toEqual(1);
            expect(userData.userName).toEqual('Nora');
    });

    const req = httpTestingController.expectOne('http://localhost:3000/user/1');

    expect(req.request.method).toEqual('GET');

    req.flush(mockUser);

  });

  it('should correctly instantiate userService when nothing in localStorage', () => {
    localStorage.clear();
    const userService = new UserService(httpTestingController as any);
    setTimeout(() => {
    expect(userService.userName).toEqual(null);
    expect(userService.userToken).toEqual(null);
    }, 200);
  });

  it('should correctly instantiate userService when something in localStorage', () => {
    localStorage.setItem('userName', 'Billy');
    localStorage.setItem('userToken', '1234');
    localStorage.setItem('userId', '1');
    localStorage.setItem('userWallet', '500');
    const userService = new UserService(httpTestingController as any);
    setTimeout(() => {
    expect(userService.userName).toEqual('Billy');
    expect(userService.userToken).toEqual('1234');
    expect(userService.userId).toEqual('1');
    expect(userService.userWallet).toEqual('500');
    }, 200);
  });

  it('should correctly empty attributes in userService when logout', () => {
    localStorage.setItem('userName', 'Billy');
    localStorage.setItem('userToken', '1234');
    localStorage.setItem('userId', '1');
    localStorage.setItem('userWallet', '500');
    const userService = new UserService(httpTestingController as any);
    setTimeout(() => {
      expect(userService.userName).toEqual('Billy');
      expect(userService.userToken).toEqual('1234');
      expect(userService.userId).toEqual('1');
      expect(userService.userWallet).toEqual('500');
      userService.logout();
      expect(userService.userName).toEqual(null);
      expect(userService.userToken).toEqual(null);
      expect(userService.userId).toEqual(null);
      expect(userService.userWallet).toEqual(null);
    }, 200);
  });

  it('should set isUserLoggedIn correctly when instantiating', (done: DoneFn) => {
    localStorage.setItem('userName', 'Billy');
    localStorage.setItem('userToken', '1234');
    localStorage.setItem('userId', '1');
    localStorage.setItem('userWallet', '500');
    localStorage.setItem('admin', 'true');
    const userService = new UserService(httpTestingController as any);
    setTimeout(() => {
    userService.isUserLoggedIn.subscribe((val: any) => {
      expect(val).toEqual(true);
      done();
    });
    }, 200);
  });

  it('should set isUserAdmin correctly when instantiating', (done: DoneFn) => {
    localStorage.setItem('userName', 'Billy');
    localStorage.setItem('admin', 'true');
    localStorage.setItem('userToken', '1234');
    localStorage.setItem('userId', '1');
    localStorage.setItem('userWallet', '500');
    const userService = new UserService(httpTestingController as any);
    setTimeout(() => {
    userService.isUserAdmin.subscribe((val: any) => {
      expect(val).toEqual(true);
      done();
    });
    }, 200);
  });

  it('should set isUserName correctly when instantiating', (done: DoneFn) => {
    localStorage.setItem('userName', 'Billy');
    localStorage.setItem('userToken', '1234');
    localStorage.setItem('userId', '1');
    localStorage.setItem('userWallet', '500');
    localStorage.setItem('admin', 'true');
    const userService = new UserService(httpTestingController as any);
    setTimeout(() => {
    userService.isUserName.subscribe((val: any) => {
      expect(val).toEqual('Billy');
      done();
    });
    }, 200);
  });

  it('should perform login request successfully', () => {
    const response = {
      userName: 'Billy',
      userId: 1
    };
    service.login('abc@me.him', '1234').subscribe((res: any) => {
      expect(res.userName).toEqual('Billy');
      expect(res.userId).toEqual(1);
    });
    const req = httpTestingController.expectOne('http://localhost:3000/user/login');
    expect(req.request.method).toEqual('POST');
    console.log(req.request.body);
    expect(req.request.body.userLogin).toEqual('abc@me.him');
    expect(req.request.body.password).toEqual('1234');
    req.flush(response);
  });
});
