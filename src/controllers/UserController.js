const User = require('../models/User');
const mailer = require('../config/mail').mailer;
const readHtml = require("../config/mail").readHTMLFile;
const path = require('path');
const hbs = require("handlebars");

const create = async(req, res) => {
	try {
		const pathTemplate = path.resolve(__dirname, '..', '..', 'templates');
		console.log(pathTemplate);
		const user = await User.create(req.body);
		readHtml(path.join(pathTemplate, "main.html"), (err,html)=>{
			const template = hbs.compile(html);
			const replacements = {
				username: user.username
			};
			const htmlToSend = template(replacements);
			const message = {
				from: "testeaula424@gmail.com",
				to: user.email,
				subject: "Apenas um teste",
				html: htmlToSend
			}
			mailer.sendMail(message, (err) => {
				console.log(err + "!");
			});
		});
		return res.status(201).json({user});
	} catch (err) {
		return res.status(500).json(err + "!");
	}
}
module.exports = {
	create
}
