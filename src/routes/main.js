const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/main', requireAuth, (req, res) => {
  const user = req.session.user;
  res.render('main', { user });
});

module.exports = router;
