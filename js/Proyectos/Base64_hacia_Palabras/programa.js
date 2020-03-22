/*
	Código javascript creado por Emiliano Ezequiel Parenti.
	Lingüística computacional 2017, http://otecald.github.io
	Email: passymas@gmail.com
*/
function abecedario(tipo)
{
	var devuelve,caracteres,tipos
	var transforma=true
	while(true)
	{
		tipos=[
			["números","0123456789"],
			["minúsculas","abcdefghijklmnopqrstuvwxyz"],
			["mayúsculas","ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
			["operadores","+/"]
		]
		var quiebra=false
		for(var i=0;i<tipos.length;i++)
		{
			if(tipo==tipos[i][0]){caracteres=tipos[i][1];quiebra=true}
		}
		if(quiebra==true){break}
		transforma=false
		var devuelve=[]
		if(tipo=="caracteres")
		{
			for(var i=0;i<256;i++){devuelve[i]=enteroHaciaCaracter(i)}
			break
		}
		tipos=[
			["hexadecimal",["números","mayúsculas"]],
			["base 64",["mayúsculas","minúsculas","números","operadores"]]
		]
		for(var i=0;i<tipos.length;i++)
		{
			if(tipo==tipos[i][0])
			{
				for(var j=0;j<tipos[i][1].length;j++)
				{
					var tipoActual=abecedario(tipos[i][1][j])
					concatenarArrays(devuelve,tipoActual,"referencia")
				}
				break
			}
		}
		break
	}
	if(transforma){devuelve=copiarArray(caracteres)}
	return devuelve
}
function fórmulaBase(base,longitud)
{
	var x=base,y=longitud
	return x*(Math.pow(x,y)-1)/(x-1)
}
function informaciónEntrante(base,entero)
{
	var i=0
	for(;fórmulaBase(base,i+1)<=entero;i++){}
	return i
}
function filtrarCaracteres(caracteres,cadena)
{
	var devuelve=[]
	var longitud=cadena.length
	for(var i=0;i<longitud;i++)
	{
		if(buscarEnArray(caracteres,cadena[i])>=0)
		{
			devuelve[devuelve.length]=cadena[i]
		}
	}
	return devuelve
}
function abecedarioBase(base)
{
	var devuelve
	var límites=[
		[0,"hexadecimal"],[16-6+26,"base 64"],[64,"caracteres"],[256,""]
	]
	for(var i=0;i<límites.length-1;i++)
	{
		if(base>límites[i][0]&base<=límites[i+1][0])
		{
			devuelve=abecedario(límites[i][1]).slice(0,base)
			break
		}
	}
	return devuelve
}
function base64HaciaBinario(base64,rellenar)
{
	var entero,binario,longitud
	var bases={origen:64,destino:2},cantidadBits=0,devuelve="",bitsPorByte=8
	var abecedarioActual=abecedario("base 64")
	var logaritmo=Math.log(bases.origen)/Math.log(bases.destino)
	base64=filtrarCaracteres(abecedarioActual,base64)
	longitud=base64.length
	for(var i=0;i<longitud;i++)
	{
		entero=buscarEnArray(abecedarioActual,base64[i])
		binario=""
		for(var j=0;j<logaritmo;j++)
		{
			if(devuelve!=""&(cantidadBits+logaritmo-1-j)%bitsPorByte==0)
			{
				binario=" "+binario
			}
			binario=entero%bases.destino+binario
			entero-=entero%bases.destino
			entero/=bases.destino
		}
		devuelve+=binario
		cantidadBits+=logaritmo
	}
	if(rellenar)
	{
		while(cantidadBits%bitsPorByte!=0)
		{
			devuelve+="0"
			cantidadBits++
		}
	}
	return devuelve
}
function binarioHaciaBase64(binario,rellenar)
{
	var entero,longitud,devuelve="",cantidadCaracteres=0,bitsPorByte=8
	var bases={origen:2,destino:64}
	var abecedarios={
		origen:abecedarioBase(bases.origen),
		destino:abecedarioBase(bases.destino)
	}
	var logaritmo=Math.log(bases.destino)/Math.log(bases.origen)
	binario=filtrarCaracteres(abecedarios.origen,binario)
	longitud=binario.length
	for(var i=0;i<longitud;i+=logaritmo)
	{
		entero=0
		if((cantidadCaracteres*logaritmo)%bitsPorByte==0&devuelve!="")
		{
			devuelve+=" "
		}
		for(var j=0;j<logaritmo;j++)
		{
			if(i+j>=longitud){break}
			entero*=bases.origen
			entero+=binario[i+j]*1
		}
		devuelve+=abecedarios.destino[entero]
		cantidadCaracteres++
	}
	if(rellenar)
	{
		while((cantidadCaracteres*logaritmo)%bitsPorByte!=0)
		{
			devuelve=devuelve+"="
			cantidadCaracteres++
		}
	}
	return devuelve
}
function errorBase()
{
	var mensaje="Lo que se quiere convertir es demasiado largo"
	console.error(mensaje)
	return mensaje
}
function baseDeterminadaHaciaEntero(base,cadena)
{
	var caracter
	var devuelve=0
	var abecedarioActual=abecedarioBase(base)
	if(base>0&base<=16-6+26){cadena=mayúsculasParaArray(cadena,"referencia")}
	cadena=filtrarCaracteres(abecedarioActual,cadena)
	var longitud=cadena.length
	if(Math.pow(base,longitud)>=Math.pow(2,52)){return errorBase()}
	for(var i=0;i<longitud;i++)
	{
		devuelve*=base
		caracter=cadena[i]
		devuelve+=buscarEnArray(abecedarioActual,caracter)
	}
	devuelve+=fórmulaBase(base,longitud-1)
	return devuelve
}
function enteroHaciaBaseDeterminada(base,entero,rellenar)
{
	var resto,caracter,resultado=""
	var abecedarioActual=abecedarioBase(base)
	var i=informaciónEntrante(base,entero)
	entero-=fórmulaBase(base,i)
	if(entero>=Math.pow(2,52)){return errorBase()}
	while(entero>0)
	{
		resto=entero%base
		caracter=abecedarioActual[resto]
		resultado=caracter+resultado
		entero-=resto
		entero/=base
	}
	if(rellenar)
	{
		while(resultado.length<=i)
		{
			resultado=abecedarioActual[0]+resultado
		}
	}
	return resultado
}
function sumarNúmeros(cadena)
{
	var número=0
	var longitud=cadena.length
	for(var i=0;i<longitud;i++)
	{
		var actual=cadena[i]
		if(actual>="0"&actual<="9"&actual!==" "){número+=1*actual}
	}
	return número
}
function comprobarSuma(comprobaciónSuma,entero,palabra)
{
	var longitud=comprobaciónSuma.length
	var número=sumarNúmeros(comprobaciónSuma)
	var uno=entero*Math.pow(Math.PI,2)
	var dos=número*Math.pow(Math.PI,3)
	var tres=Math.floor(uno+dos)
	var cifras=7
	var resultado=Math.floor(tres)%Math.pow(10,tres%cifras+1)
	if(resultado%20==0)
	{
		resultado/=20
		if(resultado==0){resultado=1}
		resultado+=" "+palabra
	}
	var devuelve
	if(longitud>0)
	{
		devuelve=" "+resultado
	}
	else
	{
		devuelve=resultado
	}
	return comprobaciónSuma+devuelve
}
function base64HaciaPalabras(fuente,lemario)
{
	var salida="",comprobaciónSuma=""
	var copiaLemario=copiarArray(lemario),longitud
	var bases={origen:64,destino:2}
	var abecedarios={
		origen:abecedarioBase(bases.origen),
		destino:abecedarioBase(bases.destino)
	}
	fuente=filtrarCaracteres(abecedarios.origen,fuente)
	fuente=base64HaciaBinario(fuente,false)
	fuente=filtrarCaracteres(abecedarios.destino,fuente)
	longitud=fuente.length
	for(var i=0;i<longitud;)
	{
		var aumenta=informaciónEntrante(bases.destino,copiaLemario.length)
		var sección=fuente.slice(i,i+aumenta)
		var entero=baseDeterminadaHaciaEntero(bases.destino,sección)
		if(i!=0){salida+=" "}
		var palabra=copiaLemario[entero]
		while(palabra.search(" ")>=0){palabra=palabra.replace(" ","_")}
		salida+=palabra
		comprobaciónSuma=comprobarSuma(comprobaciónSuma,entero,palabra)
		eliminarElementoArray(copiaLemario,entero)
		if(informaciónEntrante(bases.destino,copiaLemario.length)==0)
		{
			copiaLemario=copiarArray(lemario)
		}
		i+=aumenta
	}
	return {comprobaciónSuma:comprobaciónSuma,salida:salida}
}
function palabrasHaciaBase64(fuente,lemario)
{
	var fuente=fuente.split(" ")
	var palabra,binario,parcial
	var salida="",comprobaciónSuma="",bitsPorByte=8,cantidadCaracteres=0
	var copiaLemario=copiarArray(lemario)
	var bases={origen:2,destino:64}
	var logaritmo=Math.log(bases.destino)/Math.log(bases.origen)
	var longitud=fuente.length
	for(var i=0;i<longitud;i++)
	{
		palabra=fuente[i]
		while(palabra.search("_")>=0){palabra=palabra.replace("_"," ")}
		var entero=buscarEnArray(copiaLemario,palabra)
		binario=enteroHaciaBaseDeterminada(2,entero,true)
		parcial=binarioHaciaBase64(binario,false)
		cantidadCaracteres+=parcial.length
		salida+=parcial
		comprobaciónSuma=comprobarSuma(comprobaciónSuma,entero,palabra)
		eliminarElementoArray(copiaLemario,entero)
		if(informaciónEntrante(bases.origen,copiaLemario.length)==0)
		{
			copiaLemario=copiarArray(lemario)
		}
	}
	while((cantidadCaracteres*logaritmo)%bitsPorByte!=0)
	{
		salida=salida+"="
		cantidadCaracteres++
	}
	return {comprobaciónSuma:comprobaciónSuma,salida:salida}
}
