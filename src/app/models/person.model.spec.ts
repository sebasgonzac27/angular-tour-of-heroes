// person.spec.ts
import Person from './person.model'; // Asegúrate de que la ruta es correcta

describe('Person', () => {
  let person: Person;

  beforeEach(() => {
    // Inicialización previa a cada prueba, si es necesario
  });

  it('should return "Bajo de peso" for IMC < 18.5', () => {
    person = new Person('Test User', 25, 50, 1.80); // IMC = 15.43
    expect(person.calcIMC()).toBe('Bajo de peso');
  });

  it('should return "Peso normal" for 18.5 <= IMC < 24.9', () => {
    person = new Person('Test User', 25, 70, 1.75); // IMC = 22.86
    expect(person.calcIMC()).toBe('Peso normal');
  });

  it('should return "Sobrepeso" for 24.9 <= IMC < 29.9', () => {
    person = new Person('Test User', 25, 80, 1.75); // IMC = 26.12
    expect(person.calcIMC()).toBe('Sobrepeso');
  });

  it('should return "Obesidad grado 1" for 29.9 <= IMC < 34.9', () => {
    person = new Person('Test User', 25, 90, 1.70); // IMC = 31.14
    expect(person.calcIMC()).toBe('Obesidad grado 1');
  });

  it('should return "Obesidad grado 2" for 34.9 <= IMC < 39.9', () => {
    person = new Person('Test User', 25, 98, 1.65); // IMC = 35.98
    expect(person.calcIMC()).toBe('Obesidad grado 2');
  });

  it('should return "Obesidad grado 3" for IMC >= 39.9', () => {
    person = new Person('Test User', 25, 120, 1.70); // IMC = 41.52
    expect(person.calcIMC()).toBe('Obesidad grado 3');
  });
});
