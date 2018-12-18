function generar_atrasos(cantidad)
{
	var salida=""
	var array=[]
	for(var i=0;i<cantidad;i++)
	{
		var trinario = ""
		var aleatorio=0
		while(aleatorio!=2)
		{
			trinario+=aleatorio
			salida+=aleatorio
			aleatorio=Math.floor(Math.random()*3)
		}
		array.push(+("0b"+trinario))
		salida+=" "
	}
	return salida
}
function convertir_lista_geogebra(dígitos)
{
	var salida=""
	var array=dígitos.split(" ")
	array.unshift(0)
	for(var i in array)
	{
		array[i]=[i,array[i]]
	}
	array.push([i,0])
	salida += "Polígono({("+array.join("),(")+")})"
	return salida
}
function atrasos(unidades)
{
	var atrasos = []
	for(var i=1;i<unidades.length;i++)
	{
		var actual=unidades[i]
		for(var j=i-1;j>=0;j--)
		{
			if(unidades[j]==actual)
			{
				atrasos.push(i-j)
				break
			}
		}
	}
	return atrasos
}
function obtener_subcadenas(cadena,cifras)
{
	var frecuencias = []
	for(var i=0;i<=cadena.length-cifras;i++)
	{
		var parte = cadena.slice(i,i+cifras)
		var elementos = frecuencias.map(x=>x[0])
		var pos = elementos.indexOf(parte)
		if(pos==-1){frecuencias.push([parte,0]);pos=frecuencias.length-1}
		++frecuencias[pos][1]
	}
	frecuencias.sort((a,b)=>a[1]<b[1])
	return frecuencias
}
function el_más_atrasado(cifras)
{
	var más_atrasados = ""
	for(var i = 150;i<cifras.length;i++)
	{
		var sección = cifras.slice(i-150,i)
		var diez = [...Array(10)].map(x=>0)
		for(var j=sección.length-1;j>=0;j--)
		{
			var actual=sección[j]
			if(diez.indexOf(0)==-1){break}
			++diez[actual]
		}
		más_atrasados += sección[j]
	}
	return más_atrasados
}
function detectar_cambios(cadena)
{
	var cambios=[]
	var cambio=""
	for(var i=1;i<cadena.length;i++)
	{
		if(cadena[i]!=cadena[i-1])
		{
			cambios.push(cambio)
			cambio=""
		}
		cambio+=cadena[i]
	}
	cambios.push(cambio)
	return cambios
}
function frecuencias_diez()
{
	var diez=[]
	var i;
	for(i=0;i<10;i++)
	{
		diez[i]=[i,0]
	}
    return diez
}
function salidores(cadena,desde)
{
	var salidas = []
	var cadena = cadena.split("")
	var inicio = 0
	if(desde!=undefined){inicio=cadena.length-desde}
	for(var i=inicio;i<cadena.length;i++)
	{
		var frecuencias=frecuencias_diez();
		for(var j=i;j>=0;j--)
		{
			frecuencias[cadena[j]][1]++
			if(new Set(frecuencias.map(x=>x[1])).size==frecuencias.length){break}
		}
		salidas.push([+cadena[i],frecuencias.sort((a,b)=>a[1]<b[1])])
		var cant=200;if(i%cant==0){console.log(Math.ceil(cadena.length/cant))}
	}
	return salidas
}
function formatear_salidores(array)
{
	return array.map(
		x=>x[0]
		+" "+x[1].map(x=>x[0]).join("")
		+" "+x[1].map(x=>x[1]).join(" ")
	).join("\n")
}
function analizar_frecuencias(array)
{
	var salida=[]
	for(var i =1;i<array.length;i++)
	{
		t6_3.push([array[i][0],array[i-1][1].map(x=>x[0]).indexOf(array[i][0])])
	}
	return salida
}
// Foreach 
var array = []
array.forEach((e,i,a)=>console.log(e,i,a)) // elem,i,arr
