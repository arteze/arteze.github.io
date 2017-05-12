function generar_compara(columnas)
{
	var devuelve="\t"+"var columnas="+JSON.stringify(columnas)+"\n\t"+
		"for(var i=0;i<columnas.length;i++){"+"\n\t\t"+
			"var columna=columnas[i][0]"+"\n\t\t"+
			"var menos_1=1-2*columnas[i][1]"+"\n\t\t"+
			//"var menos_2=1-2*columnas[i][2]"+"\n\t\t"+
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
function reasignar_cabezas(cabezas,inicio,fin)
{
	return cabezas.split(" ").slice(inicio,fin).join(" ")
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
function generarGrupos(cabezas,mostrar)
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
			devuelve[devuelve.length]=grupo
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
		salida_2[salida_2.length]=salida_1[i].length
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
		array[array.length]=cadena[i].slice(posición,posición+cantidad)
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
				devuelve[devuelve.length]=i_2
			}
		}
		else
		{
			if(cantidad==0)
			{
				devuelve[devuelve.length]=i_2
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
		salida_2[salida_2.length]=salida_1[i].length
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
		array[array.length]=[tres[i],1+cabezas.split(expresión)[1].length/5+1]
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
function analizar_aleatoriedad_1_dígito(cabezas,índice)
{
	var resultados=[]
	for(var i=0;i<10;i++)
	{
		resultados[resultados.length]=[i,0]
		var lista=filtrarPorDígito(cabezas,3,i).split(" ")
		for(var j=0;j<20;j++)
		{
			var actual=resultados[resultados.length-1]
			actual[actual.length]=(actual[actual.length-1]+(+lista[lista.length-j-1]))
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
		array[array.length]=["xx",0]
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
		array[array.length]=["xx",0]
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
			array[array.length]=[i_2,falta]
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
				{
					esIgual=1
					consola.push(siguiente,analizar_aleatoriedad(cabezas_actual,siguiente))
				}
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
clear()
//generarGrupos(cabezas)
//generar_grupos_3_y_4_cifras(cabezas)
//analizar_aleatoriedad_1_dígito(cabezas,-2)
//simular_jugadas(cabezas,20)
analizar_todos(cabezas,20,true)
