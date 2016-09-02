function palabrasConGuiones(lemario)
{
	var devuelve=""
	var prefijos=""
	var sufijos=""
	for(var i=0;i<lemario.length;i++)
	{
		var posición=buscarEnArray(lemario[i],"-")
		if(posición==0){prefijos+=i+" "+lemario[i]+"\n"}
		if(posición==lemario[i].length-1){sufijos+=i+" "+lemario[i]+"\n"}
	}
	devuelve=prefijos+"\n"+sufijos
	return devuelve
}
function invertirCadena(cadena)
{
	var devuelve=""
	for(var i=0;i<cadena.length;i++)
	{
		devuelve=cadena[i]+devuelve
	}
	return devuelve
}
