//http://www.resultadoloterianacional.com/loteria-argentina.html

function obtenerTablaCorrecta()
{
	var i,tabla,cantidadLinks,devuelve
	var tablas=document.getElementsByClassName("wcustomhtml")
	var longitud=tablas.length
	for(i=0;i<longitud;i++)
	{
		tabla=tablas[i]
		cantidadLinks=tabla.getElementsByTagName("a").length
		if(cantidadLinks>10)
		{
			devuelve=tablas[i]
			break
		}
	}
	return devuelve
}
function obtenerListaLinks()
{
	var i,actual,texto,encuentraTexto,vínculo,textoCortado
	var tabla=obtenerTablaCorrecta()
	var vínculos=tabla.getElementsByTagName("a")
	var longitud=vínculos.length
	var salida={html:"",vínculos:[],textos:[]}
	for(i=longitud-1;i>=0;i--)
	{
		actual=vínculos[i]
		texto=actual.textContent
		encuentraTexto=texto.search("QUINIELA")>=0
		if(encuentraTexto)
		{
			textoCortado=texto.split("QUINIELA NACIONAL ")[1]
			vínculo=actual.href
			salida.vínculos[salida.vínculos.length]=vínculo
			salida.textos[salida.textos.length]=textoCortado
			salida.html+="<div><a target=\"_blank\" href=\""+vínculo+"\">"+textoCortado+"</a></div>\n"
		}
		
	}
	return salida
}
clear()
var salida=obtenerListaLinks()
document.body.innerHTML=salida.html
undefined
