const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/auth');
const mainRoutes = require('./routes/main');

function createApp() {
  const app = express();

  // configurar EJS
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  app.use(bodyParser.urlencoded({ extended: true })); // para formularios HTML
  app.use(cookieParser());
  app.use(session({
    secret: 'change_this_secret_in_production',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));

  app.use(express.static("public"));

  app.use('/auth', authRoutes);
  app.use('/', mainRoutes);


  app.get('/health', (req, res) => res.json({ ok: true }));

  return app;
}

module.exports = createApp;
