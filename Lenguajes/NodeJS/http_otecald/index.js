var http = require("http")
var https = require("https")

var códigos_de_error = http.STATUS_CODES

var objeto_hacia_formulario = function(datos){
	var array = []
	var objeto = Object.keys(datos)
	for(var i in objeto){
		array.push([objeto[i],datos[objeto[i]]])
	}
	return array.map(function(x){return x.join("=")}).join("&")
}
var objeto_a_pedido = function(descarga){
	return [
		descarga.url
		, descarga.método
		, descarga.cabezas
		, descarga.cbs
		, descarga.poderes
	]
}
var analizar_post_datos = function(args){
	var post = (
		args
		.replace(/\x20/g,"%20")
		.replace(/^([^\?]+)?([\?]+)?((&?[^=]+=[^&]+)+)/g,"$1 $2 $3 $4")
		+ " " + " "
	).split(" ")
	.map(function(x){return x.replace(/%20/g," ")})
	var post_objeto = {
		ruta: post[0]
		, datos: post[2]
	}
	return post_objeto
}
var analizar_url = function(url){
	var protocolo = "(^(https?)://)?"
	var host = "([^/?]+)"
	var parámetros = "(/.+$)?"
	var regex = new RegExp(protocolo+host+parámetros,"")
	var partes = url
		.replace(/\x20/g,"%20")
		.replace(regex,"$2 $3 $4").split(" ")
		.map(function(x){return x.replace(/%20/g," ")})
	var post = analizar_post_datos(partes[2])
	var analizado = {
		protocolo: partes[0]
		, puerto: partes[0]=="https"?443:partes[0]=="http"?80:80
		, "sitio": partes[1]
		, "parámetros": partes[2]
		, post: {
			ruta: post.ruta
			, datos: post.datos
		}
	}
	return analizado
}
var analizar_galletas = function(cabezas,filtro){
	// Ejemplo de uso: analizar_galletas(cabezas,["sid","csrf"])
	var objeto = {}
	var pares = cabezas.map(function(x){
		var pares = x.split("; ")[0].split("=")
		filtro.includes(pares[0]) && (objeto[pares[0]] = pares[1])
	})
	return objeto
}
var descargar = function(url,método,cabezas,cbs,poderes){
	var puede_mostrar = poderes.mostrar.$
	var mostrar = poderes.mostrar
	var mos_res = mostrar.respuesta
	var mos_cab = mostrar.respuesta.cabezas
	var enlace = analizar_url(url)
	var config = {
		hostname: enlace.sitio
		, port: enlace.puerto
		, path: enlace.parámetros
		, method: método||"GET" // "GET" o "POST"
		, headers: cabezas // {"Cookie": "a=2&b=3"} cookies en forma www
	}
	if(método=="POST"){
		config.path = enlace.post.ruta
		config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8"
		config.headers["Content-Length"] = enlace.post.datos.length // Longitud de a=2&b=3
		if(puede_mostrar){
			if(mostrar.enlace.post.datos){
				console.log("Datos: ", enlace.post.datos)
			}
		}
	}
	if(puede_mostrar){
		mostrar.url && console.log(url)
		mostrar.config && console.log(config)
	}
	var cuerpo = ""
	var protocolo = enlace.protocolo=="https"?https:http
	var pedido = protocolo.request(config, function(respuesta) {
		if(puede_mostrar){
			[
				[ mostrar.poderes, "Poderes: " ]
				, [ mostrar.poderes, poderes ]
				, [ mostrar.poderes, "Poderes cabezas: " ]
				, [ mostrar.poderes, mos_cab ]

				, [ mos_cab.galletas, respuesta.headers["set-cookie"] ]
				, [ mostrar.pedido , pedido ]
				, [ mos_res.$, respuesta.headers ]
				, [ mos_cab.redireccionado, respuesta.headers.location ]
				, [ mos_cab.post.longitud, respuesta.headers["content-length"] ]
				, [ mos_cab.post.tipo, respuesta.headers["content-type"] ]
				, [ mostrar.estado, respuesta.statusCode ]
			].map(function(x){
				if(x[0]){
					console.log(x[1])
				}
			})
		}
		var estado = respuesta.statusCode
		if(estado>=300 && estado<=399){ // Redirecciona.
			if(poderes.estado.redireccionar){
				var nueva_url = respuesta.headers.location
				var galletas = respuesta.headers["set-cookie"]
				var galletas_form = objeto_hacia_formulario(galletas)

				var bajar = {
					url: nueva_url
					, método: método
					, cbs: {
						error: function(){
							return true
						}
					}, poderes: {
						mostrar: {
							log: true
							, cuerpo: true
						}, estado: {
							redireccionar: true
							, abortar_pedido: true
						}
					}
				}
				if(galletas_form){
					bajar.cabezas = {Cookies: galletas_form}
				}else{
					bajar.cabezas = {}
				}
				descargar(...objeto_a_pedido(retrollamadas(bajar)))
			}
			if(poderes.estado.abortar){
				pedido.abort()
			}
		}
		respuesta.on("data", function (texto) {
			cuerpo+=texto.toString()
		})
		respuesta.on("end", function(){
			if(puede_mostrar){
				if(mostrar.cuerpo){
					if(estado>=200 && estado<=299){
						 console.log(cuerpo)
					}else{
						 console.log("El código de estado no es de tipo 2xx.")
						 console.log(cuerpo)
					}		
				}
			}
		})
	})
	if(método=="POST"){
		pedido.write(enlace.post.datos)
	}
	pedido.on("error", function(e) {
		cbs.error(e)
		//process.exit()
		poderes.mostrar.log && poderes.mostrar.error && console.log("Error: ",e)
	})
	pedido.end()
}
var asignar = function(variable,ruta,debug){
	var partes = ruta.split("=")
	var array_ruta = partes[0].split(".")
	for(var i=1;i<array_ruta.length;i++){
		var seccionado = "variable."+array_ruta.slice(0,i).join(".")
		var evaluado = [false]
		try{
			evaluado = [true,eval(seccionado)]
			if(evaluado[0]==true&&evaluado[1]==undefined)
			{
				eval(seccionado+"={}")
			}
		}catch(e){
			existe = false
			eval(seccionado+"={}")
		}
	}
	var ruta_total = "variable."+partes[0]
	var eval_2 = eval(ruta_total)
	debug && console.log(ruta_total,eval_2)
	if(eval_2==undefined){
		eval(ruta_total+"="+partes[1])
	}
	return variable
}
var retrollamadas = function(bajar){
	if(bajar==undefined){
		bajar = {}
	}
	var sip =  "=" + true
	var nop =  "=" + false
	var asignaciones = [
		"url='google.com'"
		, "método='GET'"
		, "cabezas={}"
		, "cbs={}"
		, "poderes.mostrar.$" + sip
		, "poderes.mostrar.url" + sip
		, "poderes.mostrar.config" + nop
		, "poderes.mostrar.pedido" + nop
		, "poderes.mostrar.estado" + nop
		, "poderes.mostrar.cuerpo" + sip
		, "poderes.mostrar.poderes" + nop
		, "poderes.mostrar.enlace.$" + nop
		, "poderes.mostrar.enlace.post.datos" + nop
		, "poderes.mostrar.respuesta.$" + nop
		, "poderes.mostrar.respuesta.cabezas.$" + sip
		, "poderes.mostrar.respuesta.cabezas.redireccionado" + sip
		, "poderes.mostrar.respuesta.cabezas.galletas" + sip
		, "poderes.mostrar.respuesta.cabezas.post.longitud" + nop
		, "poderes.mostrar.respuesta.cabezas.post.tipo" + nop
		, "poderes.estado.redireccionar" + sip
		, "poderes.estado.abortar" + nop

	].map(function(x){
		asignar(bajar,x,false)
	})
	return bajar
}
var descargar_normal = function(url,método,cabezas){
	var bajar = {
		url: url
		, método: método
		, cabezas: cabezas
		, cbs: {
			error: function(){
				return true
			}
		}, poderes: {
			mostrar: {
				log: true
				, cuerpo: true
			}, estado: {
				redireccionar: true
				, abortar_pedido: true
			}
		}
	}
	descargar(...objeto_a_pedido(retrollamadas(bajar)))
}
var descargar_flavio = function(){
	console.log("Extraído de: ", "https://flaviocopes.com/node-http-post/")
	var datos = JSON.stringify({
	  todo: "Buy the milk"
	})
	console.log("Datos: ", datos, datos.length)
	var protocolo = https
	var config = {
		hostname: "flaviocopes.com",
		port: protocolo==https?443:80,
		path: "/todos",
		method: "POST",
		headers: {
			"Content-Type": "application/json"
			, "Content-Length": datos.length
		}
	}
	var pedido = protocolo.request(config,function(respuesta){
		console.log(respuesta.statusCode)

	  respuesta.on("data", function(texto){
		process.stdout.write(texto)
	  })
	})
	pedido.on("error", function(error){
	  console.error(error)
	})
	pedido.write(datos)
	pedido.end()
}
var replicar_flavio = function(){
	console.log("Extraído de: ", "https://flaviocopes.com/node-http-post/")
	var bajar = {
		url: "https://flaviocopes.com/todos?todo=Buy the milk"
		, método: "POST"
		, cabezas: {
			//"Cookie": "a=2&b=3"
		}
		, cbs: {
			error: function(){
				return true
			}
		}, poderes: {
			mostrar: {
				$: true
				, url: true
				, config: true
				, pedido: false
				, estado: true
				, cuerpo: true
				, poderes: true
				, enlace : {
					$: false
					, post: {
						datos: true
				}}
				, respuesta: {
					$: false
					, cabezas: {
						$: true
						, redireccionado: true
						, galletas: true
						, post: {
							longitud: true
							, tipo: true
			}}}}
			, estado: {
				redireccionar: true
				, abortar_pedido: false
			}
		}
	}
	descargar(...objeto_a_pedido(retrollamadas(bajar)))
}
module.exports = {
	códigos_de_error: códigos_de_error

	, objeto_hacia_formulario: objeto_hacia_formulario
	, objeto_a_pedido: objeto_a_pedido

	, analizar_post_datos: analizar_post_datos
	, analizar_url: analizar_url
	, analizar_galletas: analizar_galletas

	, descargar: descargar
	, asignar: asignar
	, retrollamadas: retrollamadas
	, descargar_normal: descargar_normal

	, descargar_flavio: descargar_flavio
	, replicar_flavio: replicar_flavio
}

