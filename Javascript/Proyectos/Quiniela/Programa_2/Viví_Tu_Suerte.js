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
function procesar_día(respuesta,dirección)
{
	if(respuesta==undefined)
	{
		respuesta = document.children[0].innerHTML
		dirección = "000000"
	}
	if(window.todo==undefined)
	{
		window.todo=[]
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
		feriados.unshift(feriado)
		console.log(feriado,feriados)
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
	console.log(día.fecha,día.juegos,día.unidades,día.letras.join(" "))
	for(i in día.turnos)
	{
		console.log(día.turnos[i].join(" "))
	}
	window.todo.unshift(día)
}
function descargar_todo()
{
	window.fecha = new Date()
	window.b = 1
	while(true)
	{
		if(fecha.getDate()<10){break}
		var no_es_domingo = fecha.getDay(fecha)!=0
		if(no_es_domingo)
		{
			var AAMMDD = fecha.getDate()+100*(fecha.getMonth()+1)+(fecha.getYear()-100)*10000
			var sitio = "http://www.vivitusuerte.com/datospizarra_loteria.php?fecha="+AAMMDD+"&loteria=25"
			setTimeout("descargar('"+sitio+"',procesar_día)",1000*5*b)
			++b
		}
		fecha = new Date(+fecha-1000*60*60*24)
	}
}
if(window.todo==undefined)
{
	window.feriados = []
	window.todo = []
}
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
function obtener_unidades()
{
	return window.todo.map(x=>x.unidades).join("")
}
