import { Hero } from "./hero";
import {faker} from '@faker-js/faker'

export const generateOneHero = () : Hero => {
    return {
        id: faker.number.int(),
        name: faker.person.firstName()
    }
}

export const generateManyHeroes = (size = 10): Hero[] => {
    return Array.from({length: size}, () => generateOneHero())
}