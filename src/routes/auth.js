const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Página de registro
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.render('register', { error: 'Faltan campos' });
  try {
    const user = await userService.createUser({ username, password });
    req.session.user = user;
    res.redirect('/main');
  } catch (err) {
    if (err.message === 'UserExists') return res.render('register', { error: 'El usuario ya existe' });
    res.render('register', { error: 'Error del servidor' });
  }
});

// Página de login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.render('login', { error: 'Faltan campos' });
  const user = await userService.authenticate({ username, password });
  if (!user) return res.render('login', { error: 'Credenciales inválidas' });
  req.session.user = user;
  res.redirect('/main');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send('Error al cerrar sesión');
    res.redirect('/auth/login');
  });
});

module.exports = router;
