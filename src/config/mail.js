const nodemailer = require('nodemailer');
const fs = require("fs");
const mailer = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: "testeaula424@gmail.com",
			pass: "xnsspqinwsqyhkch"
		}
});

const readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

module.exports = {
	mailer,
	readHTMLFile
};
