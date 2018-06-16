// ==UserScript==
// @name		 Chatovod
// @version	  0.7
// @description  Mejoras para el Chatovod.
// @author	   ArtEze
// @match		*://*.chatovod.com/*
// @grant		none
// ==/UserScript==

"use strict";

window.votos = {}
var votos = window.votos
window.máximo = 0

var desconocimiento = [
	"No lo sé.",
	"No tengo idea.",
	"Realmente yo no lo sé.",
	"¿y yo qué voy a saber?",
	"Solo soy un programa, no me pregunte eso.",
	"Quizás lo sepa otra persona.",
	"No tengo ese conocimiento.",
	"No sé de dónde obtener esa información.",
	"Esa pregunta me parece complicada de responder.",
	"No me programaron para responder eso.",
	"Si tuviera la bola de cristal te lo diría."
]
var error_de_cálculo = [
	"No se ha podido calcular correctamente.",
	"Tuve problemas al realizar la operación que has pedido.",
	"Usted me ha pedido algo que me parece imposible de resolver.",
	"Perdone, pero esa pregunta me parece algo compleja.",
	"Se me dificultó un poco resolver eso, por lo que me he rendido."
]

var madre = [ "vieja", "viejo", "madre", "padre", "papá", "mamá", "madrastra", "padrastro", "zorra", "novia", "perrita", "novio", "abuela", "futuro hijo", "futura hija", "amigo de la esquina", "jefe", "jefa", "prima", "abuela", "tía", "tío", "esposa", "esposo", "nieto", "nieta", "tatarabuela", "tatarabuelo", "sobrino", "sobrina", "mujer", "hombre", "bisabuelo", "bisabuela" ]

var sexo = [ "garché", "cojí", "emperné", "empomaba", "empomé", "entubaba", "culeaba", "trinqué", "encamé", "acosté", "conejeaba", "daba matraca", "le estaba enterrando la batata", "mojé el bizcocho", "se la puse", "soplaba la cañita", "sobaba el pirulín", "le regaba la lechuga", "le divertía el pelado", "le germinaba el poroto", "le sacaba las telarañas", "me enflautaba", "fui a echarle un fierro", "le mojé la chaucha", "le pintaba el templo", "le regué la lechuga", "le lustraba la manija", "le destapaba las cloacas", "le limpié el horno" ]

window.objeto_aleatorio = function(objeto)
{
	return objeto[Math.floor(Math.random()*objeto.length)]
}
var objeto_aleatorio = window.objeto_aleatorio

