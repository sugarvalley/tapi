import {faker} from '@faker-js/faker';
import {addDays, addMinutes, endOfWeek, startOfWeek} from "date-fns";

const DEFAULT_FROM_DATE = addDays(startOfWeek(new Date(), {weekStartsOn: 1}), 1);
const DEFAULT_TO_DATE = endOfWeek(new Date(), {weekStartsOn: 1});

export const getStudent = (id) => {
    faker.seed(Number(id));
    return {
        id: id,
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email(),
    };
}

export const getCourse = (id) => {
    faker.seed(Number(id));
    return {
        id: id,
        name: faker.word.noun(),
    };
}