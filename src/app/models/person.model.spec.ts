import Person from "./person.model"

describe('Person Model', () => {
    let person: Person;

    beforeEach(() => {
        person = new Person('Juan', 30, 70, 1.70);
    });

    it('should create an instance', () => {
        expect(person).toBeTruthy();
    });

    it('should set the correct attributes', () => {
        expect(person.name).toBe('Juan');
        expect(person.age).toBe(30);
        expect(person.weight).toBe(70);
        expect(person.height).toBe(1.70);
    });

    it('should calculate the correct IMC', () => {
        expect(person.calcIMC()).toBe('Peso normal');
    });
})