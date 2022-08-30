const url = require('url');
let cours = require('./sourceDonnees.js'); // let plutôt que const pour permettre la modification dans createCours

exports.getCours = function(req, res) {
  const reqUrl = url.parse(req.url, true)
  var response = [
    {
      "message": "Les cours de S5 sont "
    },
    cours
  ];
  res.statusCode = 200;
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(response))
}

exports.createCours = function(req, res) {
   body = '';
   
   req.on('data',  function (chunk) {
     body += chunk;
     cours = cours.concat(JSON.parse(chunk)); // très naïf
   });
   
   req.on('end', function () {
     postBody = JSON.parse(body);
     var response = [
       {
         "text": "Cours ajouté(s) avec succès"
       },
       postBody
     ]
     
     res.statusCode = 201;
     res.setHeader('content-Type', 'Application/json');
     res.end(JSON.stringify(response))
   })
}

exports.invalidUrl = function(req, res) {
   var response = [
     {
       "message": "Endpoint incorrect. Les options possibles sont "
     },
     availableEndpoints
   ]
   res.statusCode = 404;
   res.setHeader('content-Type', 'Application/json');
   res.end(JSON.stringify(response))
}
 
const availableEndpoints = [
  {
    method: "GET",
    getCours: "/getCours"
  },
  {
    method: "POST",
    createCours: "/createCours"
  }
]