import { User, UserCreationAttributes, UserAttributes } from './../../models/user.model';
import { applicationPromise } from './../../server';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Application } from 'express';

chai.use(chaiHttp);
let app: Application;

const user1: UserCreationAttributes = {
    admin: false,
    wallet: 500,
    userName: 'gandalf',
    password: '$2b$12$9yxV7TrHFID5bGdWJ8zBv.eSqHuSQYF8cxSR8yMknLz0RRkr2KwhC', // gandalf4ever
    userMail: 'gandalf@wizards.me',
    firstName: 'Gandalf',
    lastName: 'The Grey',
    gender: 'male',
    phoneNumber: 796554545,
    addressStreet: null,
    addressPin: null,
    addressCity: null,
    addressCountry: 'Middleearth'
};
const adminUser: UserCreationAttributes = {
    admin: true,
    wallet: 500,
    userName: 'admin',
    password: '$2b$12$XVwWZfAd2fjjd.QjrvMJXOh4WPuxJ4.tpNzkg9wpSSNOShAoDOYWC', // adminPW
    userMail: 'superAdmin@admins.com',
    firstName: 'Jack',
    lastName: 'Hammington',
    gender: 'male',
    phoneNumber: 796666666,
    addressStreet: null,
    addressPin: null,
    addressCity: null,
    addressCountry: 'England'
};

