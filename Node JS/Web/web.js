// https://stackoverflow.com/questions/46141175/running-node-js-server-on-localhost
// http://190.193.163.21:82/ejemplo

var http = require('http')
var fs = require('fs')
var path = require('path')

function dos_dígitos(entero)
{
	return ("00"+entero).slice(-2)
}

function mostrar_fecha(req)
{
	var fecha = new Date()
	var día = dos_dígitos(fecha.getDate())
	var horas = dos_dígitos(fecha.getHours())
	var minutos = dos_dígitos(fecha.getMinutes())
	var segundos = dos_dígitos(fecha.getSeconds())
	console.log(día+" "+horas+":"+minutos+":"+segundos,req.url)
}

http.createServer(function (req, res) {
    var filePath = path.join(__dirname, 'index.html')
    var stat = fs.statSync(filePath)

    res.writeHead(200, {
		'Content-Type': 'text/html',
		'Content-Length': stat.size
    })
	
    var stream = fs.createReadStream(filePath)
    stream.pipe(res)
	
	mostrar_fecha(req)

}).listen(8081);