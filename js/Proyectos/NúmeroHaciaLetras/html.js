function insertarResultado()
{
	resLetras.innerHTML=númeroHaciaLetras(aNúmeroHaciaLetras.value)
}
function insertarResultadoSector()
{
	var min=aMenor.value*1
	var max=aMayor.value*1
	sectorLetras.innerHTML=""
	for(var i=min;i<max;i++)
	{
		sectorLetras.innerHTML+=númeroHaciaLetras(i)+"\n"
	}
}
