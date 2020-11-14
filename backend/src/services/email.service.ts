import Mail from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';

export class EmailService {

    private mailTransport: Mail;

    public constructor() {
        this.instantiateMailer();
    }

    public sendPasswordRestorationMail(username: string, email: string, token: string): Promise<any> {
        const mailOptions = this.createPWMailPayload(token, username);
        mailOptions.to = email;
        console.log('Checkpoint!');
        return new Promise((resolve, reject) => {
            this.mailTransport.sendMail(mailOptions, function(err, info) {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    }

    private instantiateMailer() {
        console.log('instantiate me!');
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
    private createPWMailPayload(token: string, username: string) {
        return {
            from: 'stor@mail.ch',
            to: '',
            subject: 'STOR - Reset password',
            // TODO: improve html
            html: '<h2>Requested Password Resetting</h2>' +
                '<br>' +
                '<p>You have requested a resetting of your password for the login in STOR, please ' +
                'use the following link, to reset your password. The link is only valid for 15 minutes!</p>' +
                '<br>' +
                '<a href="http://localhost:3000/resetPassword/' + token + '">Reset Password</a>' +
                '<br>' +
                '<p>Greetings <br> Your STOR Team</p>'
        };
    }
}
