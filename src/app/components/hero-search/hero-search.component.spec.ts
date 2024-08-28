import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from 'src/app/services/hero/hero.service';
import { of } from 'rxjs';
import { generateManyHeroes } from 'src/app/models/hero.mock';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroService: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroSearchComponent ],
      providers: [
        {
          provide: HeroService,
          useValue: jasmine.createSpyObj('HeroService', ['searchHeroes'])
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    heroService.searchHeroes.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should push a search term into the observable stream', () => {
    spyOn(component['searchTerms'], 'next');
    const term = 'test';
    component.search(term);
    expect(component['searchTerms'].next).toHaveBeenCalledWith(term);
  });

  it('should update heroes$ observable', fakeAsync(() => {
    const mockHeroes = generateManyHeroes(3);
    heroService.searchHeroes.and.returnValue(of(mockHeroes));
    component.search('Superman');

    tick(300);

    component.heroes$.subscribe((heroes) => {
      expect(heroes).toEqual(mockHeroes);
    });
  }));
});