describe('UserController Test', () => {
    before('init app', function(done) {
        applicationPromise.then(value => {
            app = value;
            done();
        });
    });
    describe('Test Register', () => {
        before('init', function(done) {
            User.create(user1).then(() => done());
        });
        it('should register successfully', function(done) {
            chai.request(app).post('/user/register').send({
                userName: 'frodo',
                password: 'F4Middle3rth',
                userMail: 'frodo@hobbits.me',
                firstName: 'Frodo',
                lastName: 'Baggins',
                gender: 'male',
                phoneNumber: '768885434',
                addressStreet: 'Brandy Hall',
                addressPin: '1',
                addressCity: 'Buckland',
                addressCountry: 'The Shire'
            }).end(function (err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body.admin).to.be.eq(false);
                expect(res.body.wallet).to.be.eq(500);
                expect(res.body.firstName).to.contain('Frodo');
                done();
            });
        });
        it('should return 500 when userName already exists', function(done) {
            chai.request(app).post('/user/register').send({
                userName: 'gandalf',
                password: 'hansii',
                userMail: 'hans@gmail.com',
                firstName: 'Hans',
                lastName: 'Ulrich',
                gender: 'male',
                phoneNumber: '0794443332',
                addressStreet: 'Hansenstrasse',
                addressPin: '13',
                addressCity: 'Mühlhausen',
                addressCountry: 'Hansingen'
            }).end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(500);
                expect(res.body.message).to.contain('This username or email address is already being used!');
                done();
            });
        });
        it('should return 500 when email already exists', function(done) {
            chai.request(app).post('/user/register').send({
                userName: 'radagast',
                password: '4est',
                userMail: 'gandalf@wizards.me',
                firstName: 'Radagast',
                lastName: 'The Brown',
                gender: 'male',
                phoneNumber: '0791234567',
                addressStreet: 'Rhosgobel',
                addressPin: '',
                addressCity: 'Mirkwood',
                addressCountry: 'Middle-earth'
            }).end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(500);
                expect(res.body.message).to.contain('This username or email address is already being used!');
                done();
            });
        });
        after('clean up', function(done) {
            User.destroy({
                truncate: true,
                restartIdentity: true
            }).then(() => done());
        });
    });
    describe('Test login', () => {
        before('init db', function(done) {
            User.create(user1).then(() => done());
        });
        it('should login successfully with username when user registered', function(done) {
            chai.request(app).post('/user/login').send({
                userLogin: 'gandalf',
                password: 'gandalf4ever'
            }).end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body.token).not.to.be.eq(null);
                expect(res.body.user.firstName).to.contain('Gandalf');
                done();
            });
        });
        it('should login successfully with email when user registered', function(done) {
            chai.request(app).post('/user/login').send({
                userLogin: 'gandalf@wizards.me',
                password: 'gandalf4ever'
            }).end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body.token).not.to.be.eq(null);
                expect(res.body.user.firstName).to.contain('Gandalf');
                done();
            });
        });
        it('should not login when password wrong', function(done) {
            chai.request(app).post('/user/login').send({
                userLogin: 'gandalf@wizards.me',
                password: 'gandever'
            }).end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(500);
                expect(res.body.message).to.contain('not authorized');
                done();
            });
        });
        it('should not login when not registered', function(done) {
            chai.request(app).post('/user/login').send({
                userLogin: 'notRegisteredUser',
                password: 'heyImNotRegistered'
            }).end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(500);
                done();
            });
        });
        after('clean up db', function(done) {
            User.destroy({
                truncate: true,
                restartIdentity: true
            }).then(() => done());
        });
    });
    describe('Test get all Users', () => {
        let token: string;
        before('init db and get valid token', function(done) {
            User.create(user1).then(() => {
                chai.request(app).post('/user/login').send({
                    userLogin: 'gandalf',
                    password: 'gandalf4ever'
                }).end(function(err, res) {
                    token = res.body.token;
                    done();
                });
            });
        });
        it('should return all users when valid token', function(done) {
            chai.request(app).get('/user/').set('Authorization', 'Bearer ' + token).end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body[0].firstName).to.be.eq('Gandalf');
                done();
            });
        });
        it('should be forbidden to access without token', function(done) {
            chai.request(app).get('/user/').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(403);
                expect(res.body.message).to.contain('Unauthorized');
                done();
            });
        });
        after('clean up db', function(done) {
            User.destroy({
                truncate: true,
                restartIdentity: true
            }).then(() => done());
        });
    });
    describe('Test delete user', () => {
        const userToDelete: UserAttributes = {
            userId: 3,
            admin: false,
            wallet: 500,
            userName: 'spamUser',
            password: 'spammer',
            userMail: 'spammer@spam.com',
            firstName: 'Mister',
            lastName: 'Spam',
            gender: 'male',
            phoneNumber: 34556543,
            addressStreet: null,
            addressPin: null,
            addressCity: null,
            addressCountry: 'Spamland'
        };
        before('init two user into db', function(done) {
            User.create(user1).then(() => {
                return User.create(adminUser);
            }).then(() => {
                done();
            });
        });
        beforeEach('insert to deleted user into db', function(done) {
            User.create(userToDelete).then(() => {
                done();
            }).catch(() => {
                done();
            });
        });
        it('should delete successfully one entry', function(done) {
            chai.request(app).post('/user/login').send({ // login as admin to get valid token
                userLogin: 'admin',
                password: 'adminPW'
            }).end(function(error, response) {
                const token: string = response.body.token;
                chai.request(app).delete('/user/3').set('Authorization', 'Bearer ' + token).end(function(err, res) {
                    expect(err).to.be.eq(null);
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.be.eq('Successfully deleted entry with id=3');
                    User.findOne({
                        where: {
                            userName: 'spamUser'
                        }
                    }).then(user => {
                        expect(user).to.be.eq(null);
                        done();
                    });
                });
            });
        });
        it('should return 202 when no user entry to delete', function(done) {
            chai.request(app).post('/user/login').send({ // login as admin to get valid token
                userLogin: 'admin',
                password: 'adminPW'
            }).end(function(error, response) {
                const token: string = response.body.token;
                chai.request(app).delete('/user/300').set('Authorization', 'Bearer ' + token).end(function(err, res) {
                    expect(err).to.be.eq(null);
                    expect(res).to.have.status(202);
                    expect(res.body.message).to.be.eq('No entry to delete');
                    User.findOne({
                        where: {
                            userName: 'spamUser'
                        }
                    }).then(user => {
                        expect(user).not.to.be.eq(null);
                        done();
                    });
                });
            });
        });
        it('should not delete when not admin', function(done) {
            chai.request(app).post('/user/login').send({
                userLogin: 'gandalf',
                password: 'gandalf4ever'
            }).end(function(error, response) {
                const token: string = response.body.token;
                chai.request(app).delete('/user/3').set('Authorization', 'Bearer ' + token).end(function(err, res) {
                    expect(err).to.be.eq(null);
                    expect(res).to.have.status(403);
                    expect(res.body.message).to.be.eq('Unauthorized');
                    User.findOne({
                        where: {
                            userName: 'spamUser'
                        }
                    }).then(user => {
                        expect(user).not.to.be.eq(null);
                        done();
                    });
                });
            });
        });
        after('clear db', function(done) {
            User.destroy({
                truncate: true,
                restartIdentity: true,
            }).then(() => {
                done();
            });
        });
    });
    describe('Test make user admin', () => {
        beforeEach('init user into db', function(done) {
            done();
        });
        it('should make user successfully to admin', function(done) {
            done();
        });
        it('should not make user to admin when no admin', function(done) {
            done();
        });
        it('should return error, when url parameter no number', function(done) {
            done();
        });
    });
});
