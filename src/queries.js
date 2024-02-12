import { Op } from 'sequelize';
import { Animal, Human } from './model.js';




export const query1 = async () => await Human.findByPk(2);


// Get the first animal whose species is "fish"
export const query2 = async () => await Animal.findOne({ where: { species: 'fish' } });

// Get all animals belonging to the human with primary key 5
export const query3 = async () => await Animal.findAll({ where: { human_id: 5 } });

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = async () => await Animal.findAll({ where: { birth_year: { [Op.gt]: 2015 } } });

// Get all the humans with first names that start with "J"
export const query5 = async () => await Human.findAll({ where: { fname: { [Op.startsWith]: 'J' } } });

// Get all the animals who don't have a birth year
export const query6 = async () => await Animal.findAll({ where: { birth_year: null } });

// Get all the animals with species "fish" OR "rabbit"
export const query7 = async () => await Animal.findAll({ where: { species: { [Op.or]: ['fish', 'rabbit'] } } });

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = async () => await Human.findAll({ where: { email: { [Op.notLike]: '%gmail%' } } });

// Continue reading the instructions before you move on!

// Print a directory of humans and their animals
export async function printHumansAndAnimals() {
    const humans = await Human.findAll({ include: Animal });
    for (const human of humans) {
        console.log(`${human.getFullName()} has:`);
        for (const animal of human.animals) {
            console.log(`  - ${animal.name}, a ${animal.species}`);
        }
    }
}

// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {
    const humans = await Human.findAll({ include: Animal, where: { 'animals.species': species } });
    return new Set(humans.map((human) => human.getFullName()));
}
