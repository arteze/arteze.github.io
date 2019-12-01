function generar_aleatorio(máximo)
{
	var número=Math.floor(Math.random()*máximo)
	return número
}
function cara_cruz(jugadas,lista)
{
	var iguales=0
	var array=[]
	if(lista.__proto__==""){lista=lista.match(/\d/g)}
	array.length=lista.length
	for(var i=0;i<jugadas;i++)
	{
		if((array+"")==(lista+"")){iguales++}
		for(var j=0;j<array.length-1;j++)
		{
			array[j]=array[j+1]
		}
		array[array.length-1]=generar_aleatorio(2)
	}
	return jugadas/iguales
}
