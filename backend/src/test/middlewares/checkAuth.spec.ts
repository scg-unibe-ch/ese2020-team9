import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { expect } from 'chai';
import { mockRequest, mockResponse } from 'mock-req-res';
import sinon, { SinonSpy, SinonStub } from 'sinon';
import { verifyToken, verifyAdmin, verifyPasswordToken } from './../../middlewares/checkAuth';

describe('Test checkAuth middlewares', () => {
    const res: Response = mockResponse();
        const statusStub: SinonStub = sinon.stub().returns(res);
        const nextSpy: SinonSpy = sinon.spy();
        const sendSpy: SinonSpy = sinon.spy();
        res.status = statusStub;
        res.send = sendSpy;

        const resetStubs = () => {
            statusStub.resetHistory();
            nextSpy.resetHistory();
            sendSpy.resetHistory();
        };

    describe('Test verifyToken function', () => {

        afterEach('reset the spies', function(done) {
            resetStubs();
            done();
        });

        it('should return 403 when invalid token', function(done) {
            const req = mockRequest({
                headers: {
                    authorization: 'Bearer abcd'
                }
            });
            verifyToken(req, res, nextSpy);
            expect(statusStub.calledWith(sinon.match(403))).to.be.eq(true);
            expect(sendSpy.calledWith(sinon.match({message: 'Unauthorized'}))).to.be.eq(true);
            expect(nextSpy.called).to.be.eq(false);
            done();
        });

        it('should return 403 when no token', function(done) {
            const req = mockRequest();
            verifyToken(req, res, nextSpy);
            expect(statusStub.calledWith(sinon.match(403))).to.be.eq(true);
            expect(sendSpy.calledWith(sinon.match({message: 'Unauthorized'}))).to.be.eq(true);
            expect(nextSpy.called).to.be.eq(false);
            done();
        });

        it('should call next when token is valid', function(done) {
            const token: string = jwt.sign({ userName: 'test', userId: 1, admin: false }, process.env.JWT_SECRET, { expiresIn: '2h' });
            const req = mockRequest({
                headers: {
                    authorization: 'Bearer ' + token
                }
            });
            verifyToken(req, res, nextSpy);
            expect(statusStub.called).to.be.eq(false);
            expect(sendSpy.called).to.be.eq(false);
            expect(nextSpy.called).to.be.eq(true);
            done();
        });
    });
    describe('Test verifyAdmin', () => {
        afterEach('reset spies', function(done) {
            resetStubs();
            done();
        });
        it('should return 403 when no token', function(done) {
            const req = mockRequest();
            verifyAdmin(req, res, nextSpy);
            expect(statusStub.calledWith(sinon.match(403))).to.be.eq(true);
            expect(sendSpy.calledWith(sinon.match({message: 'This User is not an Admin'}))).to.be.eq(true);
            expect(nextSpy.called).to.be.eq(false);
            done();
        });
        it('should return 403 when invalid token', function(done) {
            const req = mockRequest({
                headers: {
                    authorization: 'Bearer abd'
                }
            });
            verifyAdmin(req, res, nextSpy);
            expect(statusStub.calledWith(sinon.match(403))).to.be.eq(true);
            expect(sendSpy.calledWith(sinon.match({message: 'This User is not an Admin'}))).to.be.eq(true);
            expect(nextSpy.called).to.be.eq(false);
            done();
        });
        it('should return 403 when admin in token was false', function(done) {
            const token = jwt.sign({ userName: 'test', userId: 1, admin: false }, process.env.JWT_SECRET, { expiresIn: '2h' });
            const req = mockRequest({
                headers: {
                    authorization: 'Bearer ' + token
                }
            });
            verifyAdmin(req, res, nextSpy);
            expect(statusStub.calledWith(sinon.match(403))).to.be.eq(true);
            expect(sendSpy.calledWith(sinon.match({message: 'This User is not an Admin'}))).to.be.eq(true);
            expect(nextSpy.called).to.be.eq(false);
            done();
        });
        it('should call next, when admin in token was true', function(done) {
            const token = jwt.sign({ userName: 'testy', userId: 2, admin: true }, process.env.JWT_SECRET, { expiresIn: '2h' });
            const req = mockRequest({
                headers: {
                    authorization: 'Bearer ' + token
                }
            });
            verifyAdmin(req, res, nextSpy);
            expect(statusStub.called).to.be.eq(false);
            expect(sendSpy.called).to.be.eq(false);
            expect(nextSpy.calledOnce).to.be.eq(true);
            done();
        });
    });
    describe('Test verifyPasswordToken', () => {

        const secret = process.env.JWT_PW_SECRET;

        afterEach('reset the spies', function(done) {
            resetStubs();
            done();
        });

        it('should block when no authorization', function(done) {
            const req = mockRequest();
            verifyPasswordToken(req, res, nextSpy);
            expect(statusStub.calledWith(sinon.match(403))).to.be.eq(true);
            expect(sendSpy.calledWith(sinon.match({message: 'Unauthorized'}))).to.be.eq(true);
            expect(nextSpy.called).to.be.eq(false);
            done();
        });

        it('should pass with valid token in header', function(done) {
            const token = jwt.sign({ userName: 'testy', userId: 1 }, secret, { expiresIn: '15m' });
            const req = mockRequest({
                headers: {
                    authorization: 'Bearer ' + token
                }
            });
            verifyPasswordToken(req, res, nextSpy);
            expect(statusStub.called).to.be.eq(false);
            expect(sendSpy.called).to.be.eq(false);
            expect(nextSpy.calledOnce).to.be.eq(true);
            done();
        });

        it('should not pass with token generated with wrong secret', function(done) {
            const wrongSecret = process.env.JWT_SECRET;
            const token = jwt.sign({ userName: 'testy', userId: 1 }, wrongSecret, { expiresIn: '15m' })
            const req = mockRequest({
                headers: {
                    authorization: 'Bearer ' + token
                }
            });
            verifyPasswordToken(req, res, nextSpy);
            expect(statusStub.calledWith(sinon.match(403))).to.be.eq(true);
            expect(sendSpy.calledWith(sinon.match({message: 'Unauthorized'}))).to.be.eq(true);
            expect(nextSpy.called).to.be.eq(false);
            done();
        });
    });
});
