import {Country} from "../src/types/country";

export const testUser = {
    name: 'Test User',
    password: 'test_test_test',

    generateEmail() {
        return `test_${Date.now()}@test.com`;
    },

    first_name: 'Test',
    last_name: 'User',
    address: '12 Bridge Street',
    country: Country.AUSTRALIA,
    state: 'NSW',
    city: 'Sydney',
    zipcode: '2000',
    phone_number: '0400000000'
} as const
