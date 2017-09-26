function capturar_valores_viví_tu_suerte()
{
	var salida="\n"
	var pares_números=div_pizarra.getElementsByClassName("texto_cabezas")
	var texto_fecha=fecha.value
	texto_fecha=texto_fecha.replace(/\//g,"-")
	salida+="/*"+texto_fecha+"*/[\n"
	var array=[]
	var sorteo=[]
	var arrastre=0
	var k=0
	for(var i=0;i<pares_números.length;i++)
	{
		var par_actual=pares_números[i].getElementsByTagName("td")
		for(var j=1;j<par_actual.length;j+=2)
		{
			if(k==20)
			{
				sorteo.push(array)
				array=[]
				k=0
			}
			var ambo=par_actual[j].textContent.slice(3,-1)
			//console.log(k,ambo)
			if(ambo!="")
			{
				if(k%2==0)
				{
					array[k/2]=ambo
				}
				else
				{
					array[(k-1)/2+10]=ambo
				}
				k++
			}
		}
	}
	for(var i=0;i<sorteo.length;i++)
	{
		var ambos=""
		var actual=sorteo[i]
		var condición=i==3|actual.length==0
		if(actual.length>0)
		{
			if(i>0){ambos+=",\n"}
			ambos+="\""
			ambos+=(actual+"").replace(/,/g," ")
			ambos+="\""
		}
		salida+=ambos
	}
	salida+="],\n\n"
	return salida
}
//clear();capturar_valores()
clear();capturar_valores_viví_tu_suerte()
