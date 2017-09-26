function formatear(resultado,mensaje_extra)
{
	var devuelve=""
	devuelve+="<table border=1>"
	//if(mensaje_extra)
	{
		devuelve+="<tr>"
		for(var i in mensaje_extra)
		{
			devuelve+="<td align=center>"+mensaje_extra[i]+"</td>"
		}
		devuelve+="</tr>"
	}
	for(var i in resultado)
	{
		devuelve+="<tr>"
		for(var j in resultado[i])
		{
			devuelve+="<td align=center>"
			devuelve+=resultado[i][j]
			devuelve+="</td>"
		}
		devuelve+="</tr>"
	}
	devuelve+="</table>"
	return devuelve
}
function progresión()
{
	var dinero=tengo.value
	var gastado=eval("["+gastos.value+"]")
	var resultado=pérdidas_consecutivas(dinero,gastado)
	var mensaje_extra="ABCDEFG"
	res.innerHTML=formatear(resultado,mensaje_extra)
}
