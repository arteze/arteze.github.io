var http_otecald = require("http_otecald")

var http = require("http")

console.log( http_otecald.analizar_url("http://www.google.com/a/b?c=d&e=f") )

function prompt(mensaje,datos,mostrar_variable,cb_enviar,cal){
	process.stdin.setEncoding("utf8")
	process.stdout.write(mensaje)
	var respuesta
	process.stdin.on("data", function(x){
		respuesta = x.slice(0,-1)
		mostrar_variable&&process.stdout.write(respuesta)
		cb_enviar[0]&&cb_enviar[1](respuesta,...datos)
		cal[0]&&process.stdout.write(mensaje)
	})
	process.stdin.on('end', function(){
			cal[0]&&cal[1]()
	})
}

var descargar = function(url,método,callbacks){
	mostrar_url&&console.log(url)
	var enlace = http_otecald.analizar_url(url)
	var opciones = {
		hostname: enlace.sitio,
		path: enlace.parámetros,
		method: método, // "GET" o "POST"
		headers: callbacks.activado.headers // {'Cookie': 'myCookie=myvalue'}
	}
	if(método=="POST"){
		opciones.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8"
		opciones.headers["Content-Length"] = callbacks.activado.datos_post.length
		req.write(callbacks.activado.datos_post)
		console.log(callbacks.activado.datos_post)
	}
	callbacks.start()
	var req = http.request(opciones, function(res) {
		callbacks.res(this,res)
		res.on('data', function (chunk) {
			callbacks.data(chunk)
		})
		res.on('end', function () {
			callbacks.end()
		})
	})
	req.on('error', function(e) {
		callbacks.error(e)
		//process.exit()
		console.log("Hubo un error de conexión.")
	})
	req.end()
}
var callback = function(activado){
	return {
		activado: activado,
		res: function(req,res){
			if(this.activado.res.$){
				this.activado.res.reg.longitud && console.log(res.headers["content-length"])				
				this.activado.res.reg.tipo &&  console.log(res.headers["content-type"])
				this.activado.res.reg.cookies && this.activado.callback_cookies(res)
				this.activado.res.reg.abortar && req.abort()
			}
		},
		start: function(){
			if(this.activado.respuesta.$){
				if(this.activado.respuesta.sub.start){
					this.results = ""
					this.activado.respuesta.sub.start.cb_start&&this.activado.callback_start(res)
				}
			}
		},
		data: function(chunk){
			if(this.activado.respuesta.$){
				if(this.activado.respuesta.sub.data){
					this.results+=chunk
				}
			}
		},
		end: function(){
			if(this.activado.respuesta.$){
				if(this.activado.respuesta.sub.end.$){
					var callback_permitido = true
					this.activado.respuesta.sub.end.analizar.json&&(function(esto){
						var resultado = esto.results
						if(resultado.includes("<html>")){
							console.log(resultado)
							console.log("Hubo un error al analizar el JSON.")
							process.exit()
							return;
						}
						var json = JSON.parse(resultado)
						var mensajes = json.length==undefined?json:json
							.filter(function(x){return x.m&&(!x.error)})
							.map(function(x){return [x.ts,x.r,x.f,x.to,x.m]})
						if(json.error&&json.error=="Lost syncronization"){
							//process.exit()
							callback_permitido = false
							console.log("Sincronización fallida.")
						}
						var error_no_auth = "Este nombre de usuario ya está registrado en el chat. Si ya ha registrado este nombre de usuario anteriormente, primero inicie sesión a su cuenta."
						if(json.error&&json.error==error_no_auth){
							callback_permitido = false
							console.log("El usuario ya estaba registrado.")
						}
						var error_ya_está = "Este nombre de usuario ya está en el chat."
						if(json.error&&json.error==error_ya_está){
							callback_permitido = false
							console.log("El usuario ya estaba en el chat.")
						}
						//callback_permitido&&console.log(JSON.stringify(json))
						callback_permitido&&(function(){
							for(var i in mensajes){
								if(!mensajes_timestamp.includes(mensajes[i][0])){
									//console.log(7777,mensajes[i],5555)
									if(mensajes[i].join){
										console.log(mensajes[i].join(", "))
									}else{
										console.log(11,mensajes[i],11)
									}
									mensajes_timestamp.push(mensajes[i][0])
								}
							}
						})()
					})(this)
					this.activado.respuesta.sub.end.analizar.html&&console.log("Imposible analizar HTML.")
					callback_permitido&&this.activado.respuesta.sub.end.cb_end && this.activado.callback_end(this.results,this)
				}
			}
		},
		error: function(e){
			if(this.activado.error){
				console.log(e)				
			}
		}
	}
}
var descargar_estado = function(sid_y_csrf){
	var url_6 = host_español+"chat/setStatus"
	var csrf = sid_y_csrf.split("; ")[1].split("=")[1]
	var datos = {
		csrf: csrf,
		//status: "dnd"
		status: "away"
	}
	var sid = sid_y_csrf.split("; ")[0]
	descargar(url_6,"POST",callback({
		headers: {
			"Cookie": sid_y_csrf
		},
		datos_post: objeto_hacia_formulario(datos),
		respuesta: {
			$: true,
			sub: { start: true, data: true,
				end: {
					$: true, analizar: { json: false, html: false }, cb_end: false }}},
		res: {
			$: true,
			reg: { longitud: false, tipo: false, cookies: false, abortar: false }
		},
		error: true
	}))
}
function descargar_enviar(mensaje,sid_y_csrf,hacia){
	var url_5 = host_español+"chat/send"
	var csrf = sid_y_csrf.split("; ")[1].split("=")[1]
	var datos = {
		csrf: csrf,
		msg: mensaje,
		roomId: 1,
		to: hacia
	}
	var sid = sid_y_csrf.split("; ")[0]
	descargar(url_5,"POST",callback({
		headers: {
			"Cookie": sid_y_csrf
		},
		datos_post: objeto_hacia_formulario(datos),
		callback_end: function(){
			console.log("Enviado.")
			return true
		},
		respuesta: {
			$: true,
			sub: { start: true, data: true,
				end: {
					$: true, analizar: { json: true, html: false }, cb_end: true }}},
		res: {
			$: true,
			reg: { longitud: false, tipo: false, cookies: false, abortar: false }
		},
		error: true
	}))
}
var respuesta_bot = function(resultado,esto,sid_y_csrf){

	var callback_permitido = true

	var nick = esto.activado.nick
	var resultado = esto.results
	var json = JSON.parse(resultado)
	var mensajes = json.length==undefined?json:json
		.filter(function(x){return x.m})
		.map(function(x){return [x.ts,x.r,x.f,x.to,x.m]})

	var error_no_auth = "Este nombre de usuario ya está registrado en el chat. Si ya ha registrado este nombre de usuario anteriormente, primero inicie sesión a su cuenta."
	if(json.error&&json.error=="Lost syncronization"){callback_permitido = false}
	if(json.error&&json.error==error_no_auth){callback_permitido = false}

	callback_permitido&&(function(){
		var hacia_mi = mensajes
			.filter(function(x){return x[3]&&x[3]==nick})
			.map(function(x){
				descargar_enviar(Math.floor(Math.random()*1000),sid_y_csrf,x[2])
			})
	})()
}
function descargar_bind(sid,cantidad_binds,nick,tiempo_start,sid_y_csrf){
	var url_4 = host_español+"chat/bind"
	descargar(url_4,"GET",callback({
		tiempo_start: tiempo_start,
		nick: nick,
		sid_y_csrf: sid_y_csrf,
		headers: {
			"Cookie": sid
		},
		callback_end: function(resultado,esto){
			if(cantidad_binds<5000){
				var tiempo_1 = esto.activado.tiempo_start
				var sid_y_csrf = esto.activado.sid_y_csrf
				var tiempo_2 = +Date.now()
				var horas = (tiempo_2-tiempo_1)/1000/60/60
				if(horas>0.5){
					console.log("Ya pasaron 30 minutos. Bind finalizado.")
					return;
				}else{
					respuesta_bot(resultado,esto,sid_y_csrf)
					setTimeout(function(){
						descargar_bind(sid,cantidad_binds+1,nick,tiempo_1,sid_y_csrf)
						console.log("Cantidad binds ",cantidad_binds,". ",horas," horas.") // nomostrar
					},Math.floor(Math.random()*30000))
				}
			}else{
				console.log("Comando finalizado.")
				process.exit()
			}
		},
		respuesta: {
			$: true,
			sub: { start: true, data: true,
				end: {
					$: true, analizar: { json: true, html: false }, cb_end: true }}},
		res: {
			$: true,
			reg: { longitud: false, tipo: false, cookies: false, abortar: false }
		},
		error: true
	}))
}
function descargar_auth(sid_y_csrf,nick,tiempo_start){

	var url_3 = host_español+"chat/auth"
	var csrf = sid_y_csrf.split("; ")[1].split("=")[1]
	var datos = {
		csrf: csrf,
		nick: nick //+ (1000+Math.floor(Math.random()*1000)).toString().slice(1)
	}
	var sid = sid_y_csrf.split("; ")[0]
	descargar(url_3,"POST",callback({
		sid_y_csrf: sid_y_csrf,
		headers: {
			"Cookie": sid_y_csrf
		},
		datos_post: objeto_hacia_formulario(datos),
		callback_end: function(x){
			setTimeout(function(){
				descargar_bind(sid,0,nick,tiempo_start,sid_y_csrf)
				// descargar_enviar(carita_aleatoria(),sid_y_csrf)
				descargar_estado(sid_y_csrf)
			},Math.floor(1000+Math.floor(Math.random()*1000)))

			var cb = function(){
				var argumentos = [sid_y_csrf]
				var cb_enviar = function(x,sid_y_csrf){
					console.log(sid_y_csrf,x)
					descargar_enviar(x,sid_y_csrf)
				}
				var cal = function(){
					prompt("Ingrese un mensaje: ",argumentos,false,[true,cb_enviar],[true,cal])
				}
				cal()
			}
			// cb()
		},
		respuesta: {
			$: true,
			sub: { start: true, data: true,
				end: {
					$: true, analizar: { json: true, html: false }, cb_end: true }}},
		res: {
			$: true,
			reg: { longitud: false, tipo: false, cookies: false, abortar: false }
		},
		error: true
	}))
}
function descargar_start(sid_y_csrf,nick){
	var tiempo_start = +Date.now()
	var url_2 = host_español+"chat/start?limit=10"
	console.log(sid_y_csrf)
	descargar(url_2,"GET",callback({
		headers: {"Cookie": sid_y_csrf},
		callback_end: function(x){
			if(!usuarios_entrados.includes(nick))
			{
				usuarios_entrados.push(nick)
				descargar_auth(sid_y_csrf,nick,tiempo_start)
			}else{
				console.log(["Error: El usuario ya había entrado mediante el script."])
				console.log(usuarios_entrados.length,JSON.stringify(usuarios_entrados))
			}
		},
		respuesta: {
			$: true,
			sub: { start: true, data: true,
				end: {
					$: true, analizar: { json: true, html: false }, cb_end: true }}},
		res: {
			$: true,
			reg: { longitud: false, tipo: false, cookies: false, abortar: false }
		},
		error: true
	}))
}
var descargar_avatar = function(id_cola,num_hilo,array_usuarios,resultado,comprobar_avatar_predeterminado){
	if(id_cola.id<id_cola.fin){
		if(array_usuarios.length>0){
			var usuario = array_usuarios.shift()
			var id = usuario[0]
			var url_2 = "http://a.chatovod.com/n/"+id+"/"+id_cola.tipo+"?"+Math.floor(Math.random()*1024*1024)
			descargar(url_2,"GET",callback({
				headers: undefined,
				callback_cookies: function(x){
					var y00 = x.headers.location
					comprobar_avatar_predeterminado(y00,id_cola,num_hilo,array_usuarios,usuario,resultado)
					return true
				},
				respuesta: {
					$: true,
					sub: { start: true, cb_start: true, data: true,
						end: {
							$: true, analizar: { json: false, html: false }, cb_end: false }}},
				res: {
					$: true,
					reg: { longitud: false, tipo: false, cookies: true, abortar: true }
				},
				error: true
			}))

		}
	}else{
		if(!id_cola.completado){
			var tiempo_2 = Date.now()
			console.log("Resultado")
			console.log(resultado)
			id_cola.completado = true
			console.log("Tardó: ",(tiempo_2-tiempo_1)/1000," segundos.")
			// process.exit()
		}
	}
}
function permanecer(nick){
	var url_1 = host_español
	descargar(url_1,"GET",callback({
		callback_cookies: function(res){
			var cookies = res.headers["set-cookie"]
			if(cookies){
				var sid_y_csrf = cookies
					.filter(function(x){return x.match(/sid|csrf/)})
					.map(function(x){return x.split(";")[0]})
					.join("; ")
				;
				descargar_start(sid_y_csrf,nick)
			}else{
				console.log( "No hay cookies para: " + nick )
			}
		},
		callback_end: function(){
			return true
		},
		respuesta: {
			$: false,
			sub: { start: true, data: true,
				end: {
					$: true, analizar: { json: false, html: false }, cb_end: false }}},
		res: {
			$: true,
			reg: { longitud: false, tipo: false, cookies: true, abortar: true }
		},
		error: true
	}))
}
var comprobar_avatar_predeterminado = function(x,id_cola,num_hilo,array_usuarios,usuario,resultado){ // Callback 2
	if(x!=""){
		var avatar_predeterminado = "http://st1.chatovod.com/widget/i/av/"+id_cola.tipo+".jpg"
		var es_avatar_predeterminado = x==avatar_predeterminado
		// console.log(es_avatar_predeterminado,x,avatar_predeterminado)
		if(id_cola.id<id_cola.fin){
			resultado.push(usuario)
			++id_cola.id
			descargar_avatar(id_cola,num_hilo,array_usuarios,resultado,comprobar_avatar_predeterminado)
		}
		setTimeout(function(){permanecer(usuario[1])},Math.floor(Math.random()*100*20))
	}
}
var callback_descargar_usuarios = function(x,cb){
	var pagina = +x
	var url_1 = host_español+"users/?p="+(pagina*20)+"&s=0&_a=on&a=1"
	descargar(url_1,"GET",callback({
		headers: undefined,
		callback_start: function(res){
			console.log("aaaaaaaaaaaaa")
			if(res.statusCode==302){
				var y00 = res.headers.location
				console.log("aaaaaaaaaaaaa")
				comprobar_avatar_predeterminado(y00,id_cola,num_hilo,array_usuarios,usuario,resultado)
				this.abort()
			}
			return true
		},
		callback_end: function(x){
			cb(x)
			return true
		},
		respuesta: {
			$: true,
			sub: { start: true, cb_start: false, data: true,
				end: {
					$: true, analizar: { json: false, html: false }, cb_end: true }}},
		res: {
			$: true,
			reg: { longitud: false, tipo: false, cookies: false, abortar: false }
		},
		error: true
	}))
}
var descargar_usuarios = function(cb2){
	var cb = function(){
		var argumentos = [callback]
		var cb_du = function(x){
			callback_descargar_usuarios(x,cb2)
		}
		var cal = function(){
			prompt("Ingrese la página: ",argumentos,false,[true,cb_du],[false,cal])
		}
		cal()
	}
	cb()
}
var buscar_bots = function(x){ // Callback 1
	console.log(7,x,7)
	try{x}catch(e){x=undefined}
	try{document}catch(e){document={documentElement:{outerHTML:"<html></html>"}}}
	!x&&(x=document.documentElement.outerHTML)
	if(x.match(/d\d+">\r?\n/g)==null){
		console.log(x)
		console.log("Hubo un error al analizar la lista de usuarios.")
		//process.exit()
		return;
	}
	var usuarios = {
		array_id: x.match(/d\d+">\r?\n/g).map(function(x){return x.match(/d(\d+)">\r?\n/)[1]}),
		array_nick: x.match(/>[^<]+<i class="g/g).map(function(x){return x.match(/>([^<]+)<i class="g/)[1]})
	}
	var array_usuarios = []
	for(var i in usuarios.array_id){
		array_usuarios[i] = [usuarios.array_id[i],usuarios.array_nick[i],i]
	}
	console.log(array_usuarios)
	array_usuarios = array_usuarios.filter(function(x){return x[1].match(/^[A-Z][a-z]+[A-Z][a-z]+$/)!=null})
	var id_cola = {
		id: 0,
		fin: array_usuarios.length,
		tipo: "a",
		completado: false
	}
	var resultado = []
	var hilos = 6
	var usuarios_por_parte = Math.ceil(array_usuarios.length/hilos)
	var arrays = []
	for(var i=0;i<hilos;i++){
		var array = array_usuarios.slice(i*usuarios_por_parte,(i+1)*usuarios_por_parte)
		arrays.push(array)
		descargar_avatar(id_cola,i,arrays[arrays.length-1],resultado,comprobar_avatar_predeterminado)
	}
}
var argumentos = function(){
	return {
		página: process.argv[3]?process.argv[3]:"0",
		chat: process.argv[2]?process.argv[2]:"nekonwn",
	}
}
var descargar_usuarios_no_prompt = function(cb2){
	callback_descargar_usuarios(página,cb2)
}
var caritas_especiales = [
	":good:",":handshake:",":meeting:",":island:",
	":football:",":geek:",":james:",":r2d2:",
	":rain:",
	":nyan:",":grumpy:"
]
var carita_aleatoria = function(){
	return caritas_especiales[Math.floor(Math.random()*caritas_especiales.length)]
}

var argus = argumentos()
var chat = argus.chat
var página = argus.página

var mostrar_url = true

var usuarios_entrados = []
var mensajes_timestamp = []

var tiempo_1 = +Date.now()

var host_español = "http://"+chat+".chatovod.com/es/"
//var host = host_español.split("/").slice(0,-2).join("/")+"/"

var iniciar_antibot = function(){
	descargar_usuarios_no_prompt(buscar_bots)
	console.log(chat)
	console.log("Comenzado filtro.")
}
setInterval(iniciar_antibot,1000*40*1)
iniciar_antibot()