window.descargar = function(dirección,función)
{
	var descarga = new XMLHttpRequest()
	descarga.onreadystatechange = function(){
		if (descarga.readyState == 4 && descarga.status == 200)
		{
			if(función!=undefined)
			{
				función(descarga.responseText)
			}else
			{
				var descargado = descarga.responseText
				if(/error/gi.test(descargado)){console.log("error",dirección)}
				console.log(descargado)
			}
		}
	}
	descarga.open("GET",dirección)
	descarga.send()
}
window.obtener_CSRF = function()
{
	return location.host=="admin.chatovod.com"
		?document.querySelector(".navbar-right>li>ul>li:nth-child(2)>a").href.slice(-6)
		:document.body.querySelector("script").textContent.match(/\x22[A-Za-z0-9]{6}\x22/g)[0].slice(1,-1)
}
var obtener_CSRF = window.obtener_CSRF
window.banear_según_minutos = function(nombre,minutos,causa)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = minutos>=0?"ban":"signOut"
	var fin = ""
	if(minutos>=0){fin+="&roomId=1&nick=" + nombre}
	if(minutos>0){fin+="&minutes=" + minutos + "&comment=" + causa}
	var dirección = chat + modo + "?csrf="+ obtener_CSRF() + fin
	window.descargar(dirección,x=>console.log(x))
}
var banear_según_minutos = window.banear_según_minutos
window.analizar_moderación = function(datos,nombre,función)
{
	var objeto = JSON.parse(datos)
	console.log(objeto,nombre)
	var identidad = objeto.accountId
	función(nombre,identidad)
}
var analizar_moderación = window.analizar_moderación
window.moderar_usuario = function(nombre,función)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var dirección = chat + "getChatNickLocalModInfo?nick=" + nombre
	window.descargar(dirección,función)
}
var moderar_usuario = window.moderar_usuario
window.eliminar_mensaje = function(número,sala)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = "deleteMessages"
	var fin = "&roomId="+sala+"&messages=" + número
	var dirección = chat + modo + "?csrf="+ obtener_CSRF() + fin
	window.descargar(dirección)
}
var eliminar_mensaje = window.eliminar_mensaje
window.enviar_mensaje = function(mensaje,sala,usuarios)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = "send"
	var hacia = usuarios==undefined?"":usuarios
	var fin = "&to="+hacia+"&roomId="+sala+"&msg="+ mensaje
	var dirección = chat + modo + "?csrf="+ obtener_CSRF() + fin
	window.descargar(dirección)
}
var enviar_mensaje = window.enviar_mensaje
window.obtener_país = function(datos,usuario,sala,hacia)
{
	var elemento = document.createElement("html")
	elemento.innerHTML = datos
	var fecha = new Date()
	var hora = fecha.getUTCHours()
	var minutos = dos_dígitos(fecha.getUTCMinutes())
	var placeLine = elemento.querySelector(".placeLine")
	var mensaje
	if(placeLine!=undefined)
	{
		var país = placeLine.textContent.replace(/[\s]/gi,"").split(",")[0]
		var cambio = obtener_GMT(país)
		if(cambio!=undefined)
		{
			mensaje = "Las " + dos_dígitos((hora+24+cambio)%24) + ":" + minutos + "."
		}else{
			mensaje = objeto_aleatorio(desconocimiento)
		}
	}else{
		mensaje = objeto_aleatorio(desconocimiento)
	}
	enviar_mensaje(mensaje,sala,[usuario])
}
window.pedir_hora_usuario = function(datos,usuario,sala,hacia)
{
	var objeto = JSON.parse(datos)
	var identidad = objeto.nickId
	var sitio = location.protocol +"//"+location.host
	var dirección = sitio + "/id"+identidad
    var mensaje
	if(identidad!=undefined)
	{
		console.log(dirección)
		window.descargar(dirección,x=>window.obtener_país(x,usuario,sala,hacia))
	}else{
		mensaje = objeto_aleatorio(desconocimiento)
		enviar_mensaje(mensaje,sala,[usuario])
	}
}
function operar_perfil(usuario,sala,hacia)
{
	moderar_usuario(usuario,(datos)=>window.pedir_hora_usuario(datos,usuario,sala,hacia))
}
function aleatorio_hora()
{
	return 60000*Math.floor(1+Math.random()*720)
}
function dos_dígitos(número)
{
	return (número/100).toFixed(2).slice(2)
}
function decir_la_hora()
{
	var fecha = new Date()
	var hora = fecha.getUTCHours()
	var minutos = dos_dígitos(fecha.getUTCMinutes())
	// Falta: Bolivia, Costa Rica, Cuba, El Salvador, Honduras
	var color = "12aa21"
	var sp = "%0a"
	var mensaje = "[color=%23"+color+"]Horas en el mundo: [/color]" + sp +
		dos_dígitos((hora+24-3)%24) + ":" + minutos + " Argentina y Uruguay." + sp +"[color=%23"+color+"]" +
		dos_dígitos((hora+24-4)%24) + ":" + minutos + " Chile, Paraguay, República Dominicana y Venezuela." + sp + "[/color]" +
		dos_dígitos((hora+24-5)%24) + ":" + minutos + " Colombia, Ecuador, México, Panamá y Perú." + sp + "[color=%23"+color+"]" +
		dos_dígitos((hora+24-6)%24) + ":" + minutos + " Guatemala y Nicaragua." + sp +"[/color]" +
		dos_dígitos((hora+24+2)%24) + ":" + minutos + " España."
	enviar_mensaje(mensaje,1)
	var tiempo = aleatorio_hora()
	setTimeout(decir_la_hora,tiempo)
}
window.banear_18 = function(entrada,usuario,número,sala)
{
	if(/\bsexy?\b/gi.test(entrada)&/https?:\/\//gi.test(entrada))
	{
		eliminar_mensaje(número,sala)
		banear_según_minutos(usuario,44640,"%2B18")
	}
}
window.banear_otro_chat = function(entrada,usuario,número,sala)
{
	if(entrada.includes("chatovod.com")&!entrada.includes(location.host.split(".")[0]))
	{
		borrar = true
		var lista = ["a","st1","coins","help","account","admin"]
		for(var i in lista)
		{
			if(entrada.includes(lista[i]+".chatovod.com"))
			{
				booleano = false
				break
			}
		}
		if(booleano)
		{
			eliminar_mensaje(número,sala)
			banear_según_minutos(usuario,44640,"Pasar chat.")
		}
	}
}
function martillo(entrada,número,sala)
{
	if(/\b[aeiou]*m[aeiou]+rt[aeiou]+(ll|y|sh).*[aeiou]+[ns]?\b/gi.test(entrada))
	{
		eliminar_mensaje(número,sala)
	}
}
window.detectar_enlaces = function(entrada)
{
	var entrada = entrada
	var g = "[a-z0-9-_]+" // Dominio a.a.com
	var h = "[a-z0-9-_=]+" // /aa/aa/aa
	var expresión =	new RegExp(
		(g+"\\.")+g // Dominio
		+"(\/"+h+")+" // /aa/aa/aa
		+"\\??" // ?
		+"(\\.?"+h+")+(\\.(jpe?g)|(gif)|(png))?"
		,"gi"
	)
	entrada = entrada.replace(/https?:\/\//gi,"")
	entrada = entrada.replace(/%3A/gi,":")
	entrada = entrada.replace(/%2F/gi,"/")
	entrada = entrada.split(/\[img][^\x5B\x5d]+\[\/img]/gi).join("")
	var enlaces = entrada.match(expresión)
	return enlaces
}
detectar_enlaces = window.detectar_enlaces
window.mostrar_imágenes = function(entrada,número,usuario,sala,hacia)
{
	var color = Array.map(
		document.querySelectorAll(".chatUsers")[0].querySelectorAll("li a")
		,x=>[
			x.textContent
			,x.style.color.match(/\d+/gi)
		]
	).map(
		x=>x[1]==null?[x[0],"1D6E9C"]:[
			x[0]
			,x[1].map(x=>("0"+(1*x).toString(16)).slice(-2)).join("")
		]
	).map(x=>x[0]==usuario?x[1]:undefined).filter(x=>x!=undefined)[0]
	var enlaces = detectar_enlaces(entrada)
	var salida = ""
	var puede_enviar = [false,false]
	var borrar = true
	function env(a){a[0]=true;a[1]=true}
	for(var i in enlaces)
	{
		var actual = enlaces[i]
		var res = actual
		res = res.replace(/\/subefotos\.com\/ver\/\?/gi,"fotos.subefotos.com/")
		puede_enviar[0] = false
		if(res.match(/\.(png|jpg|gif)/gi))
		{
			env(puede_enviar)
			//borrar = true
		}
		if(
			res.includes("gstatic.")
			|res.includes("ddn.i.ntere.st")&res.includes("image")
		){
			env(puede_enviar)
		}
		if(res.includes("imgur.com")|res.includes("gyazo.com"))
		{
			if(
				!res.includes("i.")
				&!res.includes(".png")
				&!res.includes(".jpg")
				&!res.includes(".jpeg")
				&!res.includes(".gif")
			){
				res = "i." + res
				env(puede_enviar)
			}
		}
		if(res.includes("giphy.com")&!res.includes("giphy.gif"))
		{
			res = "media.giphy.com/media/" + res.match(/[0-9a-z]+/gi).slice(-1)[0] + "/giphy.gif"
			env(puede_enviar)
		}
		if(res.includes("youtube.com"))
		{
			borrar = true
			env(puede_enviar)
			res = "i.ytimg.com/vi/"
				+ res.match(/v=[a-z0-9-_]+/gi)[0].split("=").slice(-1)[0]
				+ "/hqdefault.jpg"
		}
		if(res.includes("youtu.be"))
		{
			borrar = true
			env(puede_enviar)
			res = "i.ytimg.com/vi/"
				+ res.match(/[a-z0-9-_]+/gi).slice(-1)[0]
				+ "/hqdefault.jpg"
		}
		if(puede_enviar[0])
		{
			var protocolo = "http"
			var sitios = [
				["ytimg"]
				,["gstatic","imgur","gyazo","amazon","discordapp","pinimg"]
			]
			for(var j in sitios)
			{
				var actual_2 = sitios[j]
				for(var k in actual_2)
				{
					var actual_3 = actual_2[k]
					console.log(res,actual_3)
					if(res.includes(actual_3))
					{
						protocolo = "https"
						borrar = true
					}else
					{

					}
				}
			}
			var bool = false
			if(actual.includes("gyazo."))
			{
				salida += "[img]"+protocolo+"://"+res+".jpg[/img]"
				salida += "[img]"+protocolo+"://"+res+".png[/img]"
				salida += "[img]"+protocolo+"://"+res+".gif[/img]"
				bool = true
			}
			if(!bool&actual.match(/youtu\.be|youtube\./gi)!=null)
			{
				salida += "[img]"+protocolo+"://"+res+"[/img]%0A" + protocolo+"://" + actual + ""
				bool = true
			}
			if(!borrar)
			{
				salida += " " + protocolo+"://"+res
			}
			salida+="%0AEnviado por: [b][color=%23"+color+"]"+usuario+"[/color][/b]"
		}else
		{
			salida+=res
		}
	}
	if(puede_enviar[1])
	{
		//console.log(salida)
		enviar_mensaje(salida,1,hacia)
		if(borrar){eliminar_mensaje(número,sala)}
	}
}
function banear_por_votos(entrada,hacia)
{
	if(entrada.match(/(^ban$)|(^\[b]ban\[\/b]$)/gi)!=null & hacia!=undefined )
	{
		if(hacia.length==1)
		{
			var votado = hacia[0]
			if(votos[votado]==undefined){votos[votado]=0}
			++votos[votado]
			enviar_mensaje(votado+" tiene "+votos[votado]+" votos",1)
			if(votos[votado]>=5){banear_según_minutos(votado,60,"Votación de usuarios.");votos=0}
		}
	}
}
function agregar_imagen(datos,usuario,hacia,sala)
{
	var objeto = JSON.parse(datos)
	var identidad = objeto.nickId
	var hospedaje = "a.chatovod.com"
	var sitio = location.protocol +"//"+ hospedaje
	if(identidad!=undefined)
	{
		enviar_mensaje("[img]"+sitio+"/n/"+identidad+"/d[/img]",sala,[usuario,hacia])
	}
}
function mostrar_avatares(entrada,usuario,hacia,sala)
{
	if( entrada.match(/^avatar\s?[0-9]*$/gi)!=null & hacia!=undefined )
	{
		var salida = ""
		for(var i in hacia)
		{
			var actual = hacia[i]
			var función_2 = (datos)=>agregar_imagen(datos,usuario,actual,sala)
			moderar_usuario(actual,función_2)

		}
	}
}
window.quitar_puntos_números = function(entrada)
{
	var devuelve = true
	var números = entrada.match(/(\b\d{1,3}(\.\d{3})+\b)/gi)
	if(números==null)
	{
		devuelve = false
	}else{
		var mapa = números.map(x=>x.replace(/\./gi,""))
		for(var i in mapa)
		{
			var regex = new RegExp(números[i],"gi")
			entrada = entrada.replace(regex,mapa[i])
		}
	}
	return [entrada,devuelve]
}
var quitar_puntos_números = window.quitar_puntos_números
function formatear_número(número)
{
	var array = []
	var salida = número+""
	while(salida.length>=3)
	{
		array.unshift(salida.slice(-3))
		salida = salida.slice(0,-3)
	}
	if(salida!=""){array.unshift(salida)}
	return array.join(".")
}
window.evaluar_javascript = function(entrada,usuario,sala,hacia)
{
	var conv = entrada
	var es_texto = conv.match(/^"[^"]+"$/gi)!=null
	if(es_texto)
	{
		sala=1
		enviar_mensaje(entrada.slice(1,-1),sala,hacia)
		return;
	}
	else
	{
		hacia = [usuario]
	}
	if(!es_texto)
	{
		conv = conv.replace(/\?/gi,"")
		conv = conv.replace(/\¿/gi,"")
		conv = conv.replace(/^\s*y*\s*?/gi,"")
		if(conv.match(/:[a-z0-9]+:/gi)==null)
		{
			conv = conv.replace(/:\S/gi,"")
			conv = conv.replace(/\S:/gi,"")
			conv = conv.replace(/>:v/gi,"")
		}
		conv = conv.replace(/%/gi,"/")
		conv = conv.replace(/dd/gi,"")
		conv = conv.replace(/xd+/gi,"")
		conv = conv.replace(/x+/gi,"x")
		conv = conv.replace(/=$/gi,"")
		conv = conv.replace(/\.\./gi,"")
		var quitar_puntos = quitar_puntos_números(conv)
		conv = quitar_puntos[0]
		conv = conv.replace(/,/gi,".")
		conv = conv.replace(/\bal\s+cuadrado\b/gi,"^2")
		conv = conv.replace(/\bal\s+cubo\b/gi,"^3")
		conv = conv.replace(/(\d+)\s*((\^)|(a la)|(al))\s*(\d+)/gi,"Math.pow($1,$6)")

		// Palabras
		conv = conv.replace(/^\s*b[aeiouáéíóú]t\b/gi,"")

		conv = conv.replace(/\bmenos\b/gi," - ")
		conv = conv.replace(/\bmas\b/gi," + ")
		conv = conv.replace(/\bpor\b/gi," * ")
		conv = conv.replace(/\bcu[aá]ntos?\b/gi,"")
		conv = conv.replace(/\bes\b/gi,"")
		conv = conv.replace(/\bcu[aá]l\s+es\b/gi,"")
		conv = conv.replace(/\b(el)|(la)\b/gi,"")
		conv = conv.replace(/\b(entre)|(dividido)\b/gi,"/")
		if(!conv.includes("=>"))
		{
			conv = conv.replace(/[×x]/gi," * ")
		}
		if(conv.match(/(ra[ií]z)|(log)/gi)!=null)
		{
			conv = conv.replace(/log(()|(2)|(1p)|(10)) (\d+)/gi,"Math.log$1($6)")
			conv = conv.replace(/log(\d+)\s+(\d+)/gi,"Math.log($2)*Math.log(Math.E)/Math.log($1)")
			conv = conv.replace(/ra[ií]z\s+c[uú]bica\s+(de\s+)?(\d+)/gi,"+Math.pow($2,1/3).toFixed(14)")
			conv = conv.replace(/ra[ií]z( cuadrada)? del? (\d+)/gi,"Math.sqrt($2)")
			quitar_puntos[1] = false
		}
		var está_convertido = false
		var convertido
		if(conv.match(/^\d+$/gi)!=null)
		{
			conv = "\""+window.númeroHaciaLetras(conv.match(/\d+/gi).join(""))+"\""
			quitar_puntos[1] = false
			está_convertido = true
		}
		if(!está_convertido)
		{
			if(conv.match(/^[a-z\sáéíóú]+.?$/gi)!=null)
			{
				convertido = "\""+formatear_número(window.letrasHaciaNúmero(
					conv.match(/[a-z\s.áéíóú]+/gi).join(" ")
				).replace(/\./gi,""))+"\""
				if(convertido!="\"0\""|convertido=="\"0\""&conv.match(/cero/gi)!=null)
				{
					conv = convertido
					quitar_puntos[1] = false
					está_convertido = true
				}
			}
		}
	}
	if(conv!="")
	{
		var resultado = ""
		try{
			resultado = eval(conv)
			if(
				typeof resultado != "function"
				& typeof resultado != "object"
				& typeof resultado != "undefined"
				& resultado+"" != "NaN"
				& entrada.match(/^\s*oh\s*$/)==null
			){
				if(quitar_puntos[1]){resultado = formatear_número(resultado)}
				resultado = resultado+""
				if(isFinite(resultado)){resultado = resultado.replace(/\./gi,",")}
				resultado = resultado.replace(/\+/gi,"%2B")
				if(resultado.includes("undefined"))
				{
					enviar_mensaje(objeto_aleatorio(error_de_cálculo),sala,hacia)
				}else
				{
					enviar_mensaje(resultado,sala,hacia)
				}
			}else{
				console.log("error",resultado)
			}
		}catch(e)
		{
			console.log("error 2",resultado)
		}
	}
}
function obtener_GMT(entrada)
{
	var cambio
	if(entrada!=undefined)
	{
		if(entrada.match(/argentina|uruguay/gi)!=null){cambio = -3}
		if(entrada.match(/chile|paraguay|rep[uú]blica dominicana|venezuela/gi)!=null){cambio = -4}
		if(entrada.match(/colombia|m[eé]xico|panam[aá]|per[uú]|ecuador/gi)!=null){cambio = -5}
		if(entrada.match(/guatemala|nicaragua/gi)!=null){cambio = -6}
		if(entrada.match(/espa[ñn]i?a|spain/gi)!=null){cambio = 2}
	}
	return cambio
}
window.pedir_la_hora = function(entrada,usuario,sala,hacia)
{
	var hecho = false
    var mensaje
	if(
		!hecho
		&entrada.match(/\bhora\b/gi)!=null
		&entrada.match(/virgo|gil|gay|novi/gi)!=null
	){
		mensaje = "La hora en la que " + objeto_aleatorio(sexo) + " a tu " + objeto_aleatorio(madre)+"."
		enviar_mensaje(mensaje,sala,[usuario])
	}else{
		if(!hecho&entrada.match(/(([qk]u?)|k)h?[eé]?h? h?ora e[hs]?/gi)!=null)
		{
			mensaje = ""
			var fecha = new Date()
			var hora = fecha.getUTCHours()
			var minutos = dos_dígitos(fecha.getUTCMinutes())
			// Falta: Bolivia, Costa Rica, Cuba, Ecuador, El Salvador, Honduras
			var color = "12aa21"
			var sp = "%0a"
			var cambio = obtener_GMT(entrada)
			if(cambio!=undefined)
			{
				mensaje = "Las " + dos_dígitos((hora+24+cambio)%24) + ":" + minutos + "."
				enviar_mensaje(mensaje,sala,[usuario])
			}else{
				if(
					entrada.match(/ en /gi)!=null
					&entrada.match(/mi pa[íi]s/gi)==null
				){
					mensaje = objeto_aleatorio(desconocimiento)
					enviar_mensaje(mensaje,sala,[usuario])
				}
				else
				{
					operar_perfil(usuario,sala,hacia)
				}
			}
		}
	}
}
window.fonetizar_mensaje = function(entrada,usuario,sala,hacia)
{
	if(entrada.match(/^\s*fon\s+/gi)!=null)
	{
		entrada = entrada.replace(/^\s*fon\s+/gi,"")
		entrada = window.fonetizar(entrada)
		enviar_mensaje(entrada,sala,[usuario])
	}
}
window.color_arcoiris = function(entrada,usuario,sala,hacia)
{
	if(entrada.match(/^\s*color\s+/gi)!=null)
	{
		entrada = entrada.replace(/^\s*color\s+/gi,"")
		entrada = entrada.replace(/\[\/?b\]/gi,"")
		entrada = window.gradual(0,30,entrada,13,0,1)
		entrada = "[b]"+entrada+"[/b]"
		entrada = entrada.replace(/#/gi,"%23")
		enviar_mensaje(entrada,sala,[])
	}
}
window.procesar_mensajes = function(b)
{
	var entrada = b.m
	var número = b.ts
	var usuario = b.f
	var sala = b.r
	var hacia = b.to
	console.log(usuario,número,sala)
	console.log(entrada)
	console.log(hacia)
	if(!/bot/gi.test(usuario))
	{
		if(número>window.máximo)
		{
			window.máximo = número
			window.banear_18(entrada,usuario,número,sala)
			window.banear_otro_chat(entrada,usuario,número,sala)
			martillo(entrada,número,sala)
			window.mostrar_imágenes(entrada,número,usuario,sala,hacia)
			banear_por_votos(entrada,hacia)
			window.pedir_la_hora(entrada,usuario,sala,hacia)
			mostrar_avatares(entrada,usuario,hacia,sala)
			window.evaluar_javascript(entrada,usuario,sala,hacia)
			window.fonetizar_mensaje(entrada,usuario,sala,hacia)
			window.color_arcoiris(entrada,usuario,sala,hacia)
		}
	}
}
window.cargar = function()
{
	var existe_nick = window.nickMenu
	var nick = existe_nick!=undefined?window.nickMenu.textContent.slice(0,-1):""
	if(/bot/gi.test(nick))
	{
		window.cc.prototype.log = function (a, b, c) {
			console.log(a,b,c)
			var info = b.split(" ")
			var entrada = info[0]
			entrada = entrada=="enter"?1:entrada=="leave"?0:-1
			var nombre = info.slice(1).join(" ")
			if(entrada>=0)
			{
				if(entrada)
				{
					console.log(nombre)
				}
			}
		}
		window.yq = function(a, b) {
			window.procesar_mensajes(b)
			var c,d
			void 0!==b.r?(c="room",d=b.r):(
				c="private"
				,d=b.f&&a.j.nick&&a.j.nick.toLowerCase()==b.f.toLowerCase()?b.p:b.f?b.f:b.p
			)
			var e=a.I[c+("room"==c?d:d.toLowerCase())]
			window.xq(a,e,c,d,b)
		}
		//Array.map(document.querySelectorAll("link[rel="stylesheet"]"),x=>x.remove())
		setTimeout(decir_la_hora,aleatorio_hora())
		try{if(
			!location.pathname.includes("id")
			&!location.pathname.includes("users")
			&!location.pathname.includes("login")
		)
		{
			document.querySelectorAll("link")[3].remove()
		}}catch(e){}
		console.log("Cargado")
	}
}
setTimeout(window.cargar,6000)
