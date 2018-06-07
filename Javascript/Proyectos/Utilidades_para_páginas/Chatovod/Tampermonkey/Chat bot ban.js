// ==UserScript==
// @name		 Chatovod
// @version	  0.6
// @description  Mejoras para el Chatovod.
// @author	   ArtEze
// @match		*://*.chatovod.com/*
// @grant		none
// ==/UserScript==

'use strict';

// ban bot

function descargar(dirección,función)
{
	var descarga = new XMLHttpRequest()
	if(función!=undefined)
	{
		descarga.onreadystatechange = function()
		{
			if (descarga.readyState == 4 && descarga.status == 200)
			{
				función(descarga.responseText)
			}
		}
	}
	descarga.open('GET',dirección)
	descarga.send()
}
function obtener_CSRF()
{
	return location.host=="admin.chatovod.com"
		?document.querySelector(".navbar-right>li>ul>li:nth-child(2)>a").href.slice(-6)
		:document.body.querySelector('script').textContent.match(/\x22[A-Za-z0-9]{6}\x22/g)[0].slice(1,-1)
}
function banear(nombre,identidad)
{
	var devuelve = false
	if(nombre.match(/arteze/gi)!=null&identidad!=1543185)
	{
		banear_segun_minutos(nombre,44640,"Copiar nick")
		devuelve = true
	}
	if(
		identidad==undefined
		&nombre.match(/^[a-z]+19[78]\d$/gi)!=null
	)
	{
		/*
			"\nSex in your city! http://annahayes38784.tumblr.com"
		*/
		banear_segun_minutos(nombre,44640,"Chau")
		devuelve = true
	}
	return devuelve
}
function analizar_moderación(datos,nombre)
{
	var objeto = JSON.parse(datos)
	var identidad = objeto.accountId
	banear(nombre,identidad)
}
function moderar_usuario(nombre)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var dirección = chat + "getChatNickLocalModInfo?nick=" + nombre
	descargar(dirección,(datos)=>analizar_moderación(datos,nombre))
}
function banear_segun_minutos(nombre,minutos,causa)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = minutos>=0?"ban":"signOut"
	var fin = ""
	if(minutos>=0){fin+="&roomId=1&nick=" + nombre}
	if(minutos>0){fin+="&minutes=" + minutos + '&comment=' + causa}
	var dirección = chat + modo + "?csrf="+ obtener_CSRF() + fin
	descargar(dirección)
}
function eliminar_mensaje(número,sala)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = "deleteMessages"
	var fin = "&roomId="+sala+"&messages=" + número
	var dirección = chat + modo + "?csrf="+ obtener_CSRF() + fin
	descargar(dirección)
}
function enviar_mensaje(mensaje,sala,usuarios)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = "send"
	var hacia = usuarios==undefined?"":usuarios
	var fin = "&to="+hacia+"&roomId="+sala+"&msg="+ mensaje
	var dirección = chat + modo + "?csrf="+ obtener_CSRF() + fin
	descargar(dirección)
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
	// Falta: Bolivia, Costa Rica, Cuba, Ecuador, El Salvador, Honduras
	var color = "12aa21"
	var sp = "%0a"
	var mensaje = "[color=%23"+color+"]Horas en el mundo: [/color]" + sp +
		dos_dígitos((hora+24-3)%24) + ":" + minutos + " Argentina y Uruguay." + sp +"[color=%23"+color+"]" +
		dos_dígitos((hora+24-4)%24) + ":" + minutos + " Chile, Paraguay y Venezuela." + sp + "[/color]" +
		dos_dígitos((hora+24-5)%24) + ":" + minutos + " Colombia, México, Panamá y Perú." + sp + "[color=%23"+color+"]" +
		dos_dígitos((hora+24-6)%24) + ":" + minutos + " Guatemala y Nicaragua." + sp +"[/color]" +
		dos_dígitos((hora+24+2)%24) + ":" + minutos + " España."
	enviar_mensaje(mensaje,1)
	var tiempo = aleatorio_hora()
	console.log(tiempo)
	setTimeout(decir_la_hora,tiempo)
}
function procesar_mensajes(b)
{
	console.log(b)
	var entrada = b.m
	var número = b.ts
	var usuario = b.f
	var sala = b.r
	var hacia = b.to
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
		|entrada.includes("http")&usuario.match(/^[a-z]+19[78]\d$/gi)!=null
		|entrada.includes("chatovod.com")
			&!entrada.includes(location.host.split(".")[0])
			&!entrada.includes("coins.")
			&!entrada.includes("st1.")
	)
	{
		eliminar_mensaje(número,sala)
		accionado = true
	}
	if(!accionado&usuario!="Bot"&!entrada.includes("[img]"))
	{
		var puede_mostrar = false
		var con_espacios = entrada
		var transformado = entrada.replace(/ /gi,"").replace(/\/subefotos\.com\/ver\/\?/gi,"fotos.subefotos.com/")
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
		var expresión	=	new RegExp(g+"\."+g+"(\/"+g+")+\.(jpg|gif|png)","gi")
		var expresión_2 =	new RegExp(g+"\."+g+"(\/"+g+")+","gi")
		if(transformado.includes("imgur.com"))
		{
			transformado = "i." + transformado + ".png"
		}
		if(transformado.includes("giphy.com"))
		{
			transformado = "media.giphy.com/media/" + transformado.match(/[0-9a-z]+/gi).slice(-1)[0] + "/giphy.gif"
		}
		if(!puede_mostrar)
		{
			transformado = transformado.replace(/\?/gi," ")
		}
		var enlaces = transformado.match(puede_mostrar?expresión_2:expresión)
		if(enlaces!=null | puede_mostrar)
		{
			eliminar_mensaje(número,sala)
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
				)
				{
					protocolo = "https"
				}
				con_espacios = con_espacios.replace(enlaces[k],"")
				salida += "[img]"+protocolo+"://"+enlaces[k]+"[/img]"
			}
			con_espacios = con_espacios.replace(/([a-z0-9-]+\.)+[a-z0-9-]+(\/[a-z0-9-]+)+\/?/gi,"")
			salida+=" "+con_espacios
			salida+="%0AEnviado por: [color=%23"+color+"]"+usuario+"[/color]"
			console.log(salida)
			enviar_mensaje(salida,1,hacia)
		}
	}
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
					moderar_usuario(nombre)
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
    Array.map(document.querySelectorAll(".chatErrorMessage"),x=>x.remove())
}
setTimeout(window.cargar,7000)
