import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ TokenService ]
    });
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // saveToken
  it('saveToken: should save token in local storage', () => {
    const token = 'token';
    const spy = spyOn(localStorage, 'setItem');

    service.saveToken(token);

    expect(spy).toHaveBeenCalledWith('token', token);
  });

  // getToken
  it('getToken: should get token from local storage', () => {
    const mockToken = 'token'
    spyOn(localStorage, 'getItem').and.returnValue(mockToken);

    const token = service.getToken();

    expect(token).toEqual(mockToken);
  });

  // removeToken
  it('removeToken: should remove token from local storage', () => {
    const spy = spyOn(localStorage, 'removeItem');

    service.removeToken();

    expect(spy).toHaveBeenCalledWith('token');
  });
});
