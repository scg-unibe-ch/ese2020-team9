import { UserService } from './../../services/user.service';
import { User, UserAttributes } from './../../models/user.model';
import { expect } from 'chai';

describe('UserService Tests', () => {
    describe('Test register', () => {
        const user1: UserAttributes = {
            userId: 1,
            admin: false,
            wallet: 500,
            userName: 'jacky',
            password: 'jacky123',
            userMail: 'jacky@gmail.com',
            firstName: 'Jack',
            lastName: 'Doe',
            gender: 'male',
            phoneNumber: 768927361,
            addressStreet: 'Pinnacle Street',
            addressPin: '77889',
            addressCity: 'Hannington Town',
            addressCountry: 'Saint Isles'
        };
        const testedUserService: UserService = new UserService();

        it('should register user successfully', function(done) {
            testedUserService.register(user1).then(user => {
                expect(user.userName).to.be.eq('jacky');
                expect(user.phoneNumber).to.be.eq(768927361);
                User.findOne({
                    where: {
                        userName: 'jacky'
                    }
                }).then(foundUser => {
                    expect(foundUser).not.to.be.eq(null);
                    expect(foundUser.password).not.to.be.eq('jacky123'); // password must not be stored as plaintext in db
                    done();
                });
            });
        });
        it('should not register user with existing userName', function(done) {
            const user2: UserAttributes = {
                userId: 2,
                admin: false,
                wallet: 500,
                userName: 'jacky',
                password: 'j1234',
                userMail: 'he@me.com',
                firstName: 'Brent',
                lastName: 'Eastwood',
                gender: 'male',
                phoneNumber: 7655555,
                addressStreet: 'Kensington Road',
                addressPin: '4404',
                addressCity: 'Creed Town',
                addressCountry: 'Mercy Islands'
            };
            testedUserService.register(user2).catch(error => {
                expect(error.message).to.be.eq('This username or email address is already being used!');
                done();
            });
        });
        it('should not register user with existing email', function(done) {
            const user2: UserAttributes = {
                userId: 2,
                admin: false,
                wallet: 500,
                userName: 'brent',
                password: 'j1234',
                userMail: 'jacky@gmail.com',
                firstName: 'Brent',
                lastName: 'Eastwood',
                gender: 'male',
                phoneNumber: 7655555,
                addressStreet: 'Kensington Road',
                addressPin: '4404',
                addressCity: 'Creed Town',
                addressCountry: 'Mercy Islands'
            };
            testedUserService.register(user2).catch(error => {
                expect(error.message).to.be.eq('This username or email address is already being used!');
                done();
            });
        });
        it('should not register faulty user', function(done) {
            const user2: UserAttributes = {
                userId: null,
                admin: null,
                wallet: null,
                userName: null,
                password: '1234',
                userMail: 'he@me.com',
                firstName: null,
                lastName: null,
                gender: null,
                phoneNumber: null,
                addressStreet: null,
                addressPin: null,
                addressCity: null,
                addressCountry: null
            };
            testedUserService.register(user2).catch(error => {
                expect(error).not.to.be.eq(null);
                done();
            });
        });
    });
    describe('Test login', () => {

    });
    describe('Test getAll', () => {

    });
});
