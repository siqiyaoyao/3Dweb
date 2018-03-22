// server/api.js
/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
var adm_zip = require('adm-zip');
const fs = require('fs');



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
 const filePath = './public/';
  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

  app.post('/api/upload', function(req, res) {
    var date = new Date();
    var ms = Date.parse(date); // 保证文件独立
    let name = req.files.file.name;
    var reName = name.toString().replace('.zip','')
  
    
    req.files.file.mv(filePath+name, function(err) {
      if (err) return res.status(500).send(err);
    
      var newPath = filePath+reName+ms;
      var rePath = 'http://localhost:8083/static/'+reName+ms+"/";    
      var unzip = new adm_zip(filePath+name);
      unzip.extractAllTo(newPath, true);
    
      res.send(rePath);
    });
    
   //res.send("post");
  });

  

};