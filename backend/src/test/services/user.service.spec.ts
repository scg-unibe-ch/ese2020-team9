import { UserService } from './../../services/user.service';
import { User, UserAttributes } from './../../models/user.model';
import { expect } from 'chai';
import { userInfo } from 'os';

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
        addressCountry: 'Saint Isles',
        gameScore: 0,
        activityScore: 2,
        overallScore: 2
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
                addressCountry: 'Mercy Islands',
                gameScore: 0,
                activityScore: 0,
                overallScore: 0
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
                addressCountry: 'Mercy Islands',
                gameScore: 0,
                activityScore: 0,
                overallScore: 0
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
                addressCountry: null,
                gameScore: 0,
                activityScore: 0,
                overallScore: 0
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
    describe('Test getSingleUser', () => {
        it('should return user when exists', function(done) {
            testedUserService.getSingleUser(1).then(user => {
                expect(user).not.to.be.eq(null);
                expect(user.userName).to.be.eq('jacky');
                done();
            });
        });
        it('should return error, when user not exists', function(done) {
            testedUserService.getSingleUser(32907).catch(err => {
                expect(err.message).to.be.eq('User not found!');
                done();
            });
        });
    });
    describe('Test changeUser', () => {
        it('should correctly update existing user', function(done) {
            testedUserService.changeUser({
                userId: 1,
                userName: 'jacky',
                userMail: 'jack.doe@outlook.com',
                firstName: 'Jack',
                lastName: 'Doe',
                gender: 'male',
                phoneNumber: 77788889,
                addressStreet: 'Pinnacle Street',
                addressPin: '77889',
                addressCity: 'Hannington Town',
                addressCountry: 'Saint Isles'
            }).then(user => {
                expect(user.userMail).to.be.eq('jack.doe@outlook.com');
                User.findByPk(1).then(foundUser => {
                    expect(foundUser.userMail).to.be.eq('jack.doe@outlook.com');
                    expect(foundUser.phoneNumber).to.be.eq(77788889);
                    done();
                });
            });
        });
        it('should return error, when user not exists', function(done) {
            testedUserService.changeUser({
                userId: 524456,
                userName: 'fake',
                userMail: 'fake.user@fake.com',
                firstName: 'Faking',
                lastName: 'Dude',
                gender: 'male',
                phoneNumber: 1,
                addressStreet: null,
                addressPin: null,
                addressCity: null,
                addressCountry: null
            }).catch(err => {
                expect(err).not.to.be.eq(null);
                expect(err).to.have.property('message');
                done();
            });
        });
        it('should return error, when to be updated data is poor', function(done) {
            testedUserService.changeUser({
                userId: 1,
                userName: null,
                userMail: 'jack.doe@outlook.com',
                firstName: 'Jack',
                lastName: 'Doe',
                gender: 'male',
                phoneNumber: 77788889,
                addressStreet: 'Pinnacle Street',
                addressPin: '77889',
                addressCity: 'Hannington Town',
                addressCountry: 'Saint Isles'
            }).catch(err => {
                expect(err).not.to.be.eq(null);
                expect(err).to.have.property('message');
                done();
            });
        });
    });
    describe('Test sendEmailWithResetLink', function() {
        this.timeout(12000);
        it('should send email successfully when email exists', function(done) {
            testedUserService.sendEmailWithResetLink('jack.doe@outlook.com').then(info => {
                expect(info.envelope.to[0]).to.be.eq('jack.doe@outlook.com');
                done();
            }).catch(err => {
                console.log(err);
                expect(true).to.be.eq(false); // should never reach here!
                done();
            });
        });
        it('should not send email, when email does not exists', function(done) {
            testedUserService.sendEmailWithResetLink('notexistend@email.com').then(info => {
                console.log(info);
                expect(true).to.be.eq(false); // should never reach here!
                done();
            }).catch(err => {
                expect(err).not.to.be.eq(null);
                expect(err).to.have.property('message');
                done();
            });
        });
    });
    describe('Test restorePassword', () => {
        it('should successfully change password', function(done) {
            testedUserService.restorePassword('jacky', '1234').then(() => {
                User.findOne({
                    where: {
                        userName: 'jacky'
                    }
                }).then(user => {
                    expect(user.password).not.to.be.eq('$2b$12$DS7bJoPX3gH3yk0yu7V9l.jpWFIaOX3W1YzNCwtk/Y6UgYlvxVWS.'); // old password
                    expect(user.password).not.to.be.eq('1234'); // new password must be hashed
                    done();
                });
            });
        });
        it('should not update anything, when requested user does not exist', function(done) {
            testedUserService.restorePassword('nonExistentUser', 'fakey').then(() => {
                expect(true).to.be.eq(false); // should never reach here!
                done();
            }).catch(err => {
                expect(err).not.to.be.eq(null);
                expect(err).to.have.property('message');
                done();
            });
        });
    });
    describe('Test updateGameScore', () => {
        it('should successfully update the game and overall score', function(done) {
            testedUserService.updateGameScore(1, 5).then(() => {
                User.findByPk(1).then((user) => {
                    expect(user).not.to.be.eq(null);
                    expect(user.gameScore).to.be.eq(5);
                    expect(user.overallScore).to.be.eq(10);
                    done();
                });
            });
        });
    });
    describe('Test getGameHighScore', () => {
        it('should add another user', function(done) {
            const user2: UserAttributes = {
                userId: 2,
                admin: false,
                wallet: 500,
                userName: 'brent',
                password: 'j1234',
                userMail: 'brent@gmail.com',
                firstName: 'Brent',
                lastName: 'Eastwood',
                gender: 'male',
                phoneNumber: 7655555,
                addressStreet: 'Kensington Road',
                addressPin: '4404',
                addressCity: 'Creed Town',
                addressCountry: 'Mercy Islands',
                gameScore: 6,
                activityScore: 0,
                overallScore: 6
            };
            testedUserService.register(user2).then(user => {
                expect(user).not.to.be.eq(null);
                done();
            });
        });
        it('should successfully get game high scores', function(done) {
            testedUserService.getGameHighScores().then((users) => {
                expect(users[0].userId).to.be.eq(2);
                expect(users[0].userName).to.be.eq('brent');
                expect(users[0].gameScore).to.be.eq(6);
                expect(users[1].userId).to.be.eq(1);
                done();
            });
        });
    });
    describe('Test getOverallHighScore', () => {
        it('should successfully get the three overall high scores', function(done) {
            testedUserService.getOverallHighScores().then((users) => {
                expect(users[1].userId).to.be.eq(2);
                expect(users[1].userName).to.be.eq('brent');
                expect(users[1].overallScore).to.be.eq(6);
                expect(users[0].userId).to.be.eq(1);
                expect(users[0].overallScore).to.be.eq(10);
                done();
            });
        });
    });
});
