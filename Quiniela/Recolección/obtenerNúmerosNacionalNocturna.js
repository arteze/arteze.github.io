function obtenerFecha()
{
	var fecha=document.getElementsByClassName("wsite-content-title")[0]
	var meses="ENFEARABAYUNULAGSEOCNODI",mes
	fecha=fecha.textContent
	var longitudFecha=fecha.length
	fecha=fecha.slice(28,longitudFecha-10).split(" DE ")
	mes=fecha[1]
	for(var i=0;i<12;i++)
	{
		if(mes.search(meses.slice(i*2,i*2+2))>=0){fecha[1]=(i+1)+"";break}
	}
	for(var i=0;i<fecha.length;i++)
	{
		if(fecha[i].length==1){fecha[i]="0"+fecha[i];}
	}
	return fecha[0]+"/"+fecha[1]
}
function apariciones100(lista)
{
	var insertados=[]
	var resto=100
	for(var i=0;i<resto;i++){insertados[i]=0}
	for(var i=0;i<lista.length;i++)
	{
		resto100=lista[i]%resto
		insertados[resto100]++
	}
	return insertados
}
function detectaReemplazos(original,poceada)
{
	var nuevos=[]
	var originalOrdenado=apariciones100(original)
	var poceadaOrdenado=apariciones100(poceada)
	for(var i=0;i<100;i++)
	{
		if(poceadaOrdenado[i]>originalOrdenado[i]){nuevos[nuevos.length]=i}
	}
	return nuevos	
}
function buscarRepetidos(lista)
{
	var resultado=[],resto100
	var resto=100
	var insertados=apariciones100(lista)
	for(var i=0;i<resto;i++)
	{
		if(insertados[i]==2)
		{
			resultado[resultado.length]=i
		}
		if(insertados[i]>2)
		{
			resultado[resultado.length]={salió:i,veces:insertados[i]}
		}
	}
	return resultado
}
function contenidoFilaCero(elemento)
{
	return elemento.children[0].innerHTML
}
function extraerNúmerosTabla(tabla)
{
	var cuerpoTabla=tabla.children[0]
	var primeros10números=contenidoFilaCero(cuerpoTabla.children[1])
	var últimos10números=contenidoFilaCero(cuerpoTabla.children[3])
	var resultado=primeros10números+"-"+últimos10números
	while(resultado.search(" ")>=0){resultado=resultado.replace(" ","")}
	resultado=resultado.split("-")
	return resultado
}
function concatenarElementosArray(array)
{
	var salida=""
	for(var i=0;i<array.length;i++)
	{
		salida+=array[i]
	}
	return salida
}
function nocturna()
{
	if(document.body.innerHTML.search("NOCTURNA")==-1)
	{
		return "No se encuentra el sorteo nocturno"
	}
	var fecha=obtenerFecha()
	var tablas=document.getElementsByTagName("table")
	var longitudTablas=tablas.length
	var tablaPoceada=tablas[longitudTablas-1]
	var tablaNúmeros=tablas[longitudTablas-2]
	var listaLetras=document.getElementsByClassName("paragraph")
	var longitudLetras=listaLetras.length
	var letras,textoLetras,longitudTextoLetras,texto
	for(var i=longitudLetras-1;i>=0;i--)
	{
		letras=listaLetras[i]
		texto=letras.textContent
		if(texto.search("LETRAS")>=0)
		{
			longitudTextoLetras=texto.length
			textoLetras=texto.slice(longitudTextoLetras-4)
			break
		}
	}
	var los20números=extraerNúmerosTabla(tablaNúmeros)
	var los20poceada=extraerNúmerosTabla(tablaPoceada)
	var repetidos=buscarRepetidos(los20números)
	var salida=fecha+" "+textoLetras+" "
	salida+=concatenarElementosArray(los20números)
	salida+=" "+JSON.stringify(repetidos)
	salida+=" "+JSON.stringify(detectaReemplazos(los20números,los20poceada))
	return salida
}
clear()
nocturna()
