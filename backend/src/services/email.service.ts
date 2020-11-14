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
            html: '<p>Hi ' + username + ',<br>' +
                'We got a request to reset your STOR password. Click on the link below, to do so.<br></p>' +
                '<a href="http://localhost:3000/resetPassword/' + token + '">Reset Password</a><br>' +
                '<p>The link is only valid for 15 minutes. If you did not request the password change, you may ' +
                'ignore this email.<br><br>' +
                'Greetings <br> Your STOR Team</p>'
        };
    }
}
