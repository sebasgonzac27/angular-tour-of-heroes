import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { HeroService } from 'src/app/services/hero/hero.service';
import { of } from 'rxjs';
import { FormBuilder, FormsModule } from '@angular/forms';
import { generateManyHeroes, generateOneHero } from 'src/app/models/hero.mock';
import { Hero } from 'src/app/models/hero';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      imports:[FormsModule],
      providers: [
        {
          provide: HeroService,
          useValue: jasmine.createSpyObj('HeroService', ['getHeroes', 'addHero', 'deleteHero'])
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    heroService.getHeroes.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // getHeroes
  it('getHeroes: should call heroService.getHeroes', () => {
    const mockHeroes = generateManyHeroes();
    heroService.getHeroes.and.returnValue(of(mockHeroes));

    component.getHeroes();

    expect(heroService.getHeroes).toHaveBeenCalled();
    expect(component.heroes).toEqual(mockHeroes);
  });

  // add
  it('add: should call heroService.addHero when newHero is not empty', () => {
    const mockHero = generateOneHero();
    component.newHero = mockHero.name;
    heroService.addHero.and.returnValue(of(mockHero));

    component.add();

    expect(heroService.addHero).toHaveBeenCalledWith({ name: mockHero.name } as Hero);
    expect(component.heroes).toContain(mockHero);
  });

  it('add: should not call heroService.addHero when newHero is empty', () => {
    component.newHero = '';

    component.add();

    expect(heroService.addHero).not.toHaveBeenCalled();
  });

  // delete
  it('delete: should call heroService.deleteHero and remove hero from heroes', () => {
    const mockHeroes = generateManyHeroes();
    const heroToDelete = mockHeroes[0];
    component.heroes = mockHeroes;
    heroService.deleteHero.and.returnValue(of());

    component.delete(heroToDelete);

    expect(heroService.deleteHero).toHaveBeenCalledWith(heroToDelete.id);
    expect(component.heroes).not.toContain(heroToDelete);
  });
});
