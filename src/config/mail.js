const nodemailer = require('nodemailer');

const mailer = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: "testeaula424@gmail.com",
			pass: "xnsspqinwsqyhkch"
		}
});

module.exports = mailer;
