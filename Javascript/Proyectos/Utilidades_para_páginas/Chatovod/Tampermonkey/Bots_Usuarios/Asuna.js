// ==UserScript==
// @name		 Bot Chatovod Asuna
// @version	  0.7
// @description  Mejoras para el Chatovod.
// @author	   ArtEze
// @match		*://*.chatovod.com/*
// @grant		none
// ==/UserScript==

window.máximo = 0
window.idos = {}
window.entrados = {}

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
window.eliminar_mensaje = function(número,sala)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = "deleteMessages"
	var fin = "&roomId="+sala+"&messages=" + número
	var dirección = chat + modo + "?csrf="+ window.obtener_CSRF() + fin
	window.descargar(dirección)
}
window.coinciden_palabras_or = function(entrada,palabras)
{
	var exp = new RegExp("\\b"+palabras.join("|")+"\\b","gi")
	return exp.test(entrada)
}
window.coinciden_palabras_and = function(entrada,palabras)
{
	var coincide = false
	for(var i in palabras)
	{
		coincide = true
		for(var j in palabras[i])
		{
			var exp = new RegExp("\\b"+palabras[i][j]+"\\b","gi")
			if(!exp.test(entrada)){coincide = false;break}
		}
		if(coincide){break}
	}
	return coincide
}
window.eliminar_palabras = function(entrada,número,sala)
{
	var palabras_or = ["martillo","fake"]
	var palabras_and = [
		["one","two"]
		,["four","five"]
	]
	if(
		window.coinciden_palabras_or(entrada,palabras_or)
		|window.coinciden_palabras_and(entrada,palabras_and)
	){
		window.eliminar_mensaje(número,sala)
	}
}
window.obtener_CSRF = function()
{
	return location.host=="admin.chatovod.com"
		?document.querySelector(".navbar-right>li>ul>li:nth-child(2)>a").href.slice(-6)
		:document.body.querySelector("script").textContent.match(/\x22[A-Za-z0-9]{6}\x22/g)[0].slice(1,-1)
}
window.caracteres_hacia_hexadecimal = function(texto)
{
	var caracteres = ["\\+",":","\n","#","&","\x20"]
	for(var i in caracteres)
	{
		var actual = caracteres[i]
		var exp = new RegExp(actual,"gi")
		var char_hacia_hex = x=>"%"+("0"+x.slice(-1).charCodeAt().toString(16).toUpperCase()).slice(-2)
		texto = texto.replace(exp,char_hacia_hex(actual))
	}
	return texto
}
window.enviar_mensaje = function(mensaje,sala,usuarios)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = "send"
	var hacia = usuarios==undefined?"":usuarios
	mensaje = window.caracteres_hacia_hexadecimal(mensaje)
	var fin = "&to="+hacia+"&roomId="+sala+"&msg="+ mensaje
	var dirección = chat + modo + "?csrf="+ window.obtener_CSRF() + fin
	window.descargar(dirección)
}
window.procesar_mensajes = function(b)
{
	var entrada = b.m
	var número = b.ts
	var usuario = b.f
	var sala = b.r
	var hacia = b.to
	console.log(usuario,hacia,número,sala)
	console.log(entrada)
	if(!/bot/gi.test(usuario))
	{
		if(número>window.máximo)
		{
			window.eliminar_palabras(entrada,número,sala)
			window.máximo = número
		}
	}
}
window.cargar = function()
{
	var existe_nick = window.nickMenu
	var nick = existe_nick!=undefined?window.nickMenu.textContent.slice(0,-1):""
	//if(/bot/gi.test(nick))
	{
		window.cc.prototype.log = function (a, b, c) {
			var info = b.split(" ")
			var entrada = info[0]
			entrada = entrada=="enter"?1:entrada=="leave"?0:-1
			var nombre = info.slice(1).join(" ")
			if(entrada>=0)
			{
				if(window.idos[nombre]==undefined){window.idos[nombre] = 0}
				if(entrada==0&window.idos[nombre]==0)
				{
					var mensaje = window.enviar_mensaje("¡Qué mal que te vayas " + nombre + "! ¡Te extrañaremos, vuelve pronto! :3",1,[])
					setTimeout(mensaje,Math.floor(Math.random()*1000*60*5))
					window.idos[nombre] = 1
				}
				if(entrada==1&window.entrados[nombre]==0)
				{
					var mensaje = window.enviar_mensaje("¡Bienvenido " + nombre + "! ¡Esto es Neko7w7!",1,[])
					setTimeout(mensaje,Math.floor(Math.random()*1000*60*5))
					window.entrados[nombre] = 1
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
		console.log("Cargado.")
	}
}
setTimeout(window.cargar,6000)
