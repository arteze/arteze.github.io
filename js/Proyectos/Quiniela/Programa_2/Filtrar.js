function generar_compara(columnas)
{
	var devuelve="\t"+"var columnas="+JSON.stringify(columnas)+"\n\t"+
		"for(var i=0;i<columnas.length;i++){"+"\n\t\t"+
			"var columna=columnas[i][0]"+"\n\t\t"+
			"var menos_1=1-2*columnas[i][1]"+"\n\t\t"+
			"var invertir=columnas[i][3]"+"\n\t\t"+
			//"var menos_2=1-2*columnas[i][2]"+"\n\t\t"+
			"if(a.length<b.length){return 1}"+"\n\t\t"+
			"if(a.length>b.length){return -1}"+"\n\t\t"+
			//"if(a[columna].length>b[columna].length){return +menos_1}"+"\n\t\t"+
			//"if(a[columna].length<b[columna].length){return -menos_1}"+"\n\t"+
			"if(a[columna]>b[columna]){return +menos_1}"+"\n\t\t"+
			"if(a[columna]<b[columna]){return -menos_1}"+"\n\t"+
		"};return 0"
	return Function("a","b",devuelve)
}
function ordenar(matriz,columnas)
{
	var compara=generar_compara(columnas)
	return matriz.slice(0).sort(compara)
}
function rellenar(i,repetición,cifras)
{
	var devuelve=i+""
	while(devuelve.length<cifras)
	{
		devuelve=repetición+devuelve
	}
	return devuelve
}
function obtener_máximo(lista)
{
	var máximo=0
	for(var i=0;i<lista.length;i++)
	{
		if(lista[i]*1>máximo*1)
		{
			máximo=lista[i]
		}
	}
	return máximo*1
}
function obtener_mínimo(lista)
{
	var mínimo=lista[0]
	for(var i=0;i<lista.length;i++)
	{
		if(lista[i]*1<mínimo*1)
		{
			mínimo=lista[i]
		}
	}
	return mínimo*1
}
function generar_cien(valor)
{
	var cien=[]
	for(var i=0;i<100;i++)
	{
		switch(valor)
		{
			case 0:cien.push(undefined);break;
			case 1:cien.push(i);break;
			default:cien.push(valor);break;
		}
	}
	return cien
}
function mostrar_array(devuelve)
{
	return "\n"+JSON.stringify(devuelve)
		.replace(/\],\[/g,"\n\n")
		.replace(/,"/g,": ")
		.replace(/,/g," ")
		.replace(/"/g,"")
		.slice(2,-2)+"\n"
}
function reasignar_cabezas(cabezas,inicio,fin)
{
	return cabezas.split(" ").slice(inicio,fin).join(" ")
}
function asignar_cabezas_anterior(cabezas)
{
	var longitud_anterior=cabezas.split(" ").length-1
	return reasignar_cabezas(cabezas,0,longitud_anterior)
}
function listar_análisis(análisis)
{
	return análisis.match(/\d{2}/g).sort()
}
function veces(x,y){return Math.ceil((20*y*x+200*x)/(70*y))}
function generar_orden(ancho,alto)
{
	var devuelve=[]
	for(var i=0;i<alto;i++)
	{
		devuelve[i]=[]
		for(var j=0;j<ancho;j++)
		{
			devuelve[i][j]=j*alto+i
		}
	}
	return JSON.parse("["+devuelve+"]")
}
function generar_grupos(cabezas,mostrar)
{
	var devuelve=[]
	var texto="\n"+"var g=["+"\n"
	cabezas=" "+cabezas+" "
	for(var i=Math.floor(Math.sqrt(cabezas.length));i>=0;i--)
	{
		var actual=buscar_grupo(cabezas,i,2)[0]
		if(actual!="")
		{
			var veces=rellenar(actual.split(" ").length," ",2)
			var puntaje=rellenar(veces*i," ",3)
			var grupo=[rellenar(i," ",3),actual]

			texto_actual="/*"+veces+"\t"+puntaje+"*/\t"+JSON.stringify(grupo)
			if(i>0){texto_actual+=","}
			texto+=texto_actual+"\n"
			devuelve.push(grupo)
		}
	}
	texto+="]"+"\n"
	if(mostrar){console.log(texto)}
	return [devuelve,texto]
}
function generar_grupos_3_y_4_cifras(cabezas)
{
	var devuelve=""
	cabezas+=" "
	for(var i=4;i>=3;i--)
	{
		for(var j=5;j>=1;j--)
		{
			devuelve+=j+" - "+buscar_grupo(cabezas,j,i)[0]+"\n\n"
		}
	}
	return devuelve
}
function filtrarNúmeros(cabezas,grupo)
{
	var salida_1=""
	var cabezas_array=cabezas.match(/\d{2}(?= )/g)
	grupo+=""
	var grupo_array=grupo.split(" ")
	for(var i=0;i<cabezas_array.length;i++)
	{
		var booleano="0"
		for(var j=0;j<grupo_array.length;j++)
		{
			if(cabezas_array[i]==grupo_array[j]){booleano="1"}
		}
		salida_1+=booleano
	}
	salida_1=salida_1.split("1")
	var salida_2=[]
	for(var i=0;i<salida_1.length;i++)
	{
		salida_2.push(salida_1[i].length)
	}
	salida_2=(salida_2+"").replace(/,/g," ")
	return salida_2
}
function iésima_posición(cadena,posición,cantidad,espaciar)
{
	var array=[],devuelve
	cadena=cadena.split(" ")
	for(var i=0;i<cadena.length;i++)
	{
		array.push(cadena[i].slice(posición,posición+cantidad))
	}
	devuelve=(array+"")
	devuelve=espaciar?devuelve.replace(/,/g," "):devuelve.replace(/,/g,"")
	return devuelve
}
function buscar_grupo(cabezas,cantidad,cifras)
{
	var devuelve=[]
	var array=iésima_posición(cabezas,4-cifras,cifras,true)
	var j=Math.pow(10,cifras)
	for(var i=0;i<j;i++)
	{
		var i_2=rellenar(i,"0",cifras)
		var expresión=new RegExp(" "+i_2+" ","g")
		var encontrados=array.match(expresión)
		if(encontrados)
		{
			if(encontrados.length==cantidad)
			{
				devuelve.push(i_2)
			}
		}
		else
		{
			if(cantidad==0)
			{
				devuelve.push(i_2)
			}
		}
	}
	devuelve=(devuelve+"").replace(/,/g," ")
	return [devuelve,array]
}
function filtrarPorDígito(cabezas,posición,dígito)
{
	var cabezaDígito=iésima_posición(cabezas,posición,1,false)
	var salida_1=cabezaDígito.split(dígito)
	var salida_2=[]
	for(var i=0;i<salida_1.length;i++)
	{
		salida_2.push(salida_1[i].length)
	}
	if(salida_2[salida_2.length-1]==0){salida_2.length--}
	salida_2=(salida_2+"").replace(/,/g," ")
	return salida_2
}
function mirar_atrás_4(cabezas,índice)
{
	//cabezas.split(/\d989 /)[1].length/5
	//cabezas.split("9989 ")[1].length/5
	var lista=cabezas.split(" ")
	return lista[lista.length-índice]
}
function analizar_tres_cifras(cabezas)
{
	var tres=["003","042","106","118","142","146","151","173","174","195","215","226","236","275","281","283","305","312","327","342","356","358","390","398","413","426","441","463","476","480","500","504","522","544","546","551","580","596","599","623","625","679","685","703","728","748","752","754","764","784","797","820","826","840","841","869","874","883","886","911","918","933","949","956","973","989"]
	var array=[]
	for(var i=0;i<tres.length;i++)
	{
		var expresión=new RegExp("\\d"+tres[i]+" ","")
		array.push([tres[i],1+cabezas.split(expresión)[1].length/5+1])
	}
	
	var columnas=[[1,false],[0,false]]
	array.sort(generar_compara(columnas))
	array="\n"+JSON.stringify(array)
		.slice(3,-2)
		.replace(/\],\["/g,"\t\t")
		.replace(/",/g," ")
	return array
}
function calcular_diferencia(mínimo,sección_1,sección_2,máximo,sección_actual,último)
{
	var diferencia
	
	var promedio=Math.round(sección_2*Math.pow(2,-0.5))
	//var promedio=Math.pow((sección_1+sección_2)/2)
	
	if(sección_actual==0){diferencia=último-mínimo}
	if(sección_actual==1){diferencia=Math.abs(promedio-último)}
	if(sección_actual==2){diferencia=máximo-último}
	if(sección_actual==3){diferencia=-1}
	if(último==-1|último<mínimo){diferencia=-1}
	return diferencia*1
}
function obtener_promedio(lista)
{
	var promedio=0
	for(var i=0;i<lista.length;i++)
	{
		promedio+=+lista[i]
	}
	promedio/=lista.length
	return promedio
}
function analizar_aleatoriedad(cabezas,número)
{
	var devuelve="\n"
	var anula
	var i=rellenar(número,"0",2)
	var dos_dígitos=iésima_posición(cabezas,2,2,true).split(" ")
	var lista=filtrarNúmeros(cabezas,i).split(" ")
	var último=lista[lista.length-1]
	var máximo=obtener_máximo(lista)
	if(dos_dígitos[dos_dígitos.length-1]==i){anula=true}
	var mínimo=obtener_mínimo(lista)
	var promedios=[lista,lista.slice(1),lista.slice(0,-1),lista.slice(1,-1)]
	for(var i=0;i<promedios.length;i++)
	{
		promedios[i]=Math.ceil(obtener_promedio(promedios[i]))
	}
	
	/*Como no tengo suficientes datos, uso el promedio de promedios.*/
	//var promedio=obtener_máximo(promedios)
	var promedio=obtener_promedio(promedios)
	
	var sección_1=Math.floor(promedio/Math.sqrt(2))
	var sección_2=Math.ceil(promedio*Math.sqrt(2))
	var sección_actual=último<sección_1?0:último<sección_2?1:último<máximo?2:3
	var diferencia=calcular_diferencia(mínimo,sección_1,sección_2,máximo,sección_actual,último)
	//diferencia=último
	if(anula){diferencia=-1}
	return diferencia
	//return diferencia
}
function analizar_aleatoriedad_1_dígito(cabezas,posición,índice)
{
	var resultados=[]
	for(var i=0;i<10;i++)
	{
		resultados.push([i,0])
		var lista=filtrarPorDígito(cabezas,posición,i).split(" ")
		for(var j=0;j<20;j++)
		{
			var actual=resultados[resultados.length-1]
			actual.push(actual[actual.length-1]+(+lista[lista.length-j-1]))
		}
	}
	if(índice==undefined){índice=3}
	var columnas=[[índice+2,false]]
	resultados.sort(generar_compara(columnas))
	resultados="\n"+JSON.stringify(resultados)
		.slice(2,-2)
		.replace(/\],\[/g,"\n")
		.replace(/,/g,"\t")
	return resultados
}
function generar_modo(array,modo)
{
	var orden,ancho=5
	if(modo==9){ancho=3}
	if(modo==24){ancho=6}
	orden=generar_orden(ancho,modo/ancho)
	if(modo==16)
	{
		ancho=5
		array.push(["xx",0])
		var orden=[
			modo,modo,4, 8,12,
			   0,   1,5, 9,13,
			modo,   2,6,10,14,
			modo,   3,7,11,15
		]
	}
	if(modo==18)
	{
		ancho=5
		array.push(["xx",0])
		var orden=[
			   0,2,6,10,14,
			   1,3,7,11,15,
			modo,4,8,12,16,
			modo,5,9,13,17
		]
	}
	return [orden,ancho]
}
function analizar_todos(cabezas,modo,mostrar)
{
	var array=[]
	for(var i=0;i<100;i++)
	{
		var i_2=rellenar(i,"0",2)
		var falta=analizar_aleatoriedad(cabezas,i)
		if(falta>0)
		{
			array.push([i_2,falta])
		}
	}
	var columnas=[[1,false],[0,false]]
	array=array.sort(generar_compara(columnas))

	if(mostrar){ console.log(array.length,JSON.stringify(array)) }

	array=array.slice(0,modo)

	if(mostrar)
	{
		console.log(array[array.length-1])
		console.log(array[0][0],array[1][0])
	}

	columnas=[[0,false]]
	array=array.sort(generar_compara(columnas))
	var orden=generar_modo(array,modo)
	var devuelve=""
	for(var i=0;i<orden[0].length;i++)
	{
		if(i%orden[1]==0){devuelve+="\n"}
		devuelve+=array[orden[0][i]][0]+" "
	}
	return devuelve
}
function simular_jugadas(cabezas,cantidad_a_jugar)
{
	var ceros=0,unos=0
	var adivinado=""
	var cabezas_actual
	var dos_dígitos=iésima_posición(cabezas,2,2,true).split(" ")
	var consola=[]
	for(var i=0;i<dos_dígitos.length-1;i++)
	{
		if(i%30==0){console.log(i)}
		try{
			cabezas_actual=reasignar_cabezas(cabezas,0,i)
			var análisis=analizar_todos(cabezas_actual,cantidad_a_jugar)
			var analizado=listar_análisis(análisis)
			var siguiente=dos_dígitos[i+1]
			
			//var esIgual=0+" "+"00"+"\t"
			var esIgual=0
			var j=0
			//var analizado=[rellenar(Math.floor(Math.random()*100),"0",2)]
			for(var j=0;j<analizado.length;j++)
			{
				//if(siguiente==analizado[j]){esIgual=1+" "+siguiente+"\t"}
				if(siguiente==analizado[j])
				//try
				{
					esIgual=1
					consola.push(siguiente,analizar_aleatoriedad(cabezas_actual,siguiente))
				}
				//catch(e){}
			}
			adivinado+=esIgual
			ceros+=!esIgual
			unos+=esIgual
		}catch(e){console.log(i)}
	}
	console.log(JSON.stringify(consola))
	console.log(unos,ceros,100*unos/(ceros+unos)/cantidad_a_jugar)
	return adivinado
}
function es_rango(lista,mínimo,máximo)
{
	var booleano=false
	for(var i=0;i<lista.length;i++)
	{
		if(lista[i]>=mínimo&lista[i]<=máximo)
		{
			booleano=true
			break
		}
	}
	return booleano
}
function filtrar_todo(cabezas)
{
	var devuelve=[]
	//var devuelve=""
	var insuficientes=[],suficientes=[]
	var dos_dígitos=iésima_posición(cabezas,2,2,true).split(" ")
	var primero=dos_dígitos[0]
	var último=dos_dígitos[dos_dígitos.length-1]
	for(var i=0;i<100;i++)
	{
		var i_2=rellenar(i,"0",2)
		var actual=filtrarNúmeros(cabezas,i_2)
			.split(" ")
		actual=actual.slice(1)
		if(i_2!=último){actual=actual.slice(0,-1)}
		actual=actual
			.map(function(a){return a*1})
			.sort(function(a,b){return a>b?1:-1})

		if( es_rango(actual,66,134) )
		{
			suficientes.push(i_2)
			devuelve.push([i_2].concat(actual))
			//devuelve+=i_2+" "+actual+"\n"
		}
		else
		{
			insuficientes.push(i_2)
		}
		//devuelve=devuelve.concat(actual)
	}
	console.log("Suficientes")
	console.log(suficientes)
	console.log("Insuficientes")
	console.log(insuficientes)
	var columnas=[[1,false],[2,false],[3,false],[0,false]]
	devuelve.sort(generar_compara(columnas))
	//devuelve=devuelve.sort(function(a,b){return a>b?1:-1})
	//devuelve=(devuelve+"").replace(/,/g,"\t")
	devuelve="\n"+JSON.stringify(devuelve).replace(/\],\[/g,"\n").slice(2,-2)+"\n"
	return devuelve
}
function una_cifra_todo(posición)
{
	clear()
	for(var i=0;i<20;i++)
	{
		console.log(i)
		console.log(analizar_aleatoriedad_1_dígito(cabezas,posición,i))
	}
}
function cuánto_jugar(dinero,día)
{
	return Math.ceil(dinero/(21-día))+" "+Math.ceil(4640/70*(21-día)/70)
}
function atrasados(cabezas,tipo,suma)
{
	var array=[]
	var actual
	switch(tipo)
	{
		case 0:actual=iésima_posición(cabezas,2,2,true).split(" ");break;
		case 1:actual=iésima_posición(cabezas,2,1,true).split(" ");break;
		case 2:actual=iésima_posición(cabezas,3,1,true).split(" ");break;
	}
	for(var i=0;i<actual.length;i++)
	{
		var j=i-1;
		var k=j
		var agregado=false
		while(j>=0)
		{
			if(actual[j]==actual[i])
			{
				var atraso=k-j+(+suma==1)
				array.push(atraso)
				agregado=true
				break
			}
			j--
		}
		if(!agregado){array.push(-1)}
	}
	return array
}
function analizar_macro(te,cifras)
{
	s=[]
	for(var i=0;i<20;i++)
	{
		s.push(te[i].slice(-4)[cifras])
	}
	return s.sort().join("")
}
function no_encontrados(ambos)
{
	var devuelve=[]
	var array=ambos.split(" ")
	devuelve.push(array.length/20)
	for(var i=0;i<100;i++)
	{
		var i_2=rellenar(i,"0",2)
		var contiene=array.includes(rellenar(i_2))
		if(!contiene)
		{
			devuelve.push(i_2)
		}
	}
	devuelve.push(devuelve.length-1)
	return devuelve
}
function calcular_progresión(quiero_ganar,es_por_día,a_los,moneda,exp,números_a_jugar)
{
	//calcular_progresión(2,true,20,2,0)
	var gastado=1
	var array="\n"
	var multiplicar_día=70/a_los
	var multiplicación_final=multiplicar_día-números_a_jugar
	var a=a_los==20?moneda*multiplicación_final:multiplicación_final
	var b=a_los==20?moneda:1
	for(var i=0;true;i++)
	{
		if(/*Math.abs(hoy_cada_número)>17142|*/ i>=27){break}
		var multiplica=es_por_día?i+1:1
		var eleva=exp?Math.pow(1.4,i):1
		var esperado=quiero_ganar*multiplica
		var hoy_cada_número=Math.ceil((esperado*eleva+gastado)/a)*b
		var hoy_todo=hoy_cada_número*números_a_jugar
		gastado+=hoy_todo
		array+=
			((i+1)+"\t"+
			gastado+"\t"+
			hoy_cada_número+"\t"+
			hoy_todo+"\t"+
			hoy_cada_número*multiplicar_día+"\t"+
			(hoy_cada_número*multiplicar_día-gastado))+"\n"
	}
	return array
}
function rellenar_sorteo(ambos)
{
	var salida=""
	var array=ambos.split(" ")
	for(var i=0;i<array.length;i++)
	{
		if(i){salida+=" "}
		salida+="00"+array[i]
	}
	return salida
}
function excluir_los_mismos(uno,dos)
{
	var array=[]
	uno=uno.split(" ")
	dos=dos.split(" ")
	for(var i=0;i<uno.length;i++)
	{
		if(!dos.includes(uno[i])){array.push(uno[i])}
	}
	array=array.sort()
	return array
}
function agrupar_sorteos(sorteos)
{
	var devuelve=[]
	for(var i=0;i<sorteos.length;i++)
	{
		devuelve=devuelve.concat(sorteos[i].slice().reverse())
	}
	return devuelve
}
function criterio(a,b)
{
	if(a[1]<b[1]){return -1}
	if(a[1]>b[1]){return +1}
	return 0
}
function filtrar_a_los_20(sorteos)
{
	//\b(40|54|63|78|36|69|32|08|68|33|36|37|45|37|57|59|28|01|32|37)\s\d{2}:\s.+\d{0,}\s2\s0\n
	//\n(38|29|04|00|64|04|74|10).+( [0-4]){3,}\n
	//\n(38|29|04|00|64|04|74|10).+( (\d|1[0-2])){2,}\n //Buscar 2 veces del 0 al 12
	//\n(38|29|04|00|64|04|74|10).                           +( (\d|1\d|2[0-0])){12,}\n Buscar 2 veces del 0 al 20
	//\n(00|04|09|10|12|15|29|38|50|53|55|64|74|80|83|97|99).+( (\d|1\d|2[0-0])){10,}\n Buscar 10 veces del 0 al 20
	//\b.+\s\d{2}:\s.+[0-9]{0,}\s2\s0\n
	//\b.+\s\d{2}:\s.+\s1\s0\n
	//\b.+\s\d{2}:\s.+\s1\n
	//\b.+\s\d{2}:\s.+0{1}\s1\n
	//\n.+(\s\d{1,1}){30,}\n //30 de un dígito.
	var devuelve=""
	var array=[]
	var atraso=0
	var cifras=2
	var agrupado=agrupar_sorteos(sorteos)
	for(var j=0;j<100;j++)
	{
		var número=rellenar(j,"0",cifras)
		var atrasos=[]
		for(var i=0;i<agrupado.length;i++)
		{
			var actual=agrupado[i]
			var encuentra=actual.indexOf(número)!=-1
			if(encuentra)
			{
				atrasos.push(atraso)
				atraso=0
			}
			else
			{
				atraso++
			}
		}
		atrasos.push(atraso)
		array.push([número,obtener_máximo(atrasos),atrasos])
	}
	devuelve=array.sort(criterio)
	return devuelve
}
function fusionar_arrays_de_enteros(array,temporal)
{
	for(var i=0;i<temporal.length;i++)
	{
		if(temporal[i]!=undefined)
		{
			if(array[i]==undefined){array[i]=0}
			array[i]+=temporal[i]
		}
	}
	return array
}
function concatenar_arrays(array,temporal,atrasos)
{
	for(var i=0;i<atrasos.length;i++)
	{
		var actual=atrasos[i]
		if(actual==1&temporal[i]!=undefined)
		{
			if(array[i]==undefined){array[i]=[]}
			array[i]=array[i].concat(temporal[i])
		}
	}
	return array
}
function calcular_porcentaje(todo,resultados,atrasos)
{
	var devuelve=[]
	for(var i=0;i<atrasos.length;i++)
	{
		var actual=atrasos[i]
		if(actual==1&resultados[i]!=undefined)
		{
			if(resultados[i]!=undefined)
			{
				devuelve[i]=/*Math.round*/(todo[i]/resultados[i].length)
			}
		}
	}
	return devuelve
}
function traspuesta(matriz)
{
	var devuelve=[]
	for(var i=0;i<matriz.length;i++)
	{
		var longitud
		if(matriz[i]!=undefined)
		{
			longitud=matriz[i].length
		}
		else
		{
			longitud=0
		}
		for(var j=0;j<longitud;j++)
		{
			if(devuelve[j]==undefined)
			{
				devuelve[j]=[]
			}
			if(matriz[i][j]!=undefined)
			{
				devuelve[j][i]=matriz[i][j]
			}
		}
	}
	return devuelve
}
function no_relacionado(sorteos,menor,mayor)
{
	var veces=[]
	var cantidad_sorteos=[]
	var resultados=[]
	var agrupado=agrupar_sorteos(sorteos)
	var todo=[]
	var veces_temporal=[]
	var resultados_temporal=[]
	var cantidad_sorteos_temporal=[]
	var porcentaje_temporal=[]
	var atrasos=[]
	for(var i=agrupado.length-1;i>=0;i--)
	{
		var actual_i=agrupado[i].split(" ")
		for(var j=i-1;j>=0;j--)
		{
			var atraso=i-j
			var coincidencias=generar_cien()
			var actual_j=agrupado[j].split(" ")
			for(var k=0;k<actual_i.length;k++)
			{
				for(var l=0;l<actual_j.length;l++)
				{
					if(actual_i[k]==actual_j[l])
					{
						coincidencias[+actual_i[k]]=actual_i[k]
					}
				}
			}
			var actualizado=((coincidencias.sort()+"")
				.replace(/,/g," ")
				.replace(/  /g,"")
				.replace(/ $/g,"")
			).split(" ")
			if(actualizado==""){actualizado=[]}
			var aciertos=actualizado.length
			if(todo[atraso]==undefined){todo[atraso]=0}
			if(resultados_temporal[atraso]==undefined){resultados_temporal[atraso]=[]}
			todo[atraso]+=aciertos
			resultados_temporal[atraso].push(i+" "+j+" _"+atraso+"_ "+actualizado+"; ")
			if(aciertos>=menor&aciertos<=mayor)
			{
				if(veces_temporal[atraso]==undefined){veces_temporal[atraso]=0}
				if(cantidad_sorteos_temporal[atraso]==undefined){cantidad_sorteos_temporal[atraso]=0}
				veces_temporal[atraso]+=actualizado.length
				cantidad_sorteos_temporal[atraso]++
				if(atrasos[atraso]==undefined){atrasos[atraso]=1}
			}
			else
			{
				atrasos[atraso]=0
			}
		}
	}
	if(atrasos.includes(1))
	{
		fusionar_arrays_de_enteros(veces,veces_temporal)
		fusionar_arrays_de_enteros(cantidad_sorteos,cantidad_sorteos_temporal)
		concatenar_arrays(resultados,resultados_temporal,atrasos)
	}
	var porcentaje=calcular_porcentaje(todo,resultados,atrasos)
	var devuelve=[veces,cantidad_sorteos,resultados,porcentaje]
	devuelve_ordenado=traspuesta(devuelve)
	devuelve_ordenado.sort(function(a,b){
		var valor_a=a[3]
		var valor_b=b[3]
		if(valor_a==undefined){a[3]=0}
		if(valor_b==undefined){b[3]=0}
		if(valor_a>valor_b){return -1}
		if(valor_a<valor_b){return 1}
		return 0
	})
	devuelve_ordenado=traspuesta(devuelve_ordenado)
	return [devuelve,devuelve_ordenado]
}
function tengo_y_necesito(tengo,necesito)
{
	return Math.ceil((necesito-tengo)/5)*2
}
function escalera(dinero_actual)
{
	var array=[]
	var mitad=Math.floor(dinero_actual/=2)
	var multiplica=10
	var paso=multiplica
	var contador=multiplica
	var total=contador
	for(var i=0;mitad>0;i++)
	{
		if(i%4==0&i>0){
			array.push("$"+(contador-paso))
			contador=paso
		}
		array.push(paso)
		mitad-=paso
		paso+=multiplica
		contador+=paso
		total+=paso
	}
	array.push("$"+(contador-paso))
	array.push(paso/multiplica-1+" números")
	array.push("$"+(total-paso))
	contador=0
	return array
}
function analizar_pares(sorteos)
{
	var salida=""
	var agrupado=agrupar_sorteos(sorteos)
	for(var i=agrupado.length-1;i>0;i--)
	{
		;//Por hacer.
	}
}
function contar_repetidos_ambos(sorteos)
{
	array=[]
	var cifras=4
	var repetición="0"
	var agrupado=agrupar_sorteos(sorteos)
	var texto=(agrupado+"").replace(/,/g," ")
	for(var i=0;i<Math.pow(10,cifras);i++)
	{
		var i_2=rellenar(i,repetición,cifras)
		var número=i_2.slice(0,2)+" "+i_2.slice(2)
		array[i]=[i,texto.match(new RegExp(número,"g"))]
		if(array[i][1]!=null)
		{
			array[i][1]=array[i][1].length
		}
		else
		{
			array[i][1]=0}
	}
	return array
}
function agregar_cantidades_posiciones(cantidades,posiciones,posición)
{
	var actual=posiciones.indexOf(posición)
	if(actual==-1)
	{
		cantidades.push(1)
		posiciones.push(posición)
	}
	else
	{
		cantidades[actual]++
	}
	return [cantidades,posiciones]
}
function contar_frecuencias(array,invertir)
{
	//clear();contar_frecuencias(array)
	var cantidades=[]
	var posiciones=[]
	for(var i=0;i<array.length;i++)
	{
		var encontrado=array[i]
		agregar_cantidades_posiciones(cantidades,posiciones,encontrado)
	}
	var invertido=traspuesta([cantidades,posiciones])
	var ordenado=invertido.sort(function(a,b){
		if(a[0]<b[0]){return +1}
		if(a[0]>b[0]){return -1}
		return 0
	})
	var normal=invertido
	if(invertir){normal=traspuesta(invertido)}
	return normal
}
function buscar_número(sorteos,cadena)
{
	var array=[]
	var agrupado=agrupar_sorteos(sorteos)
	for(var i=0;i<agrupado.length;i++)
	{
		if(agrupado[i].search(cadena)>=0){array.push(i)}
	}
	var resta=[]
	for(var i=1;i<array.length;i++)
	{
		resta.push(array[i]-array[i-1])
	}
	return resta
}
function buscar_patrones_corrido(cadena,cifras)
{
	//clear();x=extraer_dígitos(sorteos,1,2);buscar_patrones_corrido(x,3)[1].slice(0,12)+""
	var cantidades=[]
	var posiciones=[]
	var cifras
	if(cifras==undefined){cifras=5}
	for(var i=0;i<cadena.length-cifras+1;i++)
	{
		var encontrado=cadena.slice(i,i+cifras)
		agregar_cantidades_posiciones(cantidades,posiciones,encontrado)
	}
	var invertido=traspuesta([cantidades,posiciones])
	var ordenado=invertido.sort(function(a,b){
		if(a[0]<b[0]){return +1}
		if(a[0]>b[0]){return -1}
		return 0
	})
	var normal=traspuesta(invertido)
	return normal
}
function extraer_dígitos(sorteos,inicio,fin)
{
	//extraer_dígitos(sorteos,0,1) //Decenas
	//extraer_dígitos(sorteos,1,2) //Unidad
	var devuelve=""
	var agrupado=agrupar_sorteos(sorteos)
	for(var i=0;i<agrupado.length;i++)
	{
		devuelve+=agrupado[i].slice(inicio,fin)
	}
	return devuelve
}
function predecir_dígito(sorteos,muestra)
{
	var devuelve
	var array=""
	var k=0
	var cantidad_posiciones=sorteos[0][0].length
	cantidad_posiciones=1
	if(muestra==undefined){muestra=false}
	for(var j=0;j<cantidad_posiciones;j++)
	{
		var cadena=extraer_dígitos(sorteos,j,j+1)
		if(cadena==""){break}
		if(cadena.search(/\d/)>=0)
		{
			var mínimo=1
			var restado=restar(cadena)
			var primera_parte,última_parte,expresión,encontrado
			var posición,cadena,parte_encontrada,inicio,fin
			var actual,uno,dos,dígito
			for(var i=0;i<restado.length;i++)
			{
				while(true)
				{
					actual=restado[i]
					primera_parte=actual.slice(0,-mínimo)
					última_parte=actual.slice(-mínimo)
					expresión=new RegExp(última_parte,"g")
					encontrado=primera_parte.match(expresión)
					if(encontrado==null){encontrado=[]}
					if(encontrado.length==0){break}
					posición=i
					inicio=primera_parte.indexOf(última_parte)-1
					fin=inicio+última_parte.length+2
					uno=primera_parte.slice(inicio,fin)
					dos=actual.slice(-última_parte.length-1)
					dígito=+uno.slice(-1)
					posición_resta=restado.length-i-1
					predicho=sumar_resta(cadena,dígito,posición_resta,0)
					
					devuelve=[
						k,
						i,
						encontrado+"",
						uno,dos,
						dígito,
						actual,
						posición_resta,
						predicho
					]
					
					mínimo++
				}
			}
			if(k%2==0&k>0){array+=" "}
			if(muestra){console.log(devuelve)}
			array+=(predicho)
			k++
		}
	}
	return array
}
function cadena_probable(cadena)
{
	var devuelve
	var siguiente=cadena.slice(-1)
	var actual=cadena.slice(0,-1)
	for(var i=1;true;i++)
	{
		var primera_parte=actual.slice(0,-i)
		var última_parte=actual.slice(-i)
		var quiebra=false
		expresión=new RegExp(última_parte,"g")
		encontrado=primera_parte.match(expresión)
		if(encontrado==null){break}
		for(var j=0;true;j++)
		{
			expresión=new RegExp(expresión.source+"\\d","g")
			encontrado=primera_parte.match(expresión)
			if(encontrado==null){break}
			if(encontrado.length==1){break}
			devuelve=[encontrado,expresión]
			quiebra=true
			break
		}
		if(!quiebra)
		{
			console.log(encontrado)
			var array=encontrado
			var elemento=encontrado[0]
			var caracter=elemento[elemento.length-1]
			var booleano=caracter==siguiente
			console.log(array,elemento,caracter,booleano)
		}
		else
		{
			console.log(devuelve)
		}
	}
	return undefined
}
//++j;clear();console.log(j);x=extraer_dígitos(sorteos,0,1);z=restar(x)[j];buscar_patrones_corrido(z,4)[0].slice(0,10)

//h=0;k=20;clear();s="";for(var i=agrupado.length-h-1;i>agrupado.length-(h+k);i--){s+=agrupado[i].slice(0,2)+" "};s=s.split(" ");"\n"+JSON.stringify(contar_frecuencias(s)).replace(/"\],\[/g,"\t").replace(/,"/g," ").slice(2,-2)
	
// 1001010001101011100010110101111011101111111011001100010111111110000000

//[
//"97", "84", "95", "79", "61", "90", "71", "21", "36", "27", "68", "11", "25", "47", "90",
//"74", "24", "08", "72", "02", "79", "69", "24", "20", "65", "68", "33", "74", "24", "85",
//"74", "44", "98", "27", "85", "43", "25", "40", "05", "30", "25", "54", "23", "99", "97",
//"54", "29", "77", "40", "23", "50", "91", "22", "20", "01", "05", "30", "98", "25", "30",
//"98", "25", "85", "31", "94", "04", "80", "93", "88", "17"]

function restar(cadena)
{
	var devuelve=[cadena]
	while(devuelve[devuelve.length-1].length>1)
	{
		var elemento=""
		var actual=devuelve[devuelve.length-1]
		for(var j=1;j<actual.length;j++)
		{
			var a_0=+actual[j-1]
			var a_1=+actual[j]+10
			var diferencia=(a_1-a_0)%10
			elemento+=diferencia
		}
		devuelve.push(elemento)
	}
	return devuelve
}
function sumar_resta(cadena,suma,posición,muestra)
{
	var línea,última_cifra
	var restado=restar(cadena)
	if(suma==undefined){suma=0}
	if(posición==undefined){posición=0}
	if(muestra==undefined){muestra=true}
	var sumado=+suma
	if(muestra){console.log(restado[cadena.length-posición-2])}
	for(var i=cadena.length-posición-2;i>=0;i--)
	{
		línea=restado[i]
		última_cifra=+línea[línea.length-1]
		sumado+=última_cifra
	}
	return sumado%10
}
function es_línea_nula(línea)
{
	var devuelve=true
	for(var i=0;i<línea.length;i++)
	{
		if(línea[i]!="0"){devuelve=false;break}
	}
	return devuelve
}
function tiene_ceros(cadena)
{
	var restado=restar(cadena)
	var último="",anterior
	for(var i=restado.length-1;i>=0;i--)
	{
		anterior=último
		último=restado[i]
		if(!es_línea_nula(último)){break}
	}
	var longitud_cero=anterior.length
	return [longitud_cero>0,i,longitud_cero,cadena]
}
function generar_secuencia(cadena,suma)
{
	console.log(restar(cadena))
	for(var i=0;i<100;i++)
	{
		cadena+=sumar_resta(cadena,suma,0,false)
	}
	return cadena
}
function adivinar(cadena)
{
	var devuelve=false
	var restado=restar(cadena)
	var ceros=tiene_ceros(cadena)
	console.log(restado)
	console.log(ceros)
	if(ceros[0]){devuelve=generar_secuencia(cadena)}
	return devuelve
}
function iguales_día_anterior(sorteos)
{
	var k=0
	var agrupado=agrupar_sorteos(sorteos)
	for(var i=agrupado.length-1;i>0;i--)
	{
		var anterior=agrupado[i-1].split(" ")
		var actual=agrupado[i].split(" ")
		for(var j=0;j<1;j++)
		{
			if(actual[0]==anterior[j]){console.log(i,actual[0],++k)}
		}
	}
}
function coincidencias_texto(uno,dos,encuentra)
{
	var coincidencias=[]
	for(var i=0;i<100;i++)
	{
		var cifras=2
		var i_2=rellenar(i,"0",cifras)
		var condición=encuentra?
			uno.includes(i_2)&&dos.includes(i_2)
			:(uno.includes(i_2)&&!dos.includes(i_2))||(!uno.includes(i_2)&&dos.includes(i_2))

		if(condición)
		{
			coincidencias.push(i_2)
		}
	}
	return coincidencias
}
function adivinar_20(sorteos,anterior,aciertos)
{
	var agrupado=agrupar_sorteos(sorteos)
	var sorteo_futuro=agrupado[anterior-1]
	agrupado=agrupado.slice(anterior)
	var últimos=coincidencias_texto(agrupado[0],agrupado[1],1)
	var devuelve=coincidencias_texto(últimos,agrupado[0],0)
	for(var i=2;true;i++)
	{
		var actual=coincidencias_texto(devuelve,agrupado[i],1)
		var coinciden=coincidencias_texto(devuelve,actual,0)
		if(coinciden.length<aciertos){break}
		devuelve=coinciden
	}
	var adivina
	if(sorteo_futuro!=undefined)
	{
		adivina=coincidencias_texto(devuelve.slice(0,3),sorteo_futuro,1)
		//adivina=coincidencias_texto(["00","01","02"],sorteo_futuro,1)
	}
	if(adivina==undefined){adivina={};adivina.length=-1}
	//return "\["+devuelve+"\]\t\["+adivina+"]"
	//console.log(devuelve)
	return [adivina.length,adivina,devuelve]
	//return adivina.length
}
function adivinar_todo(sorteos,aciertos)
{
	var adivinaciones=""
	var devuelve=""
	var agrupado=agrupar_sorteos(sorteos)
	if(aciertos==undefined){aciertos=3}
	for(var i=0;i<agrupado.length-20;i++)
	{
		var actual=adivinar_20(sorteos,i,aciertos)
		devuelve+=actual[0]+"\t"+actual[1]+"\t"+actual[2]+"\n"
		adivinaciones+=actual[0]
	}
	devuelve=devuelve.slice(0,200)
	console.log(adivinaciones)
	return devuelve
}
function el_anterior_a_la_cabeza(sorteos)
{
	var devuelve=[]
	var agrupado=agrupar_sorteos(sorteos)
	for(var i=0;i<agrupado.length-5;i++){
		var actual=agrupado[i].split(" ")[0]
		var coincide=coincidencias_texto(agrupado[i+1],agrupado[i+2],1)
		for(var j=i+3;true;j++)
		{
			if(coincide.length<2){break}
			coincide=coincidencias_texto(coincide,agrupado[j],1)
		}
		if(coincide.includes(actual))
		{
			console.log(agrupado[i])
			devuelve.push(i,actual)
		}
	}
	return devuelve
}
function simular_20(cadena,dinero)
{
	for(var i=0;i<cadena.length;i++)
	{
		;
	}
}
function progresión_pálpitos()
{
	var array=[]
	var cada_uno=2
	var los_seis=cada_uno*6
	var gastado=los_seis
	for(var i=0;i<100;i++)
	{
		array.push([cada_uno,los_seis,gastado])
		cada_uno=Math.ceil((gastado+7*(i+1))/64)
		if(cada_uno<2){cada_uno=2}
		los_seis=cada_uno*6
		gastado+=los_seis
	}
	return array
}
clear()
agrupado=agrupar_sorteos(sorteos)
adivinar_todo(sorteos)
//generar_grupos(cabezas)
//generar_grupos_3_y_4_cifras(cabezas)
//analizar_aleatoriedad_1_dígito(cabezas,3,-2)
//simular_jugadas(cabezas,24)
//filtrar_todo(cabezas)
//var cabezas_2=asignar_cabezas_anterior(cabezas)
//analizar_todos(cabezas,24,true)
