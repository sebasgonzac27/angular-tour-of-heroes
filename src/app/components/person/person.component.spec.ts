import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import Person from 'src/app/models/person.model';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = new Person('Juan', 30, 80, 1.80)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // nativeElement: es específico al DOM de navegadores.
  it('nativeElement: should have <p> with "Person works!"', () => {
    const personElement: HTMLElement = fixture.nativeElement;
    const p = personElement.querySelector('p');

    expect(p?.textContent).toMatch(/person works!/i);
  })

  // debugElement: es agnóstico al DOM.
  it('debugElement: should have <p> with "Person works!"', () => {
    const personDebug: DebugElement = fixture.debugElement;
    const personElement: HTMLElement = personDebug.nativeElement;
    const p = personElement.querySelector('p');

    expect(p?.textContent).toMatch(/person works!/i);
  });

  // byCss: es una función que recibe un selector CSS y devuelve un DebugElement.
  it('byCss: should have <h1> with "Person"', () => {
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h1'));
    const h3: HTMLElement = h3Debug.nativeElement;

    expect(h3?.textContent).toMatch(/person/i);
  });
});
