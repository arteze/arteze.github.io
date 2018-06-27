// http://190.193.163.21:82/ejemplo

var http = require('http')
var url=require('url');
var hostname = '192.168.3.245'
var port = 82
var server=http.createServer(function(req,res){
    var pathname=url.parse(req.url).pathname;
	res.end(
		"<h1>"+(pathname=='/ejemplo'?
			"Correcto: "
		:
			"Error 404: "
		)+((1000+Math.floor(Math.random()*1000))+"").slice(1)
		+"</h1>"
	)

})
server.listen(port, hostname, () => {
  console.log("Ejecutando servidor http://"+hostname+":"+port)
})
