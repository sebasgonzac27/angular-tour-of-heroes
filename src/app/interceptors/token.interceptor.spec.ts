import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { TokenService } from '../services/token/token.service';

describe('TokenInterceptor', () => {
  let tokenInterceptor: TokenInterceptor;
  let tokenService: jasmine.SpyObj<TokenService>;

  beforeEach(() =>{
    TestBed.configureTestingModule({
      providers: [
        TokenInterceptor,
        { provide: TokenService, useValue: jasmine.createSpyObj('TokenService', ['getToken']) }
        ]
    });
    tokenInterceptor = TestBed.inject(TokenInterceptor);
    tokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
  });

  it('should be created', () => {
    expect(tokenInterceptor).toBeTruthy();
  });
});
