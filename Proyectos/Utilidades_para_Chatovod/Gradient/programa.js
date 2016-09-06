function entero16HaciaHexadecimal(entero)
{
	var devuelve=-1
	if(entero>=0&entero<10){devuelve=entero+""}
	if(entero==10){devuelve="A"}
	if(entero==11){devuelve="B"}
	if(entero==12){devuelve="C"}
	if(entero==13){devuelve="D"}
	if(entero==14){devuelve="E"}
	if(entero==15){devuelve="F"}
	return devuelve
}
function entero256HaciaHexadecimal(b256)
{
	var uno=Math.floor(b256/16)
	var dos=Math.floor(b256%16)
	uno=entero16HaciaHexadecimal(uno)
	dos=entero16HaciaHexadecimal(dos)
	return uno+""+dos
}
function decimalHaciaMatiz(decimal)
{
	var matriz=[
		[255,000,000,1], //Rojo
		[255,255,000,0], //Amarillo
		[000,255,000,2], //Verde
		[000,255,255,1], //Cyan
		[000,000,255,0], //Azul
		[255,000,255,2] //Magenta
	]
	var total=decimal*255*6
	var sección=Math.floor(total/255)
	var resto=Math.floor(total%255)
	var signo=sección%2?-1:1
	var canal=matriz[sección][3]
	var resultado=matriz[sección]
	var salida=""
	resultado[canal]+=signo*resto
	resultado=resultado.slice(0,3)
	for(var i=0;i<3;i++)
	{
		salida+=entero256HaciaHexadecimal(resultado[i])
	}
	return salida
}
function agregarTexto(texto,booleano,tamaño)
{
	try{tamaño}catch(e){tamaño=13}
	if(booleano)
	{
		return texto
	}
	else
	{
		return "[size="+tamaño+"]"+texto+"[/size]"
	}
}
function gradual(booleano,tamañoInicial,frase,tamañoFuente,estático,arcoiris)
{
	var hex,decimal
	var tamaño=tamañoInicial
	var contador=tamañoInicial
	var salida=""
	if(frase==undefined){frase="ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"}
	for(var i=0;i<frase.length;i++)
	{
		hex=frase[i].charCodeAt()
		hex=entero256HaciaHexadecimal(hex)
		if(booleano){salida+="[size="+tamañoFuente+"][[/size][size="+tamañoFuente+"]"}else{salida+="["}
		decimal=i/frase.length
		salida+="color=#"
		if(arcoiris)
		{
			salida+=decimalHaciaMatiz(decimal)
		}
		else
		{
			for(var j=0;j<6;j++)
			{
				salida+=entero16HaciaHexadecimal((Math.floor(Math.random()*16)))
			}			
		}
		salida+="]"
		if(booleano){salida+="[/size][size="+tamañoFuente+"][[/size][size="+tamañoFuente+"]"}else{salida+="["}
		salida+="size="+tamaño+"]"+Function("return '\\x"+hex+"'")()
		if(booleano){salida+="[/size][size="+tamañoFuente+"][[/size][size="+tamañoFuente+"]"}else{salida+="["}
		salida+="/size]"
		if(booleano){salida+="[/size][size="+tamañoFuente+"][[/size][size="+tamañoFuente+"]"}else{salida+="["}
		salida+="/color]"
		if(booleano){salida+="[/size]"}
		contador++
		if(!estático)
		{
			if(contador>30){tamaño--}else{tamaño++}
			if(tamaño<10){contador=11;tamaño=11}
		}
	}
	return salida
}
function determinarTamaño(inicio,booleanoCódigo)
{
	var tamaño
	var determinado=booleanoCódigo?10:13
	inicial=inicio.value*1
	if(isNaN(inicial)){inicial=0}
	tamaño=inicial
	if(inicial<10){tamaño=10}
	if(inicial==0){tamaño=determinado}
	if(inicial>30){tamaño=30}
	return tamaño
}
function esChrome()
{
	var navChrome=false
	try{navChrome=chrome}catch(e){navChrome=false}
	if(navChrome!=false){navChrome=true}
	return navChrome
}
function alCargar()
{
	if(!esChrome()){resultado.disabled=false}
}
function genera()
{
	var tamañoInicial,tamañoCódigo
	var estático=est.checked
	var generador=mue.checked
	var arcoiris=arc.checked
	if(generador){cód.disabled=false}else{cód.disabled=true}
	tamañoInicial=determinarTamaño(ini,false)
	tamañoCódigo=determinarTamaño(cód,true)
	resultado.innerHTML=gradual(generador,tamañoInicial,TA.value,tamañoCódigo,estático,arcoiris)
}
