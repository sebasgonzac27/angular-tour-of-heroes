import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MessagesService } from '../messages/messages.service';
import { Hero } from '../../models/hero';
import { generateManyHeroes, generateOneHero } from 'src/app/models/hero.mock';
import { HTTP_INTERCEPTORS, HttpStatusCode } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { TokenService } from '../token/token.service';

const mockHeroesUrl = 'api/heroes';

describe('HeroService', () => {
  let heroService: HeroService;
  let messagesServiceSpy: jasmine.SpyObj<MessagesService>;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MessagesService', ['add']);

    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        TokenService,
        { provide: MessagesService, useValue: spy },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
      ],
    });

    heroService = TestBed.inject(HeroService);
    messagesServiceSpy = TestBed.inject(MessagesService) as jasmine.SpyObj<MessagesService>;
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  // getHeroes
  it('getHeroes: should return expected heroes', (doneFn: DoneFn) => {
    const expectedHeroes = generateManyHeroes(10);

    spyOn(tokenService, 'getToken').and.returnValue('123');

    heroService.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(expectedHeroes);
      expect(messagesServiceSpy.add).toHaveBeenCalledTimes(1);
      doneFn();
    })

    const req = httpController.expectOne(mockHeroesUrl);
    req.flush(expectedHeroes);

    expect(req.request.headers.get('Authorization')).toEqual('Bearer 123');
    expect(req.request.method).toBe('GET');
  });

  it('getHeroes: should return empty array when an error ocurred', (doneFn: DoneFn) => {
    const mockError = {
      status: HttpStatusCode.NotFound,
      statusText: 'Not Found'
    };

    const spy = spyOn(console, 'error');

    heroService.getHeroes().subscribe({
      next: (heroes) => {
        expect(heroes).toEqual([]);
        doneFn();
      },
      error: (error) => {
        expect(error).toEqual(mockError);
        expect(spy).toHaveBeenCalled();
        expect(messagesServiceSpy.add).toHaveBeenCalledTimes(1);
        doneFn();
      }
    })

    const req = httpController.expectOne(mockHeroesUrl);
    req.flush([], mockError);

    expect(req.request.method).toBe('GET');
  });

  // getHero
  it('getHero: should return expected hero', (doneFn: DoneFn) => {
    const expectedHero = generateOneHero();

    heroService.getHero(expectedHero.id).subscribe((hero) => {
      expect(hero).toEqual(expectedHero);
      expect(messagesServiceSpy.add).toHaveBeenCalledTimes(1);
      doneFn();
    })

    const req = httpController.expectOne(`${mockHeroesUrl}/${expectedHero.id}`);
    req.flush(expectedHero);

    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe(`${mockHeroesUrl}/${expectedHero.id}`);
  })

  // addHero
  it('addHero: should return a new product', (doneFn: DoneFn) => {
    const newHero = {name: 'new hero'} as Hero;

    heroService.addHero(newHero).subscribe((hero) => {
      expect(hero).toEqual(newHero);
      expect(messagesServiceSpy.add).toHaveBeenCalledTimes(1);
      doneFn();
    })

    const req = httpController.expectOne(mockHeroesUrl);
    req.flush(newHero);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newHero);
  });

  // updateHero
  it('updateHero: should return updated hero', (doneFn: DoneFn) => {
    const updatedHero = generateOneHero();

    heroService.updateHero(updatedHero).subscribe((hero) => {
      expect(hero).toEqual(updatedHero);
      expect(messagesServiceSpy.add).toHaveBeenCalledTimes(1);
      doneFn();
    });

    const req = httpController.expectOne(mockHeroesUrl);
    req.flush(updatedHero);

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedHero);
  });

  // deleteHero
  it('deleteHero: should return deleted hero', (doneFn: DoneFn) => {
    const deletedHero = generateOneHero();

    heroService.deleteHero(deletedHero.id).subscribe((hero) => {
      expect(hero).toEqual(deletedHero);
      expect(messagesServiceSpy.add).toHaveBeenCalledTimes(1);
      doneFn();
    });

    const req = httpController.expectOne(`${mockHeroesUrl}/${deletedHero.id}`);
    req.flush(deletedHero);

    expect(req.request.method).toBe('DELETE');
  })

  // searchHeroes
  it('searchHeroes: should return heroes matching search term', (doneFn: DoneFn) => {
    const searchTerm = 'search term';
    const expectedHeroes = generateManyHeroes(5);

    heroService.searchHeroes(searchTerm).subscribe((heroes) => {
      expect(heroes).toEqual(expectedHeroes);
      expect(messagesServiceSpy.add).toHaveBeenCalledTimes(1);
      doneFn();
    });

    const req = httpController.expectOne(`${mockHeroesUrl}/?name=${searchTerm}`);
    req.flush(expectedHeroes);

    expect(req.request.method).toBe('GET');
  });

  it('searchHeroes: should return empty when not found heroes with name equal to searh term', (doneFn: DoneFn) => {
    const searchTerm = 'search term';
    const expectedHeroes: Hero[] = []

    heroService.searchHeroes(searchTerm).subscribe((heroes) => {
      expect(heroes).toEqual(expectedHeroes);
      expect(messagesServiceSpy.add).toHaveBeenCalledTimes(1);
      doneFn();
    });

    const req = httpController.expectOne(`${mockHeroesUrl}/?name=${searchTerm}`);
    req.flush(expectedHeroes);

    expect(req.request.method).toBe('GET');
  });

  it('searchHeroes: should return empty array when is not term provided', (doneFn: DoneFn) => {
    const searchTerm = '';
    const expectedHeroes: Hero[] = [];

    heroService.searchHeroes(searchTerm).subscribe((heroes) => {
      expect(heroes).toEqual(expectedHeroes);
      expect(messagesServiceSpy.add).not.toHaveBeenCalled();
      doneFn();
    });
  });

});
