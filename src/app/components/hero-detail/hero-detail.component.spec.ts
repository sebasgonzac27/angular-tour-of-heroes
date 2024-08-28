import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HeroService } from 'src/app/services/hero/hero.service';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { of } from 'rxjs';
import { generateOneHero } from 'src/app/models/hero.mock';
import { FormsModule } from '@angular/forms';


describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let location: jasmine.SpyObj<Location>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async () => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHero', 'updateHero']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    const activatedRouteStub = new ActivatedRouteStub();

    await TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      imports: [ AppRoutingModule, FormsModule ],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: Location, useValue: locationSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    activatedRoute = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
  });

  it('should create', () => {
    const productId = 1;

    const hero = {
      ...generateOneHero(),
      id: productId
    }

    activatedRoute.setParamMap({ id: hero.id });
    heroService.getHero.and.returnValue(of(hero));

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
