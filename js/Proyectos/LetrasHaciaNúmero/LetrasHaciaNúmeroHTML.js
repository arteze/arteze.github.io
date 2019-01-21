function aplanar(formateado)
{
	var llano=formateado
	llano=reemplazar(llano,".","")
	for(var i=0;i<10;i++)
	{
		llano=reemplazar(llano,"<sub>"+i+"</sub>","")
	}
	return llano=reemplazar(llano,".",",")
}
function insertarResultado()
{
	var formateado=letrasHaciaNúmero(aNúmeroHaciaLetras.value)
	resNúmeroMiles.innerHTML=formateado
	resNúmeroLlano.innerHTML=aplanar(formateado)
}
function sectorLetrasHaciaNúmeros()
{
	var devuelve=""
	var lista=sectorLetras.value
	var lista=reemplazar(lista,",","\n")
	lista=lista.split("\n")
	console.log(lista)
	for(var i=0;i<lista.length;i++)
	{
		if(lista[i])
		{
			devuelve+=aplanar( letrasHaciaNúmero(lista[i]) )+"\n"
		}
	}
	sectorNúmeros.value=devuelve
}