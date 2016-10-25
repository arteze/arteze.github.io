function reemplazar(texto,a,b)
{
	var devuelve=texto
	while(true)
	{
		var reemplazado=devuelve.replace(a,b)
		if(devuelve==reemplazado)
		{
			break
		}
		else
		{
			devuelve=reemplazado
		}
	}
	return devuelve
}
function esDiferente(letra,abecedario)
{
	var booleano=true
	var contador=0
	var letraQuiebre
	for(var i=0;i<abecedario.length;i++)
	{
		var actual=abecedario[i]
		if(letra==actual)
		{
			booleano=false
			break
		}
	}
	return booleano
}
function empiezaConR(texto,abecedario)
{
	var entrada=" "+texto
	var devuelve=""
	for(var i=0;i<texto.length;i++)
	{
		var anterior=texto[i-1]
		var actual=texto[i]
		var diferente=esDiferente(anterior,abecedario)
		var diferenteActual=esDiferente(actual,abecedario)
		devuelve+=actual=="R"&diferente?"Z":diferenteActual?" ":actual
	}
	return devuelve
}
function fonetizar(texto)
{
	//BDFGJKLMNPRSTYZ AEIOU HÑQVWX
	var abecedario="BDFGJKLMNPRSTYZAEIOU"
	var devuelve=texto
	devuelve=devuelve.toUpperCase()
	var reemplazos=[
		["Á","A"],["É","E"],["Í","I"],["Ó","O"],["Ú","U"],
		
		["V","B"],
		["Z","S"],["RR","Z"],
		
		["GE","JE"],["GI","JI"],
		["GUE","GE"],["GUI","GI"],
		["GÜE","GUE"],["GÜI","GUI"],
		
		["CH","TY"],["LL","Y"],["H",""],
		
		["WA","BUA"],["WE","BUE"],["WI","BUI"],["WO","BUO"],["WU","BU"],
		["ÑA","NIA"],["ÑE","NIE"],["ÑO","NIO"],["ÑU","NIU"],["ÑI","NI"],
		
		["CA","KA"],["CO","KO"],["CU","KU"],["CE","SE"],["CI","SI"],["C","K"],
		["X","KS"],["QU","K"]
	]
	var longitud=reemplazos.length
	for(var i=0;i<longitud;i++)
	{
		devuelve=reemplazar(devuelve,reemplazos[i][0],reemplazos[i][1])
	}
	devuelve=empiezaConR(devuelve,abecedario)
	abecedario+=" "
	longitud=abecedario.length
	for(var i=0;i<longitud;i++)
	{
		devuelve=reemplazar(devuelve,abecedario[i]+abecedario[i],abecedario[i])
	}
	devuelve=devuelve+"\n\n"+devuelve.toLowerCase()
	return devuelve
}

