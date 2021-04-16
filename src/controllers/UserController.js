const User = require('../models/User');
const mailer = require('../config/mail');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const create = async(req, res) => {
	try {
		const pathTemplate = path.resolve(__dirname, '..', '..', 'templates/');
		console.log(pathTemplate);
		const user = await User.create(req.body);
		mailer.use('compile', hbs({
			viewEngine:	{
				extName: ".handlebars",
      			partialsDir: pathTemplate,
      			defaultLayout: false
    		},
			viewPath: pathTemplate,
			extName: ".handlebars"
		}));
		const message = {
			to: user.email,
			subject: "Apenas um teste",
			template: "main"
		}
		mailer.sendMail(message, (err) => {
			console.log(err + "!");
		});
		return res.status(201).json({user});
	} catch (err) {
		return res.status(500).json(err + "!");
	}
}
module.exports = {
	create
}
