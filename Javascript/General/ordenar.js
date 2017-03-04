function generarPosiciones(array)
{
	var devuelve=[]
	for(var i=0;i<array.length;i++)
	{
		devuelve[devuelve.length]=i
	}
	return devuelve
}
function buscar(array,valor,compara,de_menor_a_mayor)
{
	var i=0
	var k=array.length
	var j=Math.floor((i+k)*.5)
	while(i<k)
	{
		if(compara(valor,array[j][1],de_menor_a_mayor)==1){i=j+1}else{k=j}
		j=Math.floor((i+k)*.5)
	}
	return j
}
function insertar(array,valor,posición)
{
	array.length++
	for(var i=array.length-1;i>posición;i--)
	{
		array[i]=array[i-1]
	}
	array[posición]=valor
	return array
}
function buscarInsertar(array,inicial,valor,compara,de_menor_a_mayor)
{
	var posición=buscar(array,valor,compara,de_menor_a_mayor)
	insertar(array,[inicial,valor],posición)
	return array
}
function ordenar(array,compara,de_menor_a_mayor)
{
	var devuelve=[]
	var paralelo=generarPosiciones(array)
	for(var i=0;i<array.length;i++)
	{
		buscarInsertar(devuelve,i,array[i],compara,de_menor_a_mayor)
		if(i%1000==0&i>0){console.log(i)}
	}
	return devuelve
}
function extraer_columna(array,columna)
{
	var array_columna=[]
	for(var i=0;i<array.length;i++)
	{
		array_columna[array_columna.length]=array[i][columna]
	}
	return array_columna
}
//Prueba
function homogeneizar(p)
{
	var o=""
	p=p.toUpperCase()
	for(var i=0;i<p.length;i++)
	{
		var tildes=[["Á","A"],["É","E"],["Í","I"],["Ó","O"],["Ú","U"]]
		var q=false
		for(var j=0;j<tildes.length;j++)
		{
			if(p[i]==tildes[j][0])
			{
				o+=tildes[j][1]
				q=true
			}
		}
		if(!q&(p[i]>="A"&p[i]<="Z"|p[i]=="Ñ")){o+=p[i]}
	}
	return o
}
