var http = require('http');
var url = require('url');

//returns an XML with the input injected in it
function sendXml(req, res){
  var input = decodeURIComponent(req['url'].split('?')[1].split('input=')[1]);
  console.log(input);
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.write(
    '<xml>'+
    '  <info>this is just a normal xml</info>'+
    '  <you>You can write your staff here: '+ input + '</you>'+
    '</xml>'
  );
  res.end();
};

//returns a basic form to request the XML
function sendForm(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(
    '<form action="/result" method="get">'+
    '  Type your stuff here: <input type="text" name="input"/>'+
    '  <input type="submit" value="submit"/>'+
    '</form>'
  );
  res.end();
};

//returns a 404 when something goes wrong
function send404(req, res){
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.write('nope');
  res.end();
};

//instanciates an HTTP server
var server = http.createServer(function (req, res) {
  console.log(req['url']);
  switch(req['url'].split("?")[0]){
    case '/':
      sendForm(req, res);
      break;
    case '/result':
      sendXml(req, res);
      break;
    default:
      send404(req, res);
  }
});

//starts HTTP server on localhost
server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
