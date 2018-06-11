// ==UserScript==
// @name		 Chatovod
// @version	  0.7
// @description  Mejoras para el Chatovod.
// @author	   ArtEze
// @match		*://*.chatovod.com/*
// @grant		none
// ==/UserScript==

'use strict';

// ban bot

window.votos = {}

var desconocimiento = [
	"No lo sé.",
	"No tengo idea.",
	"Realmente yo no lo sé.",
	"¿y yo qué voy a saber?",
	"Solo soy un bot, no me pregunte eso.",
	"Quizás lo sepa otra persona.",
	"No tengo ese conocimiento.",
	"No sé de dónde obtener esa información.",
	"Esa pregunta me parece complicada de responder.",
	"No me programaron para responder eso.",
	"Si tuviera la bola de cristal te lo diría."
]
window.responder_sin_saber = function()
{
	return desconocimiento[Math.floor(Math.random()*desconocimiento.length)]
}
var responder_sin_saber = window.responder_sin_saber
window.descargar = function(dirección,función)
{
	var descarga = new XMLHttpRequest()
	descarga.onreadystatechange = function(){
		if (descarga.readyState == 4 && descarga.status == 200)
		{
			función!=undefined?función(descarga.responseText):console.log(descarga.responseText)
		}
	}
	descarga.open('GET',dirección)
	descarga.send()
}
var descargar = window.descargar
window.obtener_CSRF = function()
{
	return location.host=="admin.chatovod.com"
		?document.querySelector(".navbar-right>li>ul>li:nth-child(2)>a").href.slice(-6)
		:document.body.querySelector('script').textContent.match(/\x22[A-Za-z0-9]{6}\x22/g)[0].slice(1,-1)
}
var obtener_CSRF = window.obtener_CSRF
window.banear_según_minutos = function(nombre,minutos,causa)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = minutos>=0?"ban":"signOut"
	var fin = ""
	if(minutos>=0){fin+="&roomId=1&nick=" + nombre}
	if(minutos>0){fin+="&minutes=" + minutos + '&comment=' + causa}
	var dirección = chat + modo + "?csrf="+ obtener_CSRF() + fin
	descargar(dirección,x=>console.log(x))
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
	descargar(dirección,función)
}
var moderar_usuario = window.moderar_usuario
window.eliminar_mensaje = function(número,sala)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = "deleteMessages"
	var fin = "&roomId="+sala+"&messages=" + número
	var dirección = chat + modo + "?csrf="+ obtener_CSRF() + fin
	descargar(dirección)
}
var eliminar_mensaje = window.eliminar_mensaje
window.enviar_mensaje = function(mensaje,sala,usuarios)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = "send"
	var hacia = usuarios==undefined?"":usuarios
	var fin = "&to="+hacia+"&roomId="+sala+"&msg="+ mensaje
	var dirección = chat + modo + "?csrf="+ obtener_CSRF() + fin
	descargar(dirección)
}
var enviar_mensaje = window.enviar_mensaje
function obtener_país(datos,usuario)
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
			mensaje = responder_sin_saber()
		}
	}else{
		mensaje = responder_sin_saber()
	}
	enviar_mensaje(mensaje,1,[usuario])
}
function pedir_hora_usuario(datos,usuario)
{
	var objeto = JSON.parse(datos)
	var identidad = objeto.nickId
	var sitio = location.protocol +"//"+location.host
	var dirección = sitio + "/id"+identidad
	if(identidad!=undefined)
	{
		descargar(dirección,x=>obtener_país(x,usuario))
	}else{
		mensaje = responder_sin_saber()
		enviar_mensaje(mensaje,1,[usuario])
	}
}
function operar_perfil(usuario)
{
	moderar_usuario(usuario,(datos)=>pedir_hora_usuario(datos,usuario))
}
function baneo_automático(nombre,identidad)
{
	var devuelve = false
	if(nombre.match(/arteze/gi)!=null&identidad!=1543185)
	{
		banear_según_minutos(nombre,44640,"Copiar nick")
		devuelve = true
	}
	if(
		identidad==undefined
		&nombre.match(/^[a-z]+19[78]\d$/g)!=null
	)
	{
		/*
			"\nSex in your city! http://annahayes38784.tumblr.com"
			"\nSex in your city! http://lisavargas38925.tumblr.com"
			"\nI want sex, write  me http://lukundowang23413.tumblr.com"
			"Alenka21: online sex dating! I am from Russia, small sexy model -->> ❤ https://kissx-chat.blogspot.com/ ❤"
		*/
		banear_según_minutos(nombre,44640,"Chau")
		devuelve = true
	}
	return devuelve
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
		dos_dígitos((hora+24-4)%24) + ":" + minutos + " Chile, Paraguay y Venezuela." + sp + "[/color]" +
		dos_dígitos((hora+24-5)%24) + ":" + minutos + " Colombia, Ecuador, México, Panamá y Perú." + sp + "[color=%23"+color+"]" +
		dos_dígitos((hora+24-6)%24) + ":" + minutos + " Guatemala y Nicaragua." + sp +"[/color]" +
		dos_dígitos((hora+24+2)%24) + ":" + minutos + " España."
	enviar_mensaje(mensaje,1)
	var tiempo = aleatorio_hora()
	setTimeout(decir_la_hora,tiempo)
}
function mostrar_imágenes(entrada,número,usuario,sala,hacia)
{
	var colores = Array.map(
		document.querySelectorAll(".chatUsers")[0].querySelectorAll("li a")
		,x=>[
			x.textContent
			,x.style.color.match(/\d+/gi)
		]
	)
	colores = colores.map(
		x=>x[1]==null?[x[0],"1D6E9C"]:[
			x[0]
			,x[1].map(x=>("0"+(1*x).toString(16)).slice(-2)).join("")
		]
	)
	var color
	for(var i in colores)
	{
		if(colores[i][0]==usuario)
		{
			color = colores[i][1]
			break
		}
	}
	var accionado = false
	if(
		entrada.match(/\b[aeiou]*m[aeiou]+rt[aeiou]+(ll|y|sh).*[aeiou]+[ns]?\b/gi)!=null
		|entrada.includes("http")&usuario.match(/^[a-z]+19[78]\d$/g)!=null
		|entrada.includes("chatovod.com")
			&!entrada.includes(location.host.split(".")[0])
			&!entrada.includes("coins.chatovod.com")
			&!entrada.includes("st1.chatovod.com")
			&!entrada.includes("a.chatovod.com")
	)
	{
		eliminar_mensaje(número,sala)
		accionado = true
	}
	if(!accionado&!entrada.includes("[img]"))
	{
		var borrar = true
		var puede_mostrar = false
		var con_espacios = entrada
		var transformado = entrada
		//transformado = transformado.replace(/ /gi,"")
		transformado = transformado.replace(/\/subefotos\.com\/ver\/\?/gi,"fotos.subefotos.com/")
		if(transformado.includes("google."))
		{
			transformado = transformado.replace(/imgurl=/gi," ")
			transformado = transformado.replace(/%3A/gi,":")
			transformado = transformado.replace(/%2F/gi,"/")
			transformado = transformado.replace(/&/gi," ")
			puede_mostrar = true
		}
		if(transformado.includes("gstatic."))
		{
			puede_mostrar = true
		}
		if(transformado.includes("ddn.i.ntere.st")&transformado.includes("image"))
		{
			puede_mostrar = true
		}
		var g = "[a-z0-9-._%?=:]+"
		var expresión	=	new RegExp(g+"\."+g+"(\/"+g+")+\.(jpe?g|gif|png)","gi")
		var expresión_2 =	new RegExp(g+"\."+g+"(\/"+g+")+","gi")
		if(
			transformado.includes("imgur.com")|transformado.includes("gyazo.com")
			&!transformado.includes("i.gyazo.com")
		){
			transformado = "i." + transformado + ".png"
		}
		if(transformado.includes("giphy.com")&!transformado.includes("giphy.gif"))
		{
			transformado = "media.giphy.com/media/" + transformado.match(/[0-9a-z]+/gi).slice(-1)[0] + "/giphy.gif"
		}
		if(transformado.includes("youtube.com"))
		{
			borrar = false
			puede_mostrar = true
			transformado = "i.ytimg.com/vi/"
				+ transformado.match(/v=[a-z0-9-_]+/gi)[0].split("=").slice(-1)[0]
				+ "/hqdefault.jpg"
		}
		if(transformado.includes("youtu.be"))
		{
			borrar = false
			puede_mostrar = true
			transformado = "i.ytimg.com/vi/"
				+ transformado.match(/[a-z0-9-_]+/gi).slice(-1)[0]
				+ "/hqdefault.jpg"
		}
		if(!puede_mostrar)
		{
			transformado = transformado.replace(/\?/gi," ")
		}
		var enlaces = transformado.match(puede_mostrar?expresión_2:expresión)
		var enlaces_2 = con_espacios.match(puede_mostrar?expresión_2:expresión)
		if(enlaces!=null | puede_mostrar)
		{
			if(borrar){eliminar_mensaje(número,sala)}
			var salida = ""
			con_espacios = con_espacios.replace(/https?:\/\//gi,"")
			for(var k in enlaces)
			{
				console.log(k,enlaces[k])
				var protocolo = "http"
				if(
					enlaces[k].includes("gstatic.")
					|enlaces[k].includes("amazon.com")
					|enlaces[k].includes("discordapp.com")
					|enlaces[k].includes("gyazo.com")
					|enlaces[k].includes("youtube.com")
					|enlaces[k].includes("youtu.be")
				)
				{
					protocolo = "https"
				}
				con_espacios = con_espacios.replace(enlaces[k],"")
				salida += "[img]"+protocolo+"://"+enlaces[k]+"[/img]"
				if(!borrar)
				{
					salida += " " + protocolo+"://"+enlaces_2[k]
				}
			}
			con_espacios = con_espacios.replace(/([a-z0-9-_]+\.)+[a-z0-9-_]+(\/[a-z0-9-_]+)+\/?/gi,"")
			con_espacios = con_espacios.replace(/(\/?[a-z0-9-_]+)*\?[a-z0-9-_]+=[a-z0-9-_]+/gi,"")
			salida+=" "+con_espacios
			salida+="%0AEnviado por: [color=%23"+color+"]"+usuario+"[/color]"
			enviar_mensaje(salida,1,hacia)
		}
	}
}
function banear_por_votos(entrada,hacia)
{
	if( entrada.match(/^ban$/gi)!=null & hacia!=undefined )
	{
		if(hacia.length==1)
		{
			console.log(entrada,hacia)
			var votado = hacia[0]
			if(votos[votado]==undefined){votos[votado]=0}
			++votos[votado]
			if(votos[votado]==5){banear_según_minutos(votado,60,"Votación de usuarios.")}
			enviar_mensaje(votado+" tiene "+votos[votado]+" votos",1)
		}
	}
}
function obtener_GMT(entrada)
{
	var cambio
	if(entrada!=undefined)
	{
		if(entrada.match(/(argentina)|(uruguay)/gi)!=null){cambio = -3}
		if(entrada.match(/(chile)|(paraguay)|(venezuela)/gi)!=null){cambio = -4}
		if(entrada.match(/(colombia)|(m[eé]xico)|(panam[aá])|(per[uú])|(ecuador)/gi)!=null){cambio = -5}
		if(entrada.match(/(guatemala)|(nicaragua)/gi)!=null){cambio = -6}
		if(entrada.match(/(espa[ñn]i?a)|(spain)/gi)!=null){cambio = 2}
	}
	return cambio
}
function pedir_la_hora(entrada,usuario,sala)
{
	var hecho = false
	if(!hecho&entrada.match(/(qu|k)h?[eé]h? h?ora e[hs]?/gi)!=null)
	{
		var mensaje = ""
		var fecha = new Date()
		var hora = fecha.getUTCHours()
		var minutos = dos_dígitos(fecha.getUTCMinutes())
		// Falta: Bolivia, Costa Rica, Cuba, Ecuador, El Salvador, Honduras
		var color = "12aa21"
		var sp = "%0a"
		console.log(111)
		var cambio = obtener_GMT(entrada)
		if(cambio!=undefined)
		{
			mensaje = "Las " + dos_dígitos((hora+24+cambio)%24) + ":" + minutos + "."
			enviar_mensaje(mensaje,sala,[usuario])
		}else{
			if(entrada.match(/ en /gi)!=null)
			{
				mensaje = responder_sin_saber()
				enviar_mensaje(mensaje,sala,[usuario])
			}
			else
			{
				operar_perfil(usuario)
			}
		}
	}
}
function procesar_mensajes(b)
{
	console.log(b)
	var entrada = b.m
	var número = b.ts
	var usuario = b.f
	var sala = b.r
	var hacia = b.to
	mostrar_imágenes(entrada,número,usuario,sala,hacia)
	banear_por_votos(entrada,hacia)
	pedir_la_hora(entrada,usuario,sala)
}
window.cargar = function()
{
	var existe_nick = window.nickMenu
	var nick = existe_nick!=undefined?window.nickMenu.textContent.slice(0,-1):""
	console.log(nick)
	if(nick.includes("Bot"))
	{
		window.cc.prototype.log = function (a, b, c) {
			var info = b.split(" ")
			var entrada = info[0]
			entrada = entrada=="enter"?1:entrada=="leave"?0:-1
			var nombre = info.slice(1).join(" ")
			if(entrada>=0)
			{
				if(entrada)
				{
					var función = (datos)=>analizar_moderación(datos,nombre,baneo_automático)
					moderar_usuario(nombre,función)
				}
			}
		}
		window.yq = function(a, b) {
			procesar_mensajes(b)
			var c,d
			void 0!==b.r?(c="room",d=b.r):(
				c="private"
				,d=b.f&&a.j.nick&&a.j.nick.toLowerCase()==b.f.toLowerCase()?b.p:b.f?b.f:b.p
			)
			var e=a.I[c+("room"==c?d:d.toLowerCase())]
			window.xq(a,e,c,d,b)
		}
		//Array.map(document.querySelectorAll("link[rel='stylesheet']"),x=>x.remove())
		var texto = document.querySelector("textarea")
		texto.disabled=true
		texto.value = "<b>No escribir.<b>"
		setTimeout(decir_la_hora,aleatorio_hora())
		console.log("Cargado")
	}
	try{if(
		!location.pathname.includes("id")
		&!location.pathname.includes("users")
        &!location.pathname.includes("login")
	)
	{
		document.querySelectorAll("link")[3].remove()
	}}catch(e){}
}
setTimeout(window.cargar,7000)
