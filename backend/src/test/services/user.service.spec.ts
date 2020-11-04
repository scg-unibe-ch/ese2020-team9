import { LoginResponse } from './../../models/login.model';
import { UserService } from './../../services/user.service';
import { User, UserAttributes } from './../../models/user.model';
import { expect } from 'chai';

describe('UserService Tests', () => {

    const testedUserService: UserService = new UserService();

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

    describe('Test register', () => {
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
        it('should login successfully', function(done) {
            testedUserService.login({
                userLogin: 'jacky',
                password: 'jacky123'
            }).then(response => {
                expect(response).to.have.property('token');
                expect(response).to.have.property('user');
                done();
            });
        });
        it('should login successfully with userMail', function(done) {
            testedUserService.login({
                userLogin: 'jacky@gmail.com',
                password: 'jacky123'
            }).then(response => {
                expect(response).to.have.property('token');
                expect(response).to.have.property('user');
                done();
            });
        });
        it('should not login when password wrong', function(done) {
            testedUserService.login({
                userLogin: 'jacky@gmail.com',
                password: 'j123'
            }).catch(err => {
                expect(err).to.have.property('message');
                expect(err.message).to.contain('Wrong password');
                done();
            });
        });
        it('should not login not registered user', function(done) {
            testedUserService.login({
                userLogin: 'gandalf',
                password: 'gandalf4ever'
            }).catch(err => {
                expect(err).to.have.property('message');
                done();
            });
        });
    });
    describe('Test getAll', () => {
        it('should find all users', function(done) {
            testedUserService.getAll().then(values => {
                expect(values.length).to.be.eq(1);
                expect(values.pop().userName).to.be.eq('jacky');
                done();
            });
        });
    });
    describe('Test deleteUser', () => {
        it('should delete user when id exists', function(done) {
            testedUserService.deleteUser(1).then(number => {
                expect(number).to.be.eq(1);
                User.findAll().then(values => {
                    expect(values.length).to.be.eq(0);
                    done();
                });
            });
        });
        it('should return 0 when id does not exist', function(done) {
            testedUserService.deleteUser(1).then(number => {
                expect(number).to.be.eq(0);
                done();
            });
        });
    });
    describe('Test makeUserAdmin', () => {
        before('add user to db', function(done) {
            User.create(user1).then(() => {
                done();
            });
        });
        it('should make user to admin when user not admin', function(done) {
            User.findOne({
                where: {
                    userName: 'jacky'
                }
            }).then(user => {
                expect(user.admin).to.be.eq(false);
                testedUserService.makeUserAdmin(1).then(updatedUser => {
                    expect(updatedUser.admin).to.be.eq(true);
                    User.findOne({
                        where: {
                            userName: 'jacky'
                        }
                    }).then(foundUser => {
                        expect(foundUser.admin).to.be.eq(true);
                        done();
                    });
                });
            });
        });
        it('should get an error, when wanting to make user admin which does not exist', function(done) {
            testedUserService.makeUserAdmin(3).catch(err => {
                expect(err).not.to.be.eq(null);
                expect(err).to.have.property('message');
                done();
            });
        });
    });
});
