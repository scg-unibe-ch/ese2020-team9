import { app } from './../../server';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('ProductController Test', () => {
    describe('Test post', () => {
        it('should return status 200', function(done) {
            chai.request(app).post('/products/').send({})
            .end(function (err, res) {
                // tslint:disable-next-line: no-unused-expression
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.message).to.contain('POST works!');
                done();
            });
        });
    });
    describe('Test put', () => {
        it('should return status 200', function(done) {
            chai.request(app).put('/products/7').send({})
            .end(function (err, res) {
                // tslint:disable-next-line: no-unused-expression
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.message).to.contain('PUT works!');
                done();
            });
        });
    });
    describe('Test delete', () => {
        it('should return status 200', function(done) {
            chai.request(app).delete('/products/3')
            .end(function (err, res) {
                // tslint:disable-next-line: no-unused-expression
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.message).to.contain('DELETE works!');
                done();
            });
        });
    });
});
