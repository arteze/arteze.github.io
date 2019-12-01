function criterio_números(columnas)
{
	var devuelve="\t"+"var columnas="+JSON.stringify(columnas)+"\n\t"+
		"for(var i=0;i<columnas.length;i++){"+"\n\t\t"+
			"var columna=columnas[i][0]"+"\n\t\t"+
			"var menos=1-2*columnas[i][1]"+"\n\t\t"+
			"if(a[columna]>b[columna]){return +menos}"+"\n\t\t"+
			"if(a[columna]<b[columna]){return -menos}"+"\n\t"+
		"};return 0"
	return Function("a","b",devuelve)
}
function criterio_secuencias(columnas)
{
	var devuelve="\t"+"var columnas="+JSON.stringify(columnas)+"\n\t"+
		"for(var i=0;i<columnas.length;i++){"+"\n\t\t"+
			"var columna=columnas[i][0]"+"\n\t\t"+
			"var menos=1-2*columnas[i][1]"+"\n\t\t"+
			"if(a[columna].length>b[columna].length){return +menos}"+"\n\t\t"+
			"if(a[columna].length<b[columna].length){return -menos}"+"\n\t"+
			"if(a[columna]>b[columna]){return +menos}"+"\n\t\t"+
			"if(a[columna]<b[columna]){return -menos}"+"\n\t"+
		"};return 0"
	return Function("a","b",devuelve)
}
function ordenar(matriz,columnas,compara)
{
	return matriz.slice(0).sort(compara)
}
function ordenar_números(matriz,columnas)
{
	return ordenar(matriz,columnas, criterio_números(columnas) )
}
function ordenar_secuencias(matriz,columnas)
{
	return ordenar(matriz,columnas, criterio_secuencias(columnas) )
}
