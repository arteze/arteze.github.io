function capturar_valores()
{
	/*
	var ambos=["49","16","31","72","26","32","35","46","85","00","60","97","08","17","96","06","40","45","64","91","12","15","24","27","28","36","50","53","67","76","95","13","29","38","44","71","82","90","04","37","54","57","62","69","77","78","93","05","19","33","41","47","52","59","75","09","20","42","58","66","80","92","83","98","07","51","79","86","88","02","39","48","68","01","23","25","30","65","74","94"]
	*/
	var salida="\n"
	var tablas=document.getElementsByTagName("table")
	var elemento_fecha=document.getElementsByTagName("font")[0]
	var texto_fecha=elemento_fecha.textContent.split("\xA0")[1]
	var número_tabla=0
	texto_fecha=texto_fecha.replace(/\//g,"-")
	salida+="/*"+texto_fecha+"*/[\n"
	for(var i=0;i<tablas.length;i++)
	{
		var actual=tablas[i]
		if(actual.border=="1")
		{
			var textos=actual.getElementsByTagName("font")
			var título=textos[0].textContent
			if(título.match(/NACIONAL/i)!=null)
			{
				var ambos="\""
				//var mínimo=ambos.length
				for(var j=2;j<textos.length;j+=2)
				{
					var ambo=textos[j].textContent.slice(2)
					if(j!=2){ambos+=" "}
					ambos+=ambo
					//var elección=ambos.indexOf(ambo)
					//if(elección>=0&elección<mínimo){mínimo=elección}
				}
				ambos+="\""
				ambos+=número_tabla<3?",":"],"
				salida+=ambos+"\n"
				//if(mínimo==ambos.length){mínimo=-1}
				//salida=mínimo+" "
				número_tabla++
			}
		}
	}
	salida+="\n"
	return salida
}
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
