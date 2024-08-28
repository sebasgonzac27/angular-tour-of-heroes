import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HeroService } from 'src/app/services/hero/hero.service';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { generateManyHeroes } from 'src/app/models/hero.mock';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent, HeroSearchComponent ],
      imports: [],
      providers: [{ provide: HeroService, useValue: jasmine.createSpyObj('HeroService', ['getHeroes']) }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    heroService.getHeroes.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get heroes on init', () => {
    const mockHeroes = generateManyHeroes(10);
    const mockHeroesSliced = mockHeroes.slice(1, 5);
    heroService.getHeroes.and.returnValue(of(mockHeroes));

    component.getHeroes();

    expect(heroService.getHeroes).toHaveBeenCalled();
    expect(component.heroes).toEqual(mockHeroesSliced);
  })

});
