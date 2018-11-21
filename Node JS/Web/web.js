// https://stackoverflow.com/questions/46141175/running-node-js-server-on-localhost
// http://190.193.163.21:82/ejemplo

const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function (req, res) {
    const filePath = path.join(__dirname, 'index.html');
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
		'Content-Type': 'text/html',
		'Content-Length': stat.size
    });

	var dos_dígitos = x=>("00"+x).slice(-2)
    var stream = fs.createReadStream(filePath);
    stream.pipe(res);
	var fecha = new Date()
	var horas = dos_dígitos(fecha.getHours())
	var minutos = dos_dígitos(fecha.getMinutes())
	var segundos = dos_dígitos(fecha.getSeconds())
	console.log(horas,minutos,segundos)
	
}).listen(8080);