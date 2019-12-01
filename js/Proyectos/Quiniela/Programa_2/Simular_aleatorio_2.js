function compara(a,b)
{
	if(a<b){return -1}
	if(a>b){return 1}
	return 0
}
function remover_posición_array(array,j)
{
	var devuelve=array[j]
	for(var i=j;i<array.length-1;i++)
	{
		array[i]=array[i+1]
	}
	array.length--
	return devuelve
}
function generar_secuencia(cantidad,valor)
{
	var cien=[]
	for(var i=0;i<cantidad;i++)
	{
		switch(valor)
		{
			case 0:cien.push(undefined);break;
			case 1:cien.push(i);break;
			default:cien.push(valor);break;
		}
	}
	return cien
}
function generar_aleatorio(máximo)
{
	var número=Math.floor(Math.random()*máximo)
	return número
}
function generar_tablero(cantidad)
{
	var tablero=[]
	for(var j=0;j<cantidad;j++)
	{
		var aleatorio=generar_aleatorio(cantidad)
		tablero.push(aleatorio)
	}
	return tablero
}
function ordenar_tablero(tablero)
{
	var devuelve=[]
	for(var i=0;i<100;i++)
	{
		if(tablero.includes(i))
		{
			devuelve.push(i)
		}
	}
	return devuelve
}
function generar_tablero_ordenado(cantidad)
{
	var tablero=generar_tablero(cantidad)
	var ordenado=ordenar_tablero(tablero)
	return ordenado
}
function generar_poceada(cantidad,posiciones)
{
	var array=[]
	var cien=generar_secuencia(cantidad,1)
	for(var i=0;i<posiciones;i++)
	{
		var removido=remover_posición_array(cien,generar_aleatorio(cantidad-i))
		array.push(removido)
	}
	return array.sort(compara)
}
function es_array(objetos,son_arrays)
{
	if(son_arrays==undefined){son_arrays=[]}
	for(var i in objetos){son_arrays.push(Array.isArray(objetos[i]))}
	return son_arrays
}
function vaciar(objeto,objeto_es_array)
{
	for(var i in objeto){delete objeto[i]}
	if(objeto_es_array){objeto.length=0}else{delete objeto.length}
	return objeto
}
function absorber_tipo_de_dato(uno,actual_son_arrays)
{
	var son_arrays=actual_son_arrays[0]
	if(son_arrays[actual_son_arrays[2]]){uno.length=0}else{delete uno.length}
	son_arrays[actual_son_arrays[1]]=son_arrays[actual_son_arrays[2]]
	return son_arrays
}
function agregar(uno,dos,i,uno_es_array)
{
	if(uno_es_array)
	{
		i=+i
		if(uno.length<=i){uno.length=i+1}
	}
	uno[i]=dos[i]
	return uno
}
function copiar(objeto,objeto_es_array)
{
	var copia
	if(objeto_es_array==undefined){objeto_es_array=es_array([objeto])[0]}
	if(objeto_es_array){copia=[]}else{copia={}}
	for(var i in objeto){agregar(copia,objeto,i)}
	return copia
}
function permutar(uno,dos,son_arrays)
{
	var objetos=[copiar(uno),copiar(dos),uno,dos]
	if(son_arrays==undefined)
	{
		son_arrays=es_array(objetos)
	}
	else
	{
		if(son_arrays.length==0)
		{
			es_array(objetos,son_arrays)
		}
		else
		{
			for(var i=0;i<2;i++){son_arrays.push(son_arrays[i])}
		}
	}
	for(var i=0;i<2;i++)
	{
		var original=objetos[i+2]
		var copia=objetos[1-i]
		var actual_son_arrays=[son_arrays,i,1-i]
		vaciar(original,son_arrays[i+2])
		absorber_tipo_de_dato(original,copia,[son_arrays,i+2,1-i])
		for(var j in copia){agregar(original,copia,j,son_arrays[i+2])}
	}
	for(var i=0;i<2;i++){son_arrays.shift()}
	return [copiar(uno,son_arrays[0]),copiar(dos,son_arrays[1]),son_arrays]
}
function coincidencias(uno,dos)
{
	var devuelve=[]
	var copia=[uno,dos]
	//if(copia[0].length>copia[1].length){permutar(uno,dos)}
	for(var i=0;i<uno.length;i++)
	{
		var coincide=dos.includes(uno[i])
		if(coincide)
		{
			devuelve.push(uno[i])
		}
	}
	return devuelve
}
function simular_jugadas(jugadas,cantidad)
{
	var devuelve=0
	for(var i=0;i<jugadas;i++)
	{
		var tablero_ordenado=generar_tablero_ordenado(20)
		var poceada=generar_poceada(100,cantidad)
		devuelve+=(+(coincidencias(poceada,tablero_ordenado).length>=3))
	}
	return devuelve
}
function jugar_6(cantidad)
{
	var salida=""
	for(var k=0;k<cantidad;k++)
	{
		var aciertos=0
		for(var i=0;i<2;i++)
		{
			var poceada=generar_poceada(10,6)
			var sale=generar_aleatorio(10)
			for(var j in poceada)
			{
				if(poceada[j]==sale){aciertos++}
			}
		}
		salida+=aciertos
	}
	return salida
}
function calcular_probabilidad(secuencia,cero,uno)
{
	var ceros=0,unos=0
	for(var i in secuencia)
	{
		ceros+=secuencia[i]=="0"
		unos+=secuencia[i]=="1"
	}
	var finales=Math.pow(cero,ceros)*Math.pow(uno,unos)
	return finales
}
