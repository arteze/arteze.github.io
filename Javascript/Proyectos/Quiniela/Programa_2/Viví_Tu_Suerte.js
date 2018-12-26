window.descargar=function(dirección,función)
{
	var descarga = new XMLHttpRequest()
	var hecho = false
	descarga.onreadystatechange = function(){
		var descargado = descarga.responseText
		if( descarga.readyState==4 && descarga.status==200 )
		{
			función(descarga.responseText,dirección)
		}
	}
	descarga.open("GET",dirección)
	descarga.send()
}
function obtener_local_storage()
{
	var devuelve
	var sorteos = localStorage.getItem("sorteos")
	if(sorteos!=undefined)
	{
		devuelve = JSON.parse(sorteos)
	}else
	{
		var todo_local = []
		sorteos = localStorage.setItem("sorteos",JSON.stringify(todo_local))
		devuelve = todo_local
	}
	return devuelve
}
function guardar_local_storage()
{
	var todo_2 = window.todo
	var local = localStorage.getItem("sorteos")
	if(local!=undefined)
	{
		todo_2 = JSON.parse(local)
		for(var i in window.todo)
		{
            var fecha_actual = window.todo[i].fecha
			if(!todo_2.map(x=>x.fecha).includes(fecha_actual))
			{
				todo_2.push(window.todo[i])
			}
		}
	}
	window.todo = todo_2
	localStorage.setItem("sorteos",JSON.stringify(todo_2))
}
window.procesar_día = function(respuesta,dirección)
{
	++window.c
	if(respuesta==undefined)
	{
		respuesta = document.children[0].innerHTML
		dirección = "000000"
	}
	if(window.todo==undefined)
	{
		window.todo=obtener_local_storage()
		window.feriados=[]
	}
	var html = document.createElement("html")
	html.innerHTML = respuesta
	var texto = html.textContent
	var día = {}
	var letras = texto.match(/(([A-Z])\n){4}/g)
	var fecha = dirección.match(/\d{6}/gi)
	var i;
	if(letras==undefined)
	{
		var feriado = fecha[0]
		window.feriados.unshift(feriado)
		console.log(feriado,window.feriados)
		return;
	}
	día.juegos = ["Pr","Ma","Ve","No"].map(x=>+texto.includes(x))
	día.turnos = []
	for(i in día.juegos)
	{
		if(día.juegos[i]==1)
		{
			día.turnos.push([])
		}
	}
	día.juegos = día.juegos.join("")
	día.fecha = fecha[0]
	día.letras = letras.map(x=>x.split("\n").join(""))
	i=0
	while(true)
	{
		var regex = new RegExp("\n"+(++i)+"\\.\n+[0-9\\-]+\n","g")
		var resultados = texto.match(regex)
		if(resultados==undefined){break}
		resultados=resultados.map(x=>x.split(/\n+/)[2])
		if(i==1){día.unidades=resultados.map(x=>x.slice(-1)).join("")}
		for(var j in resultados)
		{
			día.turnos[j].push(resultados[j])
		}
	}
	//console.log(día.fecha,día.juegos,día.unidades,día.letras.join(" "))
	console.log(window.c/window.b*100)
	for(i in día.turnos)
	{
		//console.log(día.turnos[i].join(" "))
	}
	window.todo.unshift(día)
}
function descargar_todo()
{
	window.fecha = new Date()
	window.b = 1
	window.c = 0
	while(true)
	{
		if(window.fecha.getYear()+1900<2018){break}
		var no_es_domingo = window.fecha.getDay(window.fecha)!=0
		if(no_es_domingo)
		{
			var AAMMDD = window.fecha.getDate()+100*(window.fecha.getMonth()+1)+(window.fecha.getYear()-100)*10000
			var sitio = "http://www.vivitusuerte.com/datospizarra_loteria.php?fecha="+AAMMDD+"&loteria=25"
			if(!window.todo.map(x=>x.fecha).includes(AAMMDD+""))
			{
				setTimeout("descargar('"+sitio+"',procesar_día)",1000*5*window.b)
				++window.b
			}
		}
		window.fecha = new Date(+window.fecha-1000*60*60*24)
	}
	setTimeout(guardar_local_storage,1000*5*(window.b+3))
}
if(window.todo==undefined)
{
	window.feriados = []
	window.todo = obtener_local_storage()
}
guardar_local_storage()
descargar_todo()

// Análisis
function analizar_dígitos(dígitos)
{
	return "\n"+[0,1,2,3,4,5,6,7,8,9].map(
		y=>y+": "+dígitos.split(y).map(x=>x.length).reverse().slice(0,20).join(" ")
	).join("\n")+"\n"
}
function guardar_todo()
{
	var salida = ""
	salida += "\n"
	for(var i in window.todo)
	{
		var día = window.todo[i]
		if(i!=0){salida += "\n"}
		salida += "   " + día.fecha
		salida += " " + día.juegos
		salida += " " + día.unidades
		salida += " " + día.letras.join(" ")
		salida += "\n"
		salida += día.turnos.map(x=>x.join(" ")).join("\n")
		salida += "\n"
	}
	salida += "\n"
	return salida
}
window.otecald.obtener_unidades = function()
{
	return window.todo.map(x=>x.unidades).join("")
}
