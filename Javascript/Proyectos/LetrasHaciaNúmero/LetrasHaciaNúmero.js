function reemplazar(s,x,y)
{
	var clave="%claveOtecald%"
	while(s.replace(x,clave)!=s){s=s.replace(x,clave)}
	while(s.replace(clave,y)!=s){s=s.replace(clave,y)}
	return s
}
function letrasHaciaNúmero(x)
{
	var devuelve=x.toLowerCase()
	var unidades="Cero Uno Dos Tres Cuatro Cinco Seis Siete Ocho Nueve".toLowerCase().split(" ")
	var unidadesTildadas="null Ún Dós Trés |\\/ \\/ Séis \\/|| \\/||| |X".toLowerCase().split(" ")
	var unidadesCentenas="null | || ||| |\\/ Quin \\/| Setec \\/||| Novec".toLowerCase().split(" ")
	var diez="Diez Once Doce Trece Catorce Quince X\\/| X\\/|| X\\/||| X|X".toLowerCase().split(" ")
	var deci="null Dieci Veinti XXX X|_ |_ |_X |_XX |_XXX XC".toLowerCase().split(" ")
	var decenas="null X Veinte Treinta Cuarenta Cincuenta Sesenta Setenta Ochenta Noventa".toLowerCase().split(" ")
	var illones="null Mi Bi Tri Cuatr_ Quinti Sexti Septi Octi Noni".toLowerCase().split(" ")
	var menos=false
	devuelve=reemplazar(devuelve,".","")
	devuelve=reemplazar(devuelve,"uno","1")
	devuelve=reemplazar(devuelve,"un","1")
	devuelve=reemplazar(devuelve,"cuatri","cuatr_")
	if(devuelve.search("menos")>=0)
	{
		menos=true
		devuelve=reemplazar(devuelve,"menos","")
	}
	if(devuelve.search("coma")>=0)
	{
		devuelve=reemplazar(devuelve,"coma",";")
		devuelve=devuelve.split(";")
		var coma=letrasHaciaNúmero(devuelve[1])
		coma=reemplazar(coma,".","")
		for(var i=0;i<10;i++)
		{
			coma=reemplazar(coma,"<sub>"+i+"</sub>","")
		}
		devuelve=devuelve[0]
	}
	for(var i=0;i<10;i++)
	{
		var reemplazos=[
			["llón","llones"], ["llones","_lones"], [illones[i]+"_lones","{"+i+"}"], [unidades[i],i],
			[diez[i],10+i], [deci[i],i], [unidadesTildadas[i],i], [decenas[i],i*10], [unidadesCentenas[i],i+"c"],
		]
		for(var j=0;j<reemplazos.length;j++)
		{
			devuelve=reemplazar(devuelve,reemplazos[j][0],reemplazos[j][1])
		}
	}
	var reemplazos=[
		[" y ","+"], ["0+",""],
		["cientos","_a_"], ["ciento","_b_"], ["cien","_b_"], ["_a_","cientos"], ["_b_","1cientos"],
		["cientos","00 "], ["mil","."], ["{","<sub>"], ["}","</sub>"]
	]
	for(var j=0;j<reemplazos.length;j++)
	{
		devuelve=reemplazar(devuelve,reemplazos[j][0],reemplazos[j][1])
	}
	if(devuelve[0]=="."){devuelve="1"+devuelve}
	var previsto=devuelve
	var reemplazos=[[" <","<"], ["> ",">"], [" . ","."], ["00  ","00+"], [" .","."]]
	for(var j=0;j<reemplazos.length;j++)
	{
		previsto=reemplazar(previsto,reemplazos[j][0],reemplazos[j][1])
	}
	if(previsto[previsto.length-1]=="+"){previsto=previsto.slice(0,previsto.length-1)}
	if(menos){previsto="-"+previsto.slice(1,previsto.length)}
	if(coma){previsto+=","+coma}
	resPrevisto.innerHTML=previsto
	devuelve=reemplazar(devuelve,".",'","separador","')
	for(var i=0;i<10;i++)
	{
		devuelve=reemplazar(devuelve,"<sub>"+i+"</sub>",'","<sub>'+i+'</sub>","')
	}
	var array=JSON.parse('["'+devuelve+'"]')
	devuelve=""
	var illones=0
	var k=0
	for(var i=0;i<array.length;i++)
	{
		var actual=array[i]
		actual=actual.split("00 ")
		for(var j=0;j<actual.length;j++)
		{
			actual[j]=reemplazar(actual[j]," ","")
		}
		if(actual.length>1)
		{
			while(actual[1].length<2)
			{
				actual[1]="0"+actual[1]
			}
			actual=actual[0]+actual[1]
		}
		else
		{
			if(i>0)
			{
				while(actual[0].length<3)
				{
					actual[0]="0"+actual[0]
				}
			}
		}
		if(actual=="separador")
		{
			actual="."
			if(2){3}
		}
		array[i]=actual+""
		devuelve+=actual
	}
	var cuenta=0
	var semiCuenta=0
	for(var i=0;i<array.length;i++)
	{
		if(array[i]*1==0&array[i+1]!=undefined&array[i-1]!="."){array[i]="1"}
		if(isFinite(array[i])==true)
		{
			semiCuenta+=(array[i]*1)
		}
		else
		{
			if(array[i]==".")
			{
				semiCuenta*=1000
			}
			if(array[i].search("sub")>=0)
			{
				var out=""
				for(var j=0;j<array[i].length;j++)
				{
					if(array[i][j]>0&array[i][j]<10){out+=array[i][j]}
				}
				cuenta+=semiCuenta*Math.pow(10,6*out)
				semiCuenta=0
			}
		}
	}
	cuenta+=semiCuenta
	cuenta+=""
	devuelve=""
	for(var i=1;i<=cuenta.length;i++)
	{
		devuelve=cuenta[cuenta.length-i]+devuelve
		if(i%6==0&i>0)
		{
			devuelve="<sub>"+i/6+"</sub>"+devuelve
		}
		else
		{
			if(i%3==0&i>0&cuenta.length-1>2)
			{
				devuelve="."+devuelve
			}
		}
	}
	if(menos){devuelve="-"+devuelve}
	if(coma){devuelve+=","+coma}
	return devuelve
}
