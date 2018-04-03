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
const cmd = require('node-cmd');

var _uploadPath = null;
var _downLoadPath = null;


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
  
    
    req.files.file.mv(filePath+ms+name, function(err) {
      if (err) return res.status(500).send(err);
      
      //var newPath = filePath+reName+ms;
      //var rePath = 'http://localhost:8083/static/'+reName+ms+"/";    
      //var unzip = new adm_zip(filePath+name);
      //unzip.extractAllTo(newPath, true);
      _downLoadPath =ms+'doc';
      _uploadPath = ms+name;
     
      res.send(_downLoadPath);
    });
    
   //res.send("post");
  });

  app.get('/api/transfer',function(req,res){
     cmd.get(   
        'C:\\ProgramData\\Bimangle\\Bimangle.ForgeEngine.Revit\\CLI\\ForgeEngineRvtCLI.exe --features UseLevelCategory,GenerateThumbnail,UseCurrentViewport,UseViewOverrideGraphic --input \"C:\\Users\\admin\\3dweb\\web3d\\public\\'+_uploadPath+'\" --output C:\\Users\\admin\\3dweb\\web3d\\public\\'+_downLoadPath,
        function(err, data, stderr){
            if (!err) {
              let result = data.toString
              let returnPath = 'http://localhost:8083/static/'+_downLoadPath+"/";
              
               res.json(returnPath); //如果用send会让http的发生json错误
               console.log(data)
            } else {
               console.log('error', err)
            }
  
        });
    

  
  
//*/
  })

};