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

export const stableTestUser = {
    email: 'test_test_test@gmail.com',
    password: 'test_test_test',
    first_name: 'Test',
    last_name: 'Test',
    address: '12 Bridge Street',
    country: Country.AUSTRALIA,
    state: 'NSW',
    city: 'Sydney',
    zipcode: '2000',
    phone_number: '+61(02)67150249'
}
