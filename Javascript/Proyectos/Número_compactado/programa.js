function rellenar(i,potencia)
{
	return "0".repeat(potencia-(i+"").length)+(i+"")
}
function complementar(a,b)
{
	var a=a.slice(-b.length)
	for(var i=0;a.length>=0;i++)
	{
		if(a==b.slice(0,b.length-i) )
		{
			return b.slice(b.length-i)
		}
		a=a.slice(1)
	}
	return a
}
function compactado(cifras)
{
	var devuelve=""
	for(var i=1;i<=cifras;i++)
	{
		var total=Math.pow(10,i)
		for(var j=0;j<total;j++)
		{
			var rellenado=rellenar(j,i)
			var falta=devuelve.search(rellenado)==-1
			if(falta)
			{
				devuelve+=complementar(devuelve,rellenado)
			}
		}
	}
	return devuelve
}
