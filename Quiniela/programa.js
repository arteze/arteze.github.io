//Código javascript creado por Emiliano Ezequiel Parenti.
//Predicción Quiniela, http://otecald.atspace.com
//Email: passymas@gmail.com

function rellenarArray(array,dígitos)
{
	var longitud=Math.pow(10,dígitos)
	for(var i=0;i<longitud;i++){array[i]=[i,0]}
	return array
}
function extraer_1_dígito(array,texto)
{
	var actual
	for(var i=0;i<texto.length;i++)
	{
		actual=texto[i]*1
		array[actual][1]++
	}
	return array
}
function formatearResultado(array)
{
	var salida=""
	for(var i=0;i<array.length;i++)
	{
		var número=array[i][0]
		var cantidad=array[i][1]
		salida+="El "+número+" aparece "+cantidad+" veces.\n"
	}
	return salida
}
function extraerNúmeros(texto)
{
	var devuelve=texto
	devuelve=devuelve.match(/[0-9]{4}/g)
	var array=[]
	rellenarArray(array,1)
	for(var i=0;i<devuelve.length;i++)
	{
		var actual=devuelve[i]
		
		extraer_1_dígito(array,actual)
	}
	devuelve=ordenar(array,comparaNúmeros)
	devuelve=formatearResultado(devuelve)
	return devuelve
}
