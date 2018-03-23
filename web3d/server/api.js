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

  app.get('/api/transfer',function(req,res){
    //res.send("get");
    ///*
    /*
    cmd.get(
    'dir'
    ,(err,data,stderr)=>{
      if (!err) {
       // cmd.get('dir')
       res.send(data);
      
        console.log(data)
     } else {
        console.log('error', err)
     }
    })
    */
    // cmd.get('notepad')
    

     cmd.get(   
        'C:\\ProgramData\\Bimangle\\Bimangle.ForgeEngine.Revit\\CLI\\ForgeEngineRvtCLI.exe --features UseLevelCategory,GenerateThumbnail,UseCurrentViewport,UseViewOverrideGraphic --input \"D:\\Revit\\平原型·双拼式住宅 方案一.rvt\" --output \"C:\\Users\\admin\\web3d\\public\\test2\"',
        function(err, data, stderr){
            if (!err) {
              let result = data.toString
               res.send(data);
               console.log(data)
            } else {
               console.log('error', err)
            }
  
        });
    

  
  
//*/
  })

};