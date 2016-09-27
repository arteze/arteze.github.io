/*
	javascript:t=0;d=document.getElementsByClassName("vote-count-post ");for(i=0;i<d.length;i++){n=d[i].textContent*1;if(i==0){p=n};t+=n};alert([p,t,100*t/p,100*t/p>=25])
*/

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
