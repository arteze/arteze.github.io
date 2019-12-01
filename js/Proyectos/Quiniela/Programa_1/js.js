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
	var devuelve=""
	for(var i=0;i<array.length;i++)
	{
		var número=array[i][0]
		var cantidad=array[i][1]
		devuelve+="El "+número+" aparece "+cantidad+" veces.\n"
	}
	return devuelve
}
function ordenar_y_eliminar_duplicados(array)
{
	var devuelve=ordenar(array,comparaNúmeros,true)
	devuelve=extraer_columna(devuelve,1)
	devuelve=eliminarDuplicadosEnArrayOrdenado(devuelve)
	return devuelve
}
function adivinar(array)
{
	var devuelve=[[]],devuelve_texto=""
	for(var m=1;m<=20;m++)
	{
		var cuarta=[]
		var array_2=array.slice(0,m)
		for(var k=0;k<3;k++)
		{
			var primera = [], segunda=[], tercera=[]
			for(var i=0;i<m;i++)
			{
				primera[primera.length] = array_2[i][k]*1
			}
			primera=ordenar_y_eliminar_duplicados(primera)
			for(var i=0;i<m;i++)
			{
				for(var j=0;j<3-k;j++)
				{
					segunda[segunda.length] = array_2[i][k+j+1]*1
				}
			}
			segunda=ordenar_y_eliminar_duplicados(segunda)
			for(var i=0;i<primera.length;i++)
			{
				for(var j=0;j<segunda.length;j++)
				{
					if(array_2[0].slice(2)!=primera[i]+""+segunda[j])
					{
						tercera[tercera.length]=primera[i]+""+segunda[j]
					}
				}
			}
			cuarta=cuarta.concat(tercera)
		}
		cuarta=ordenar_y_eliminar_duplicados(cuarta)
		if(cuarta.length>62){break}
		console.log(cuarta.length,devuelve[devuelve.length-1].length)
		if(cuarta.length>devuelve[devuelve.length-1].length)
		{
			devuelve[devuelve.length]=cuarta
			devuelve_texto+=
				m+" - "+
				cuarta.length+": "+
				(cuarta+"").replace(/,/g," ")+
				"<p/>\n\n"
		}
	}
	return devuelve_texto
}
function extraerNúmeros(texto)
{
	var devuelve=texto
	devuelve=devuelve.match(/[0-9]{4}/g)
	var adivinado = adivinar(devuelve)
	colores.innerHTML=adivinado
	devuelve=devuelve==null?[]:devuelve
	var array=[],array_2=[]
	rellenarArray(array,1)
	for(var i=0;i<devuelve.length;i++)
	{
		var actual=devuelve[i]
		
		extraer_1_dígito(array,actual)
	}
	for(var i=0;i<array.length;i++)
	{
		array_2[array_2.length]=array[i][1]
	}
	devuelve=ordenar(array_2,comparaNúmeros)
	devuelve=formatearResultado(devuelve)
	return devuelve
}
