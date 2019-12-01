function es_array(array,son_arrays)
{
	if(son_arrays==undefined){son_arrays=[]}
	for(var i in array){son_arrays.push(Array.isArray(array[i]))}
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
		absorber_tipo_de_dato(original,[son_arrays,i+2,1-i])
		for(var j in copia){agregar(original,copia,j,son_arrays[i+2])}
	}
	for(var i=0;i<2;i++){son_arrays.shift()}
	return [copiar(uno,son_arrays[0]),copiar(dos,son_arrays[1]),son_arrays]
}

clear()

var son_arrays=[]
var objeto_1={d:2,e:3}
var objeto_2=[0,1,2,3,4,5]
console.log("Original: ",JSON.stringify([objeto_1,objeto_2,son_arrays]))
console.log("Permutado mostrado correctamente: ",JSON.stringify(permutar(objeto_1,objeto_2,son_arrays)))
console.log("Permutado como son realmente: ",JSON.stringify([objeto_1,objeto_2,son_arrays]))
