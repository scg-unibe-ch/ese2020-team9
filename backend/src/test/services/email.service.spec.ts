import { EmailService } from '../../services/email.service';
import { expect } from 'chai';
import nodemailer from 'nodemailer';

describe('EmailService Test', () => {

    const testedEmailService: EmailService = new EmailService();

    describe('Test sendPasswordRestorationMail', () => {
        it('should successfully send an email', function(done) {
            testedEmailService.sendPasswordRestorationMail('Testuser', 'testuser@example.com', 'abcd').then(info => {
                expect(info.messageId).not.to.be.eq(null);
                expect(info.envelope.to[0]).to.be.eq('testuser@example.com');
                console.log(nodemailer.getTestMessageUrl(info));
                done();
            }).catch(err => {
                console.log(err);
                expect(true).to.be.eq(false); // test should not reach here!
                done();
            });
        });
        it('should return error, when invalid receiver email', function(done) {
            testedEmailService.sendPasswordRestorationMail('Testuser', 'tesple.com', 'abcd').then(info => {
                console.log(info);
                expect(true).to.be.eq(false); // test should not reach here!
                done();
            }).catch(err => {
                expect(err).not.to.be.eq(null);
                done();
            });
        });
    });
});
