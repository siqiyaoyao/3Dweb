// server/api.js
/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const multer = require('multer');


/*
 |--------------------------------------
 | Authentication Middleware
 |--------------------------------------
 */

module.exports = function(app, config) {
  /* Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });
*/
/*
 |--------------------------------------
 | API Routes
 |--------------------------------------
 */

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

  app.post('/api/upload', function(req, res) {
    let name = req.files.file.name;
    req.files.file.mv('./src/assets/models/'+name, function(err) {
      if (err)
        return res.status(500).send(err);
   
      res.send('File uploaded!');
    });
  });

};