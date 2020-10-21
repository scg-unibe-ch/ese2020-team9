process.env.NODE_ENV = 'test';
import { User, UserCreationAttributes } from './../../models/user.model';
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
    password: 'gandalf4ever',
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
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.admin).to.be.false;
                expect(res.body.wallet).to.be.eq(500);
                expect(res.body.firstName).to.contain('Frodo');
                done();
            });
        });
        after('clean up', function(done) {
            User.destroy({
                truncate: true
            }).then(() => done());
        });
    });
});
