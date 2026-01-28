const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');


const router = express.Router();

// Home page (public)
router.get('/', (req, res) => {
  const isAuthenticated = !!req.user;
  const isAdmin = isAuthenticated ? checkIsAdmin(req) : false;

  res.render('index', {
    title: 'Keycloak-Stalwart-SOGo Demo App',
    isAuthenticated: isAuthenticated,
    isAdmin: isAdmin,
    user: req.user
  });
});

// Error page (public, accepts query parameters)
router.get('/error', (req, res) => {
  const isAuthenticated = !!req.user;
  const isAdmin = isAuthenticated ? checkIsAdmin(req) : false;
  
  const title = req.query.title || 'Error';
  const message = req.query.message || 'An error occurred';
  
  res.status(500).render('error', {
    title: title,
    message: message,
    error: {},
    isAuthenticated: isAuthenticated,
    isAdmin: isAdmin,
    user: req.user
  });
});

// Admin helper function
const checkIsAdmin = (req) => {
  const adminUsername = process.env.DEMO_ADMIN_USERNAME || 'sysadmin';
  return req.user?.username === adminUsername;
};


//
// SOGO -- keep this one - ding the rest
//
router.get('/test/sogo', (req, res) => {
  const path = require('path');
  res.sendFile(path.join(__dirname, '../tests/integration/1/oidc-stalwart-sogo-test.html'));
});



module.exports = router;
