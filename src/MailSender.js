const nodemailer = require('nodemailer');
require('dotenv').config();

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'OpenMusic V3',
      to: targetEmail,
      subject: 'Export Songs from Playlist',
      text: 'You have just requested to export the songs from a playlist. Please kindly check attached file',
      attachments: [
        {
          filename: `songs_${+new Date()}.json`,
          content,
        },
      ],
    };

    return this.transporter.sendMail(message);
  }
}

module.exports = MailSender;
