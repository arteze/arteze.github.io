function obtenerNick()
{
	return JSON.parse(window.localStorage.nick)
}
function obtenerHabitaciones(devuelve)
{
	if(devuelve==undefined){devuelve={"":1}}else{devuelve[""]=1}
	var habitaciones=window.Sc[2].Ag.yc.resize[4].Ag.bh
	for(var i in habitaciones)
	{
		var nick=habitaciones[i].title
		var habitación=i
		if(habitación!=1)
		{
			devuelve[nick]=habitación
		}
	}
	return devuelve
}
function khPrototypeVj()
{
	kh.prototype.Vj = function()
	{
		var variable=JSON.parse(window.Sc[2].Ag.yc.resize[0].src.zh.localStorage.q)[9][2][0]
		try{muestraPeticiones}catch(e){muestraPeticiones=false}
		if(muestraPeticiones){console.log(variable)}
		csrfToken=this.Pb.yc.complete[0].Ag.e.csrfToken
		this.Ue && this.Pb.send(this.Fk + "?_\x3d" + this.Br++, "GET")
	}
}
function enviar(mensaje,haciaUsuarios,númeroPestaña)
{
	var objeto={
		"type":"POST",
		"url":"/chat/send",
		"timeout":70000,
		"data":{
			"csrf":csrfToken,
			"msg":mensaje,
			"roomId":númeroPestaña,
		}
		,"bq":true
	}
	if(haciaUsuarios!=undefined){objeto.data.to=haciaUsuarios}
	return sh(objeto)
}
function listaMensajes()
{
	var salida=[]
	var general=document.getElementsByClassName("chatMessagesTab")[0]
	if(general)
	{
		var lista=general.getElementsByClassName("hl")
		var longitud=lista.length
		for(var i=0;i<longitud;i++)
		{
			if(lista[i].className=="chatMessage ts hl")
			{
				salida[salida.length]=lista[i]
			}
		}
	}
	return salida
}
function últimoMensaje()
{
	var lista,longitud,devuelve
	lista=listaMensajes()
	longitud=lista.length
	devuelve=lista[longitud-1]
	return devuelve
}
function textoDeMensaje(mensaje)
{
	var devuelve=undefined
	if(mensaje)
	{
		devuelve=mensaje.getElementsByClassName("text")[0].textContent
	}
	return devuelve
}
function detectaNick(habitación)
{
	var actual
	var miNombre=obtenerNick()
	var devuelve=miNombre
	var listaNicks=habitación.getElementsByClassName("ts")
	var longitud=listaNicks.length
	for(var i=0;i<longitud;i++)
	{
		actual=listaNicks[i]
		esNick=actual.getElementsByClassName("nick")[0]
		esEmisor=actual.getElementsByClassName("from")[0]
		if(esEmisor)
		{
			
			nick=esEmisor.textContent
		}
		else
		{
			nick=esNick.attributes["data-nick"].value
		}
		if(nick!=miNombre){devuelve=nick;break}
	}
	return devuelve
}
function últimoMensajePrivado(lista)
{
	var actual,devuelve
	var nick=obtenerNick()
	var longitud=lista.length
	for(var i=longitud-1;i>=0;i--)
	{
		actual=lista[i]
		esEmisor=actual.getElementsByClassName("from")[0]
		if(esEmisor)
		{
			if(esEmisor.textContent!=nick)
			{
				devuelve=actual;break
			}
		}
	}
	return devuelve
}
function últimosMensajes()
{
	var dueño,actual,lista,longitud,tagMensaje,textoMensaje
	var últimos={}
	var listaHabitaciones=document.getElementsByClassName("chatMessagesContainer")
	var longitudHabitaciones=listaHabitaciones.length
	últimos[""]=textoDeMensaje(últimoMensaje())
	for(var i=1;i<longitudHabitaciones;i++)
	{
		actual=listaHabitaciones[i]
		dueño=detectaNick(actual)
		lista=actual.getElementsByClassName("ts")
		tagMensaje=últimoMensajePrivado(lista)
		textoMensaje=textoDeMensaje(tagMensaje)
		últimos[dueño]=textoMensaje
	}
	return últimos
}
function dueñoMensaje(mensaje)
{
	var devuelve,dueño
	if(mensaje)
	{
		dueño=mensaje.getElementsByClassName("from")
		if(dueño.length){devuelve=dueño[0].textContent}
	}
	return devuelve
}
function esMensajeGeneral(mensaje)
{
	return mensaje.getElementsByClassName("toarr").length==0
}
function mensajeHaciaUsuario(mensaje)
{
	var destinatario,longitud
	var devuelve=false
	var nick=obtenerNick()
	if(mensaje)
	{
		destinatario=mensaje.getElementsByClassName("to nick")
		longitud=destinatario.length
		for(var i=0;i<longitud;i++)
		{
			if(destinatario[i].textContent==nick){devuelve=true;break}
		}
	}
	return devuelve
}
function contenidoMensaje(mensaje)
{
	var devuelve,actual
	if(mensaje)
	{
		devuelve=mensaje.getElementsByClassName("text")[0].textContent
	}
	return devuelve
}
function reEnviarMensajeSiEsGeneral()
{
	var mensaje,dueño,hacia,texto,respondido,nombre,c2,c3,nick,habitación
	var general=últimosMensajes()
	var suma=0
	var habitaciones=obtenerHabitaciones()
	for(var p in general)
	{
		if(p=="")
		{
			mensaje=últimoMensaje()
			c2=mensajeHaciaUsuario(mensaje)
			texto=contenidoMensaje(mensaje)
			dueño=dueñoMensaje(mensaje)
			hacia=[dueño]
			respondido=mensajes.respondidos[dueño]
		}
		else
		{
			c2=true
			texto=general[p]
			dueño=p
			hacia=[]
			respondido=mensajes.privados[p]
		}
		habitación=habitaciones[p]
		c3=texto!=respondido
		if(c2&&c3)
		{
			if(csrfToken!="")
			{
				suma++
				var transformado=bot.transform(texto)
				var a=JSON.stringify(transformado)
				var b=JSON.stringify(hacia)
				var c=habitación
				enviarMensaje=Function("return enviar("+a+","+b+","+c+")")
				console.log([texto,transformado,hacia,tiempo])
				setTimeout(enviarMensaje,suma*tiempo)
				if(p=="")
				{
					mensajes.respondidos[dueño]=texto
				}
				else
				{
					mensajes.privados[p]=texto
				}
			}
		}
	}
}
function chatAutomático(borrar)
{
	var esDeixi
	khPrototypeVj()
	muestraPeticiones=false
	tiempo=1500
	mensajes={
		respondidos:{},
		privados:{}
	}
	dueños={}
	try{csrfToken}catch(e){csrfToken=""}
	try{DeixiBot;esDeixi=true}catch(e){esDeixi=false}
	try{clearInterval(intervalo)}catch(e){}
	botName=esDeixi?"Alizia":"Eliza"
	console.log("esDe: "+DeixiBot)
	bot=esDeixi?new DeixiBot(botData):new ElizaBot()
	if(borrar)
	{
		var áreaTexto=document.getElementsByClassName("chatSendControlsWrapper")[0]
		áreaTexto.style.backgroundColor='#000000'
		áreaTexto.innerHTML=""
	}
	intervalo=setInterval(reEnviarMensajeSiEsGeneral,tiempo)
}
function esperarBot(borrar)
{
	var activados=[false,false]
	try{DeixiBot;activados[0]=true}catch(e){}
	try{ElizaBot;activados[1]}catch(e){}
	if(activados[0]|activados[1])
	{
		console.clear()
		chatAutomático(borrar)		
	}
	else
	{
		setTimeout("esperarBot("+borrar+")",1000)
	}
}
esperarBot(false)
