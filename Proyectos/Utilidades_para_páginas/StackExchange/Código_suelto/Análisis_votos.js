function contarVotos()
{
	var primerVoto
	var totalVotos=0
	var domVotos=document.getElementsByClassName("vote-count-post ")
	var arrayActual=domVotos
	var longitud=domVotos.length
	for(var i=0;i<longitud;i++)
	{
		var actual=arrayActual[i]
		var número=actual.textContent*1
		if(!i){primerVoto=número}
		totalVotos+=número
	}
	return [primerVoto,totalVotos,primerVoto/totalVotos*100,primerVoto/totalVotos*100>=25]
}
contarVotos()
