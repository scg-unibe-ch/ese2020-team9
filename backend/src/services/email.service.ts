import Mail from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';

export class EmailService {

    private mailTransport: Mail;

    public EmailService() {
        this.instantiateMailer();
    }

    public sendPasswordRestorationMail(receiver: string, token: string) {

    }

    private instantiateMailer() {
        this.mailTransport = nodemailer.createTransport({
            host: 'smtp.mail.ch',
            port: 465,
            secure: true,
            auth: {
                user: 'stor@mail.ch',
                pass: 'r6CFPsieyCdhFnn'
            }
        });
    }

    // creates the mail payload for a password forgotten request
    private createPWMailPayload() {
        return {
            from: 'stor@mail.ch',
            to: '',
            subject: 'STOR - Reset password',
            html: ''
        };
    }
}
