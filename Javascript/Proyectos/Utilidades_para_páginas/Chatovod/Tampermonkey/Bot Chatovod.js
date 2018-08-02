// ==UserScript==
// @name		 Chatovod
// @version	  1.3.4
// @description  Mejoras para el Chatovod.
// @author	   ArtEze
// @match		*://*.chatovod.com/*
// @grant		none
// ==/UserScript==

"use strict";

window.votos = {}
window.flood = {}
window.mensajes = []
window.idos = []
window.entrados = []
window.baneados = []
window.sospechosos = []
var votos = window.votos
window.máximo = 0
window.sala = 1
window.puede_patear = 0

window.avatar_excluidos = [
	"Genciita*_*"
]
window.administradores = [
	{
		"nick": "ArtEze",
		"lastIp":"186.138.12.61",
		"lastIpGeo":"Munro, Argentina",
		"nickId":3512533,
		"accountId":1543185,
		"lastEnterToChat":1532636090000,
		"createdInChat":1501613100000,
		"created":1468207548000,
		"accountType":"go",
		"accountEmail":"passymas@gmail.com",
		"accountLogin":"105182824359731320212",
		"lastUserAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:62.0) Gecko/20100101 Firefox/62.0",
		"accountTypeTitle":"google.com",
		"t":"mi"
	},{
		"nick": "Seba45",
		"nickId":4010389,
		"accountId":2362137,
		"lastEnterToChat":1532316636000,
		"createdInChat":1489536528000,
		"created":1488946319000,
		"accountType":"go",
		"accountEmail":"sebalucero2003@gmail.com",
		"accountLogin":"116155722595649304213",
		"accountTypeTitle":"google.com",
		"t":"mi"
	}
]

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
				var hecho = false
				if(/error/gi.test(descargado)){console.log("error",{a:dirección,b:descargado});hecho = true}
				if(/{}/gi.test(descargado)&!hecho){console.log("correcto",{a:dirección});hecho = true}
				if(!hecho){console.log({a:descargado})}
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
window.banear_según_minutos = function(nombre,minutos,causa)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = minutos>=0?"ban":"signOut"
	var fin = ""
	if(minutos>=0){fin+="&roomId=1&nick=" + window.caracteres_hacia_hexadecimal(nombre)}
	if(minutos>0){fin+="&minutes=" + minutos}
	if(causa!=undefined)
	{
		causa = window.caracteres_hacia_hexadecimal(causa)
		fin += "&comment=" + causa
	}
	var dirección = chat + modo + "?csrf="+ window.obtener_CSRF() + fin
	window.descargar(dirección,x=>console.log(x))
}
window.analizar_moderación = function(datos,nombre,función)
{
	// Sin usar
	var objeto = JSON.parse(datos)
	console.log(objeto,nombre)
	var identidad = objeto.accountId
	función(nombre,identidad)
}
window.moderar_usuario = function(nombre,función)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var dirección = chat + "getChatNickLocalModInfo?nick=" + nombre
	window.descargar(dirección,función)
}
window.eliminar_mensaje = function(número,sala)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = "deleteMessages"
	var fin = "&roomId="+sala+"&messages=" + número
	var dirección = chat + modo + "?csrf="+ window.obtener_CSRF() + fin
	window.descargar(dirección)
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
window.entrar_nombre = function(nombre)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = "auth"
	var wid = 60154
	var fin = "&limit=66&wid="+wid+"&nick="+nombre
	var dirección = chat + modo + "?csrf="+ window.obtener_CSRF() + fin
}
window.obtener_país = function(datos,usuario,sala,hacia)
{
	var elemento = document.createElement("html")
	elemento.innerHTML = datos
	var fecha = new Date()
	var hora = fecha.getUTCHours()
	var minutos = window.dos_dígitos(fecha.getUTCMinutes())
	var placeLine = elemento.querySelector(".placeLine")
	var mensaje
	if(placeLine!=undefined)
	{
		var país = placeLine.textContent.replace(/[\s]/gi,"").split(",")[0]
		var cambio = obtener_GMT(país)
		if(cambio!=undefined)
		{
			mensaje = "Las " + window.dos_dígitos((hora+24+cambio)%24) + ":" + minutos + "."
		}else{
			mensaje = window.objeto_aleatorio(desconocimiento)
		}
	}else{
		mensaje = window.objeto_aleatorio(desconocimiento)
	}
	window.enviar_mensaje(mensaje,sala,[usuario])
}
window.obtener_info = function(entrada,usuario,sala,hacia)
{
	var enviar_información = function(datos){
		var nombre_info = datos.querySelector(".nick").textContent
		var mensaje = datos.querySelector(".aboutLine").textContent.split(/Acerca de mí:\n\s+/)[1].split(/\s{4,}/)[0]
		if(mensaje.length>200){
			mensaje = mensaje.slice(0,200)
			mensaje += " (...)"
		}
		window.enviar_mensaje(mensaje,sala,[usuario,nombre_info])
	}
	var accionar_desde_HTML = function(datos,función){
		var elemento = document.createElement("html")
		elemento.innerHTML = datos
		función(elemento)
	}
	var accionar_desde_identidad = function(identidad,función){
		if(identidad!=undefined)
		{
			var sitio = location.protocol +"//"+location.host
			var dirección = sitio + "/id"+identidad
			window.descargar(dirección,x=>función(x))
		}
	}
	var info = function(datos){
		var analizado = JSON.parse(datos)
		var identidad = analizado.nickId
		accionar_desde_identidad(identidad,x=>accionar_desde_HTML(x,enviar_información))
	}
	var lista_nombres = window.administradores.map(x=>x.nick)
	if(entrada.match(/^\s*info\s*$/gi)!=null)
	{
		for(var i in hacia)
		{
			var actual = hacia[i]
			if(!lista_nombres.includes(actual))
			{
				window.moderar_usuario(actual,info)
			}else{
				var posición = lista_nombres.indexOf(actual)
				info(JSON.stringify(window.administradores[posición]))
			}
		}
	}
}
window.patear_futuro = function(usuarios)
{
	var funciones = []
	var función = (actual)=>()=>{if(window.puede_patear){window.banear_según_minutos(actual,0)}}
	for(var i in usuarios)
	{
		var actual = usuarios[i]
		funciones[i] = función(actual)
		var intervalo = setTimeout(funciones[i],2*42*(i+1))
	}
}
window.patear_a_todos = function(entrada,número,usuario,sala,hacia)
{
	var usuarios = Array.map(document.querySelector(".chatUsers").querySelectorAll(".nick"),x=>x.textContent)
	if(hacia.includes("Bot"))
	{
		if(entrada.match(/^\s*big\s*bang\s*$/gi)!=null)
		{
			setTimeout(()=>enviar_mensaje("[size=30][b]Atención: Todos serán pateados. [/b][/size] >:) ",1,[]),10000)
			setTimeout(()=>window.patear_futuro(usuarios),20000)
			window.puede_patear = 1
			window.eliminar_mensaje(número,sala)
		}
		if(entrada.match(/^\s*detener\s*$/gi)!=null)
		{
			var suerte = window.aleatorio(3)!=0
			if(suerte)
			{
				enviar_mensaje("[size=20][b]El pateo ha sido detenido.[/b][/size]",1,[])
				window.puede_patear = 0
			}else{
				enviar_mensaje("[size=20][b]Es imposible detener el pateo.[/b][/size]",1,[])
			}
			window.eliminar_mensaje(número,sala)
		}
	}
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
		mensaje = window.objeto_aleatorio(desconocimiento)
		window.enviar_mensaje(mensaje,sala,[usuario])
	}
}
window.operar_perfil = function(usuario,sala,hacia)
{
	window.moderar_usuario(usuario,(datos)=>window.pedir_hora_usuario(datos,usuario,sala,hacia))
}
window.aleatorio_hora = function()
{
	return 60*1000*Math.floor(1+Math.random()*60*24) // 24 horas
}
window.dos_dígitos = function(número)
{
	return (número/100).toFixed(2).slice(2)
}
window.decir_la_hora = function()
{
	var fecha = new Date()
	var hora = fecha.getUTCHours()
	var minutos = window.dos_dígitos(fecha.getUTCMinutes())
	// Falta: Bolivia, Costa Rica, Cuba, El Salvador, Honduras
	var color = "981221"
	var sp = "\n"
    var co = "[color=%23"+color+"]"
    var ci = "[/color]"
	var v = ""
	var mensaje = "[color=%23"+color+"]Horas en el mundo: " + ci + sp +
		window.dos_dígitos((hora+24-3)%24) + ":" + minutos + " Argentina y Uruguay." + sp + co +
		window.dos_dígitos((hora+24-4)%24) + ":" + minutos + " Chile, Paraguay, República Dominicana y Venezuela." + ci + sp +
		window.dos_dígitos((hora+24-5)%24) + ":" + minutos + " Colombia, Ecuador, México, Panamá y Perú." + sp + co +
		window.dos_dígitos((hora+24-6)%24) + ":" + minutos + " Guatemala y Nicaragua." + ci + sp +
		window.dos_dígitos((hora+24+1)%24) + ":" + minutos + " España, Islas Canarias" + sp + co +
		window.dos_dígitos((hora+24+2)%24) + ":" + minutos + " España, Madrid... Andalucía" + ci + sp +
		window.dos_dígitos((hora+24+8)%24) + ":" + minutos + " Singapur." + v

	window.enviar_mensaje(mensaje,1)
	var tiempo = window.aleatorio_hora()
	setTimeout(window.decir_la_hora,tiempo)
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
	var palabras_or = ["martillo"]
	var palabras_and = ["martillo","martillo"]
	if(
		window.coinciden_palabras_or(entrada,palabras_or)
		|window.coinciden_palabras_and(entrada,palabras_and)
	){
		window.eliminar_mensaje(número,sala)
	}
}
window.martillo = function(entrada,número,sala)
{
	if(/\b[aeiou]*m[aeiou]+rt[aeiou]+(ll|y|sh).*[aeiou]+[ns]?\b/gi.test(entrada))
	{
		window.eliminar_mensaje(número,sala)
	}
}
window.banear_18 = function(entrada,usuario,número,sala)
{
	var palabras_or = ["sexy?","adult","fuck","video chat"]
	if(window.coinciden_palabras_or(entrada,palabras_or)&/https?:\/{2}/gi.test(entrada))
	{
		window.eliminar_mensaje(número,sala)
		window.banear_según_minutos(usuario,44640,"+18")
	}
	if(usuario.includes("enga"))
	{
		window.eliminar_mensaje(número,sala)
		window.banear_según_minutos(usuario,34,"-.-")
	}
}
window.banear_flood = function(entrada,usuario,número,sala)
{
	var mensaje_y_fecha = {}
	var array = [
		/^\d{9,10}$/gi.test(entrada)
		,/hola/gi.test(entrada)
	]
	// Uno para cada condición
	if(window.flood[usuario]==undefined)
	{
		window.flood[usuario]=[[],0,0]
	}
	for(var i in array)
	{
		if(array[i].test(entrada))
		{
			window.flood[usuario][0].push([número,sala,+new Date()])
			++window.flood[usuario][i+1]
			if(window.flood[usuario][i+1]>=2)
			{
				window.banear_según_minutos(usuario,7,"Flood")
				for(var j in window.flood[usuario][0])
				{
					var mensaje = window.flood[usuario][0][j]
					window.eliminar_mensaje(...mensaje)
				}
			}
		}
	}
}
window.banear_otro_chat = function(entrada,usuario,número,sala)
{
	if(entrada.includes("chatovod.com")&!entrada.includes(location.host.split(".")[0]))
	{
		var borrar = true
		var lista = ["a","st1","coins","help","account","admin"]
		for(var i in lista)
		{
			if(entrada.includes(lista[i]+".chatovod.com"))
			{
				borrar = false
				break
			}
		}
		if(borrar)
		{
			window.eliminar_mensaje(número,sala)
			window.banear_según_minutos(usuario,44640,"Pasar chat")
		}
	}
}
window.detectar_enlaces = function(entrada)
{
	entrada = entrada.replace(/https?:\/\//gi,"")
	entrada = entrada.replace(/%3A/gi,":")
	entrada = entrada.replace(/%2F/gi,"/")
	entrada = entrada.split(/\[img][^\x5B\x5d]+\[\/img]/gi).join("")
	var enlaces = entrada.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi)
	return enlaces
}
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
	entrada = entrada.replace(/\/([^/]+\.com\/)/gi," $1")
	var enlaces = detectar_enlaces(entrada)
	var salida = ""
	var puede_enviar = [false,false]
	var borrar = true
	function env(a){a[0]=true;a[1]=true}
	for(var i in enlaces)
	{
		var actual = enlaces[i]
		var res = actual
		res = res.replace(/#codigos$/gi,"")
		res = res.replace(/subefotos\.com\/ver\/\?/gi,"fotos.subefotos.com/")
		puede_enviar[0] = false
		if(/\.(png|jpg|gif)/gi.test(res))
		{
			env(puede_enviar)
			borrar = true
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
			actual = actual.replace(/^[a-z.]+/gi,"youtube.com/watch?v=")
		}
		if(
			res.includes(".png")
			|res.includes(".jpg")
			|res.includes(".jpeg")
			|res.includes(".gif")
		){
			borrar = true
			env(puede_enviar)
		}
		if(puede_enviar[0])
		{
			var protocolo = "http"
			var sitios = [
				["ytimg"]
				,["gstatic","imgur","gyazo","discordapp","pinimg","amazon"]
			]
			for(var j in sitios)
			{
				var actual_2 = sitios[j]
				for(var k in actual_2)
				{
					var actual_3 = actual_2[k]
					if(res.includes(actual_3))
					{
						protocolo = "https"
						borrar = true
						break
					}
				}
			}
			var bool = false
			if(res.includes("gyazo.")
				&!res.includes(".jpg")
				&!res.includes(".gif")
				&!res.includes(".png")
			){
				salida += "[img]"+protocolo+"://"+res+".jpg[/img]"
				salida += "[img]"+protocolo+"://"+res+".gif[/img]"
				salida += "[img]"+protocolo+"://"+res+".png[/img]"
				bool = true
			}
			if(!bool&actual.match(/youtu\.be|youtube\./gi)!=null)
			{
				salida += "[img]"+protocolo+"://"+res+"[/img]\n" + protocolo+"://" + actual + ""
				bool = true
			}
			if(!bool)
			{
				salida += "[img]"+protocolo+"://"+res+"[/img]"
			}
			salida+="\nEnviado por: [b][color=#"+color+"]"+usuario+"[/color][/b]"
		}else
		{
			salida+=res
		}
	}
	if(puede_enviar[1])
	{
		if(borrar){window.eliminar_mensaje(número,sala)}
		window.enviar_mensaje(salida,1,hacia)
	}
}
window.banear_por_votos = function(entrada,hacia)
{
	if(entrada.match(/(^\s*ban\s*$)|(^\[b]ban\[\/b]$)/gi)!=null & hacia!=undefined )
	{
		var cantidad_votos = []
		for(var i in hacia)
		{
			var votado = hacia[i]
			if(votos[votado]==undefined){votos[votado]=0}
			++votos[votado]
			var votar_muestra = votos[votado]%5
			if(votar_muestra==0){votar_muestra=5}
			var necesarios = 5
			if(cantidad_votos[votar_muestra]==undefined)
			{
				cantidad_votos[votar_muestra] = [votar_muestra]
			}
			cantidad_votos[votar_muestra].push(votado)
			
			var mortales = true
			/*
			mortales = !votado.includes("^")&!votado.includes("h")
			if(votado.includes("σ")){necesarios = 15}
			if(votado.includes("é")){necesarios = 14}
			if(votado.includes("!")){necesarios = 13}
			if(votado.includes("asd")){necesarios = 10}
			if(votado.includes("ℓ")){necesarios = 8}
			*/
			console.log("Mortales: ",mortales,votado,votos[votado],necesarios)
			if(votos[votado]>=necesarios&mortales)
			{
				setTimeout(()=>window.banear_según_minutos(votado,17,"Votación de usuarios"),2*42*i)
				votos[votado]=0
				//accountId
				/*
				if(!mortales){console.log("Error 3")}
				*/
			}
		}
		var mensaje = "Votos: "
		cantidad_votos.sort((a,b)=>a[0]<b[0]?1:a[0]>b[0]?-1:0)
		cantidad_votos = cantidad_votos.filter(x=>x!=undefined)
		console.log(cantidad_votos)
		for(var i in cantidad_votos)
		{
			var actual = cantidad_votos[i]
			if(i!=0)
			{
				if(i!=cantidad_votos.length-1){mensaje+="[color=#ed3210], [/color]"}
				if(i==cantidad_votos.length-1){mensaje+="[color=#ed3210] y [/color]"}
			}
			mensaje += "[color=#ed3210]" + actual[0] + ": {[/color] " 
			actual = actual.slice(1)
			for(var j in actual)
			{
				var actual_2 = actual[j]
				if(j!=0)
				{
					if(j!=actual.length-1){mensaje+="[color=#ed3210], [/color]"}
					if(j==actual.length-1){mensaje+="[color=#ed3210] y [/color]"}
				}
				mensaje += actual_2
			}
			mensaje += "[color=#ed3210] }[/color]"
		}
		console.log(mensaje)
		window.enviar_mensaje(mensaje,1)
	}
}
window.desbanear_desde_número = function(número,función)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = "unban"
	var fin = "&entries=" + número
	var dirección = chat + modo + "?csrf="+ window.obtener_CSRF() + fin
	window.descargar(dirección,función)
}
window.unban = function(función)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = "load"
	var fin = "/banlist"
	var dirección = chat + modo + fin
	window.descargar(dirección,función)
}
window.desbanear = function(entrada,número,usuario,sala,hacia)
{
	var función = function(datos,usuario,baneado,sala){
		var html = document.createElement("html")
		html.innerHTML = datos
		var lista_baneados = Array.from(html.querySelectorAll("label"))
		var ban_analizado = lista_baneados.map(x=>
			{
				var valores = JSON.parse(
					x.textContent.replace(/"/gi,"\\\"").replace(
						/ (.+) hasta (.+) \((.+) minutos\) por (.+), comentario: (.+)/gi
						,"[\"$1\",\"$2\",\"$3\",\"$4\",\"$5\"]"
					)
				)
				return {
					número:+x.querySelector("input").value.match(/\d+/gi),
					baneado: valores[0],
					hasta: new Date(valores[1].replace(/(.+)\/(.+)\/(.+) (.+)/gi,"$2/$1/$3 $4")),
					minutos: +valores[2].replace(".",""),
					baneador: valores[3],
					causa: valores[4]
				}
			}
		)
		var usuario_baneado = ban_analizado.filter(x=>x.baneado==baneado)[0]
		if(usuario_baneado!=undefined)
		{
			var función_2 = ()=>enviar_mensaje("Has sido desbaneado correctamente.",sala,[usuario,baneado])
			window.desbanear_desde_número(usuario_baneado["número"],función_2)
		}
	}
	if(entrada.match(/^\s*unban\s*$/gi)!=null)
	{
		for(var i in hacia)
		{
			var actual = hacia[i]
			if(actual.match(/bot/gi)==null)
			{
				window.unban(x=>función(x,usuario,actual,sala))
			}
		}
	}
}
window.aleatorio = function(entero)
{
	return Math.floor(Math.random()*entero)
}
window.agregar_imagen = function(datos,usuario,hacia,sala)
{
	var objeto = JSON.parse(datos)
	var identidad = objeto.nickId
	var hospedaje = "a.chatovod.com"
	var sitio = location.protocol +"//"+ hospedaje
	if(identidad!=undefined)
	{
		window.enviar_mensaje("[img]"+sitio+"/n/"+identidad+"/d?"+window.aleatorio(1000)+"[/img]",sala,[usuario,hacia])
	}
}
window.mostrar_avatares = function(entrada,usuario,hacia,sala)
{
	var lista_nombres = window.administradores.map(x=>x.nick)
	var función_1 = (hacia,i)=>setTimeout(()=>moderar_usuario(hacia[i],x=>window.agregar_imagen(x,usuario,hacia[i],sala)),42*2*i)
	var función_2 = (x,y,i)=>(x,y,i)=>setTimeout(()=>window.agregar_imagen(x,usuario,y,sala),42*2*i)
	if( entrada.match(/^avatar\s?[0-9]*$/gi)!=null & hacia!=undefined )
	{
		var salida = ""	
		for(var i in hacia)
		{
			var actual = hacia[i]
			if(!window.avatar_excluidos.includes(actual))
			{
				if(!lista_nombres.includes(actual))
				{
					window.moderar_usuario(actual,función_1(hacia,i))
				}else{
					var posición = lista_nombres.indexOf(actual)
					var x = JSON.stringify(window.administradores[posición])
					función_2(x,actual,i)(x,actual,i)
				}
			}
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
window.formatear_número = function(número)
{
	var devuelve
	var array = []
	var entero = Math.floor(número)+""
	var coma = (""+número%1).slice(2)
	if(!/e\+/gi.test(entero))
	{
		while(entero.length>=3)
		{
			array.unshift(entero.slice(-3))
			entero = entero.slice(0,-3)
		}
		if(entero!=""){array.unshift(entero)}
		devuelve = array.join(".")+(coma==0?"":","+coma)
	}
	else
	{
		devuelve = ""+número
	}
	return devuelve
}
window.evaluar_javascript = function(entrada,usuario,sala,hacia)
{
	var números_en_letras = "cero un ún dos dós tre cua cinc sei séi siete och nueve quin setec novec die once doce trece cat veint ses set noni".split(" ")

	var conv = entrada
	var es_texto = conv.match(/^\s*"[^"]+"\s*$/gi)!=null
	if(es_texto)
	{
		if(sala!=1){
			window.enviar_mensaje(conv.replace(/^\s*"([^"]+)"\s*$/gi,"$1"),1,hacia)
		}
		return;
	}
	else
	{
		hacia = [usuario]
	}

	var es_texto = false
	var permite = false
	if(!es_texto)
	{
		conv = conv.replace(/\(?\?/gi,"")
		conv = conv.replace(/\¿/gi,"")
		conv = conv.replace(/^\s*y*\s*?/gi,"")
		if(conv.match(/:[a-z0-9()]+:/gi)==null)
		{
			conv = conv.replace(/:'3/gi,"")
			conv = conv.replace(/>:v/gi,"")
			conv = conv.replace(/:\S{1,2}/gi,"")
			conv = conv.replace(/\S{1,2}:/gi,"")
		}
		conv = conv.replace(/\)([-+0-9]+)/gi,")*$1*")
		conv = conv.replace(/([-+0-9]+)\(/gi,"$1*(")
		conv = conv.replace(/[%÷]/gi,"/")
		conv = conv.replace(/dd/gi,"")
		conv = conv.replace(/xd+/gi,"")
		conv = conv.replace(/x+/gi,"x")
		conv = conv.replace(/\s*=\s*$/gi,"")
		conv = conv.replace(/\.\.+/gi,"")
		var quitar_puntos = window.quitar_puntos_números(conv)
		conv = quitar_puntos[0]
		conv = conv.replace(/,/gi,"☺")
		conv = conv.replace(/\./gi,",")
		conv = conv.replace(/\☺/gi,".")
		conv = conv.replace(/\bal\s+cuadrado\b/gi,"^2")
		conv = conv.replace(/\bal\s+cubo\b/gi,"^3")
		conv = conv.replace(/(\d+)\s*((\^)|(a la)|(al))\s*(\d+)/gi,"Math.pow($1,$6)")

		// Palabras
		conv = conv.replace(/^\s*b[aeiouáéíóú]t\b/gi,"")

		conv = conv.replace(/\bwe\b/gi,"")

		conv = conv.replace(/\bmenos\b/gi," - ")
		conv = conv.replace(/\bm[aá]s\b/gi," + ")
		conv = conv.replace(/\bpor\b/gi," * ")
		conv = conv.replace(/\bcu[aá]ntos?\s+es\b/gi,"")
		conv = conv.replace(/\bcu[aá]l\s+es\b/gi,"")
		conv = conv.replace(/\be[sz]\b/gi,"")
		conv = conv.replace(/\b(el)|(la)\b/gi,"")
		conv = conv.replace(/\bentre|dividido(\s+a)?\b/gi,"/")
		if(!conv.includes("=>"))
		{
			conv = conv.replace(/[×x]/gi," * ")
		}
		if(conv.match(/(ra[ií]z)|(log)/gi)!=null)
		{
			conv = conv.replace(/log(()|(2)|(1p)|(10)) (\d+)/gi,"Math.log$1($6)")
			conv = conv.replace(/log(\d+)\s+(\d+)/gi,"Math.log($2)*Math.log(Math.E)/Math.log($1)")
			conv = conv.replace(/\bra[ií]z\s+c[uú]bica\s+(de\s+)?(\d+)/gi,"+Math.pow($2,1/3).toFixed(14)")
			conv = conv.replace(/\bra[ií]z(\s+cuadrada)?\s+del?\s+(\d+([.,]\d+)?)\b/gi,"Math.sqrt($2)")
			quitar_puntos[1] = false
		}
		var está_convertido = false
		var convertido
		if(conv.match(/^\d+$/gi)!=null)
		{
			var conv_orig = conv
			conv = "\""+window.númeroHaciaLetras(conv.match(/\d+/gi).join(""))+"\""
			quitar_puntos[1] = false
			está_convertido = true
			if(conv_orig!=conv)
			{
				permite = true
			}
		}
		if(!está_convertido)
		{
			if(conv.match(/^[a-z\sáéíóú]+.?$/gi)!=null)
			{
				var conv_orig = conv
				convertido = "\""+window.formatear_número(window.letrasHaciaNúmero(
					conv.match(/[a-z\s.áéíóú]+/gi).join(" ")
				).replace(/\./gi,""))+"\""
				if(convertido!="\"0\""|convertido=="\"0\""&conv.match(/cero/gi)!=null)
				{
					conv = convertido
					quitar_puntos[1] = false
					está_convertido = true
					if(conv_orig!=conv)
					{
						permite = true
					}
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
				& !(resultado+"").includes("NaN")
				& entrada.match(/^\s*oh\s*$/)==null
			){
				if( typeof resultado == "string" & sala!=1 & !permite )
				{
					permite = true
					sala = 1
				}
				if(quitar_puntos[1]|isFinite(resultado))
				{
					resultado = +(+resultado).toFixed(14)
					resultado = window.formatear_número(""+resultado)
					permite = true
				}
				if(resultado.includes("undefined"))
				{
					window.enviar_mensaje(window.objeto_aleatorio(error_de_cálculo),sala,hacia)
				}else
				{
					if(permite)
					{
						window.enviar_mensaje(resultado,sala,hacia)
					}
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
		// España
		if(entrada.match(/espa[ñn]i?a|spain/gi)!=null){cambio = 2}
		if(entrada.match(/las palmas/gi)!=null){cambio = 1}
		//Otros
		if(entrada.match(/singapur/gi)!=null){cambio = 8}
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
		mensaje = "La hora en la que " + window.objeto_aleatorio(sexo) + " a tu " + window.objeto_aleatorio(madre)+"."
		window.enviar_mensaje(mensaje,sala,[usuario])
	}else{
		if(!hecho&entrada.match(/(([qk]u?)|k)h?[eé]?h? h?ora e[hs]?/gi)!=null)
		{
			mensaje = ""
			var fecha = new Date()
			var hora = fecha.getUTCHours()
			var minutos = dos_dígitos(fecha.getUTCMinutes())
			// Falta: Bolivia, Costa Rica, Cuba, Ecuador, El Salvador, Honduras
			var color = "12aa21"
			var sp = "\n"
			var cambio = obtener_GMT(entrada)
			if(cambio!=undefined)
			{
				mensaje = "Las " + dos_dígitos((hora+24+cambio)%24) + ":" + minutos + "."
				window.enviar_mensaje(mensaje,sala,[usuario])
			}else{
				if(
					entrada.match(/ en /gi)!=null
					&entrada.match(/mi pa[íi]s/gi)==null
				){
					mensaje = window.objeto_aleatorio(desconocimiento)
					window.enviar_mensaje(mensaje,sala,[usuario])
				}
				else
				{
					window.operar_perfil(usuario,sala,hacia)
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
		window.enviar_mensaje(entrada,sala,[usuario])
	}
}
window.color_arcoiris = function(entrada,número,usuario,sala,hacia)
{
	if(entrada.match(/^\s*color[\s:]+/gi)!=null)
	{
		var transformado = entrada.replace(/^\s*color\s+/gi,"")
		transformado = transformado.replace(/\[\/?b\]/gi,"")
		transformado = usuario+": "+transformado
		var entrada_color = window.gradual(0,10,transformado,13,0,1)
		transformado = "[b]"+entrada_color+"[/b]"
		window.enviar_mensaje(transformado,sala,hacia)
		window.eliminar_mensaje(número,sala)
	}
}
window.definir = function(entrada,usuario,sala)
{
	if(entrada.match(/^\s*definir[\s:]+/gi)!=null)
	{
		entrada = entrada.replace(/^\s*definir\s+/gi,"")
		var partes = entrada.split(/\s+es\s+/gi)
		var palabra = partes[0]
		var definición = partes[1]
		var base_de_datos = localStorage.bot
		window.enviar_mensaje("Definida la palabra "+palabra,sala,[])
		window.enviar_mensaje(entrada,sala,[])
	}
	var definir = entrada.split(/\s*es\s*/gi)
}
window.descargar_nick = function(datos,función)
{
	var nombre = JSON.parse(datos)[0].lastNick
	if(nombre!=undefined)
	{
		var es_bot = nombre.match(/bot/gi)!=null
		console.log("Es bot: ",es_bot)
		if(es_bot){función()}
	}
}
window.soy_bot = function(función)
{
	if(document.title=="Neko7w7")
	{
		window.descargar(location.origin+"/chat/start",x=>window.descargar_nick(x,función))
    }
}
window.ban_ip = function(datos,nombre)
{
	var ips = [
		["23.27.45","San José",100]
		,["190.183.212","BUDIN CON CHISPAS",44640]
	]
	var lugares = [
		["Fremont","San José",100]
		,["French",".",500]
		,["United",".",500]
		,["Republic of",".",500]
		,["Romania",".",500]
		,["Canada",".",500]
		,["Switzerland",".",500]
		,["Slovakia",".",500]
		,["Ukraine",".",500]
	]
	var navegadores = [
		[
		/*
			"Mozilla/5.0 (iPhone; CPU iPhone OS 11_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1"
			,".."
			,1000
		*/
		]
	]
	var analizado = JSON.parse(datos)
	var ip_usuario = analizado.lastIp
	var ip_geo_usuario = analizado.lastIpGeo
	var navegador = analizado.lastUserAgent
	var no_tiene_cuenta = analizado.accountId==undefined
	var no_error = analizado.t!="error"
	if(no_tiene_cuenta&no_error)
	{
		var causa = "."
		var minutos = 3
		if(!window.baneados.includes(nombre))
		{
			if(ip_usuario!=undefined)
			{
				var actual
				for(var i in ips)
				{
					actual = ips[i]
					if(ip_usuario.includes(actual[0]))
					{
						causa = actual[1]
						minutos = actual[2]
						banear_según_minutos(nombre,minutos,causa)
						console.log(12,actual[0],nombre,minutos,causa)
						window.baneados.push(nombre)
					}
				}
			}
			if(ip_geo_usuario!=undefined)
			{
				for(var i in lugares)
				{
					actual = lugares[i]
					if(ip_geo_usuario.includes(actual[0]))
					{
						causa = actual[1]
						minutos = actual[2]
						banear_según_minutos(nombre,minutos,causa)
						console.log(13,actual[0],nombre,minutos,causa)
						window.baneados.push(nombre)
					}
				}
			}
			if(navegador!=undefined)
			{
				for(var i in navegadores)
				{
					actual = navegadores[i]
					if(navegador.includes(actual[0]))
					{
						causa = actual[1]
						minutos = actual[2]
						banear_según_minutos(nombre,minutos,causa)
						console.log(13,actual[0],nombre,minutos,causa)
						window.baneados.push(nombre)
					}
				}
			}
		}
		if(!window.sospechosos.includes(nombre))
		{
			if(ip_geo_usuario==undefined)
			{
				window.enviar_mensaje("Posible camuflado.",1,[nombre])
				window.sospechosos.push(nombre)
			}
		}
	}
}
window.banear_ip = function(nombre)
{
	moderar_usuario(nombre,x=>window.ban_ip(x,nombre))
}
window.saludar = function(datos,nombre)
{
	var analizado = JSON.parse(datos)
	var tipo = analizado.accountType
	tipo = tipo=="ch"?"o":tipo=="go"?"a":"o"
	var mensaje = "¡Bienvenid"+ tipo +" " + nombre + "! ¡Esto es Neko7w7!"
	window.entrados[nombre] = 1
	localStorage.setItem("entrados",JSON.stringify("entrados"))
	setTimeout(()=>window.enviar_mensaje(mensaje,1,[]),Math.floor(Math.random()*1000*60*5))
}
window.procesar_mensajes = function(b)
{
	var entrada = b.m
	var número = b.ts
	var usuario = b.f
	var sala = b.r
	var hacia = b.to
	var mensaje = [entrada,número,usuario,sala,hacia]
	// console.log({número:número,usuario:usuario,sala:sala,hacia:hacia})
	// console.log({entrada:entrada})
	window.mensajes.push(mensaje)
	window.min = número
	if(usuario.match(/bot/gi)==null)
	{
		if(número>window.máximo)
		{
			window.máximo = número
			window.banear_18(entrada,usuario,número,sala)
			window.banear_otro_chat(entrada,usuario,número,sala)
			window.eliminar_palabras(entrada,número,sala)
			window.martillo(entrada,número,sala)
			window.mostrar_imágenes(entrada,número,usuario,sala,hacia)
			window.banear_por_votos(entrada,hacia)
			window.pedir_la_hora(entrada,usuario,sala,hacia)
			window.mostrar_avatares(entrada,usuario,hacia,sala)
			window.evaluar_javascript(entrada,usuario,sala,hacia)
			window.fonetizar_mensaje(entrada,usuario,sala,hacia)
			window.color_arcoiris(entrada,número,usuario,sala,hacia)
			window.definir(entrada,usuario,sala)
			window.obtener_info(entrada,usuario,sala,hacia)
			window.patear_a_todos(entrada,número,usuario,sala,hacia)
			window.desbanear(entrada,número,usuario,sala,hacia)
		}
	}
}
window.entrar_y_salir = function (a, b, c) {
	var info = b.split(" ")
	var entrada = info[0]
	entrada = entrada=="enter"?1:entrada=="leave"?0:-1
	var nombre = info.slice(1).join(" ")
	var mensaje;
	if(entrada>=0)
	{
		var fecha = new Date()
		var tiempo = fecha.getHours()
			+":"+((fecha.getMinutes()+100)+"").slice(1)
			+":"+((fecha.getSeconds()+100)+"").slice(1)
		if(window.entrados[nombre]==undefined){window.entrados[nombre] = 0}
		if(window.idos[nombre]==undefined){window.idos[nombre] = 0}
		if(entrada==1)
		{
			console.log("Entra: ",nombre,tiempo)
			window.banear_ip(nombre)
			if(window.entrados[nombre]==0){
				/*
				moderar_usuario(nombre,x=>window.saludar(x,nombre))
				*/
			}
		}else{
			console.log("Salir: ",nombre,tiempo)
			if(window.idos[nombre]==0)
			{
				mensaje = "¡Qué mal que te vayas " + nombre + "! ¡Te extrañaremos, vuelve pronto! :3"
				window.idos[nombre] = 1
				/*
				setTimeout(()=>window.enviar_mensaje(mensaje,1,[]),Math.floor(Math.random()*1000*60*5))
				*/
			}
		}
	}
}
window.chatovod_mensajes = function(a, b) {
	window.procesar_mensajes(b)
	var c,d
	void 0!==b.r?(c="room",d=b.r):(
		c="private"
		,d=b.f&&a.j.nick&&a.j.nick.toLowerCase()==b.f.toLowerCase()?b.p:b.f?b.f:b.p
	)
	var e=a.I[c+("room"==c?d:d.toLowerCase())]
	window.xq(a,e,c,d,b)
}
window.activar_bot = function()
{
	window.cc.prototype.log = (a,b,c)=>window.entrar_y_salir(a,b,c)
	window.yq = (a,b)=>window.chatovod_mensajes(a,b)
	setTimeout(window.decir_la_hora,window.aleatorio_hora())
	console.log("Cargado 2.")
}
window.soy_bot(window.activar_bot)
