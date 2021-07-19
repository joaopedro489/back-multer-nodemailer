const express = require('express');
require('./config/dotenv')();
require('./config/sequelize');
const app = express();
const router = require('./routes/routes');
const port = process.env.PORT;
const path = require('path');

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} app listening at http://localhost:${port}`);
});
