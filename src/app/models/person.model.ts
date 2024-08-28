export default class Person {
    name: string;
    age: number;
    weight: number;
    height: number;

    constructor(name: string, age: number, weight: number, height: number) {
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.height = height;
    }

    calcIMC(): string {
        let imc = this.weight / (this.height * this.height);
        if (imc < 18.5) {
            return "Bajo de peso";
        } else if (imc < 24.9) {
            return "Peso normal";
        } else if (imc < 29.9) {
            return "Sobrepeso";
        } else if (imc < 34.9) {
            return "Obesidad grado 1";
        } else if (imc < 39.9) {
            return "Obesidad grado 2";
        } else {
            return "Obesidad grado 3";
        }
    }
}