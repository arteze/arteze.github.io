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
window.otecald.guardar_local_storage = function(objeto)
{
	localStorage.setItem("sorteos",JSON.stringify(objeto))
}
window.otecald.local_storage_eliminar_último_sorteo = function()
{
	var asignar = JSON.parse(localStorage.getItem("sorteos")).slice(0,-1)
	localStorage.setItem("sorteos",JSON.stringify(asignar))
	return asignar
}
window.otecald.obtener_AAMMDD = function(fecha)
{
	if(fecha==undefined)
	{
		fecha = new Date()
	}
	var AAMMDD = fecha.getDate()+100*(fecha.getMonth()+1)+(fecha.getYear()-100)*10000
	return AAMMDD
}
window.procesar_día = function(respuesta,dirección)
{
	++window.c
	if(respuesta==undefined)
	{
		respuesta = document.children[0].innerHTML
		dirección = window.otecald.obtener_AAMMDD()+""
	}
	if(window.todo_3==undefined)
	{
		window.todo_3=[]
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
	window.todo_3.unshift(día)
}
function descargar_todo()
{
	window.fecha = new Date()
	window.b = 1
	window.c = 0
	while(true)
	{
		//if(window.fecha.getYear()+1900<2018){break}
		if(window.fecha.getMonth()+1<12){break}
		var no_es_domingo = window.fecha.getDay(window.fecha)!=0
		if(no_es_domingo)
		{
			var AAMMDD = window.otecald.obtener_AAMMDD(window.fecha)
			var sitio = "http://www.vivitusuerte.com/datospizarra_loteria.php?fecha="+AAMMDD+"&loteria=25"
			if(!window.todo.map(x=>x.fecha).includes(AAMMDD+""))
			{
				setTimeout("descargar('"+sitio+"',procesar_día)",1000*5*window.b)
				++window.b
			}
		}
		window.fecha = new Date(+window.fecha-1000*60*60*24)
	}
	setTimeout(()=>{
		window.todo=window.todo.concat(window.todo_3)
		var hora = new Date().getHours()+new Date().getMinutes()/60
		if(!(hora>=9&hora<=21.5))
		{
			window.otecald.guardar_local_storage(window.todo)
		}
    },1000*5*(window.b+3))
}
if(window.todo==undefined)
{
	window.feriados = []
	window.todo = obtener_local_storage()
	window.todo_3 = []
}
window.otecald.guardar_local_storage(window.todo)
descargar_todo()
