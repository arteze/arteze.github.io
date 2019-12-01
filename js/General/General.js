function copiarArray(array)
{
	var copia=[]
	for(var i=0;i<array.length;i++)
	{
		copia[i]=array[i]
	}
	return copia
}
function eliminarElementoArray(array,posición)
{
	for(var i=posición;i<array.length-1;i++)
	{
		array[i]=array[i+1]
	}
	array.length--
	return array
}
function eliminarDuplicadosEnArrayOrdenado(array)
{
	var devuelve=[]
	for(var i=0;i<array.length;i++)
	{
		if(devuelve[devuelve.length-1]!=array[i])
		{
			devuelve[devuelve.length]=array[i]
		}
	}
	return devuelve
}
function buscarEnArray(array,elemento)
{
	var devuelve=-1
	for(var i=0;i<array.length;i++)
	{
		if(array[i]==elemento)
		{
			devuelve=i
			break
		}
	}
	return devuelve
}
function copiaReferencia(array,tipo)
{
	while(true)
	{
		if(tipo=="referencia"){array=array;break}
		if(tipo=="copia"){array=copiarArray(array);break}
		break
	}
	return array
}
function concatenarArrays(uno,dos,tipo)
{
	var uno=copiaReferencia(uno,tipo)
	var longitudUno=uno.length
	var longitudDos=dos.length
	for(var i=0;i<longitudDos;i++)
	{
		uno[longitudUno+i]=dos[i]
	}
	return uno
}
function arrayHaciaCadena(array)
{
	var cadena=""
	for(var i=0;i<array.length;i++)
	{
		cadena+=array[i]
	}
	return cadena
}
function mayúsculasParaArray(array,tipo)
{
	var array=copiaReferencia(array,tipo)
	var longitud=array.length
	for(var i=0;i<longitud;i++)
	{
		array[i]=array[i].toUpperCase()
	}
	return array
}
function enteroHaciaHexadecimal(entero)
{
	var conversión="0123456789ABCDEF"
	return conversión[(entero-entero%16)/16]+conversión[entero%16]
}
function enteroHaciaCaracter(entero)
{
	return Function("return '\\x"+enteroHaciaHexadecimal(entero)+"'")()
}
