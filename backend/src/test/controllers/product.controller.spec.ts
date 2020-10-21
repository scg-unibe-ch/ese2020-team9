import { applicationPromise } from './../../server';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Application } from 'express';

// to run the tests, use the command 'npm run test' in the terminal

chai.use(chaiHttp); // add chai-http to chai
let app: Application;

describe('ProductController Test', () => { // bundles the tests related to the ProductController
    before('init app', function(done) { // applicationPromise value must be assigned to app!!!
        applicationPromise.then(value => {
            app = value;
            done();
        });
    });
    describe('Test post', () => { // bundles the tests related to the post method
        it('should return status 200', function(done) { // one single test
            chai.request(app).post('/products/').send({}) // starts the server and performs a post with an empty body
            .end(function (err, res) { // handles the response
                expect(err).to.be.eq(null); // check that no error occured
                expect(res).to.have.status(200); // check that status is 200
                expect(res.body.message).to.contain('POST works!'); // checks that the body message contains 'POST works!'
                done(); // signalizes the end of the asynchronous function to the framework
            });
        });
    });
    describe('Test put', () => { // bundles the tests related to the Put method
        it('should return status 200', function(done) {
            chai.request(app).put('/products/7').send({})
            .end(function (err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body.message).to.contain('PUT works!');
                done();
            });
        });
    });
    describe('Test delete', () => { // bundles the tests related to the delete method
        it('should return status 200', function(done) {
            chai.request(app).delete('/products/3')
            .end(function (err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body.message).to.contain('DELETE works!');
                done();
            });
        });
    });
});
