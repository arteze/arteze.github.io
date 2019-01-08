// ==UserScript==
// @name         Viví tu suerte
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Funciones utilitarias para el análisis numérico.
// @author       ArtEze
// @match        http://www.vivitusuerte.com/datospizarra_loteria.php?fecha=*
// @grant        none
// ==/UserScript==

window.otecald = {}

console.log("otecald.formatear_salidores(otecald.salidores(otecald.obtener_unidades(),10))")

window.otecald.generar_atrasos = function(cantidad)
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
window.otecald.convertir_lista_geogebra = function(cadena,cantidad)
{
	var salida=""
	var array=cadena.split(" ")
	array.unshift(0)
	for(var i in array)
	{
		array[i]=[i,array[i]]
	}
	array.push([i,0])
	salida += "Polígono({("+array.join("),(")+")})"
	return salida
}
window.otecald.atrasos = function(cadena,cantidad)
{
	var atrasos = []
	for(var i=1;i<cadena.length;i++)
	{
		var actual=cadena[i]
		for(var j=i-1;j>=0;j--)
		{
			if(cadena[j]==actual)
			{
				atrasos.push(i-j)
				break
			}
		}
	}
	return atrasos
}
window.otecald.obtener_subcadenas = function(cadena,cantidad)
{
	var frecuencias = []
	for(var i=0;i<=cadena.length-cantidad;i++)
	{
		var parte = cadena.slice(i,i+cantidad)
		var elementos = frecuencias.map(x=>x[0])
		var pos = elementos.indexOf(parte)
		if(pos==-1){frecuencias.push([parte,0]);pos=frecuencias.length-1}
		++frecuencias[pos][1]
	}
	frecuencias.sort((a,b)=>a[1]<b[1])
	return frecuencias
}
window.otecald.contar_unidades = function(cadena)
{
	var diez = window.otecald.array_diez()
	for(var i in cadena)
	{
		++diez[cadena[i]]
	}
	return diez
}
window.otecald.el_más_atrasado = function(cifras)
{
	var más_atrasados = ""
	for(var i = 150;i<cifras.length;i++)
	{
		var sección = cifras.slice(i-150,i)
		var diez = window.otecald.array_diez()
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
window.otecald.detectar_cambios = function(cadena)
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
window.otecald.cantidades_nulas = function()
{
	var diez=[]
	for(var i=0;i<10;i++)
	{
		diez[i]=[i,0]
	}
	return diez
}
window.otecald.frecuencias_diez = function(cadena)
{
	var diez = window.otecald.cantidades_nulas()
	for(var i in cadena)
	{
		++diez[+cadena[i]][1]
	}
    return diez.sort((a,b)=>a[1]<b[1])
}
window.otecald.buscar_mímimos = function(cadena)
{
	var mínimos = []
	var frecuencias = window.otecald.frecuencias_diez(cadena)
	var actual = frecuencias.slice(-1)[0][1]
	for(var i=9;i>=0;--i)
	{
		if(frecuencias[i][1]==actual)
		{
			mínimos.push(frecuencias[i][0])
		}else{
			break
		}
	}
	return [actual,mínimos.sort((a,b)=>a>b)]
}
window.otecald.salidores = function(cadena,desde)
{
	var salidas = []
	cadena = cadena.split("")
	var inicio = 0
	if(desde!=undefined){inicio=cadena.length-desde}
	for(var i=inicio;i<cadena.length;i++)
	{
		var frecuencias = window.otecald.cantidades_nulas()
		for(var j=i;j>=0;j--)
		{
			frecuencias[cadena[j]][1]++
			if(
				new Set(frecuencias.map(x=>x[1])).size==frecuencias.length
				//& j<i-975
			){
				break
			}
		}
		salidas.push([+cadena[i],frecuencias.sort((a,b)=>a[1]<b[1])])
		var cant=100;if(i%cant==0){console.log(Math.ceil(cadena.length/cant))}
	}
	return salidas
}
window.otecald.formatear_salidores = function(array)
{
	return "\n"+array.map(
		x=>x[0]
		+" "+x[1].map(x=>x[0]).join("")
		+" "+x[1].map(x=>x[1]).join(" ")
	).join("\n")+"\n"
}
window.otecald.analizar_frecuencias = function(array)
{
	var salida=[]
	for(var i =1;i<array.length;i++)
	{
		salida.push([array[i][0],array[i-1][1].map(x=>x[0]).indexOf(array[i][0])])
	}
	return salida
}
window.otecald.foreach = function(e,i,a)
{
	var array = [2,3,4]
	array.forEach((e,i,a)=>console.log(e,i,a)) // elem,i,arr
}
window.otecald.comparar = function(unis,pred)
{
	var s=""
	for(var i=0;i<unis.length;i++)
	{
		s+=+(unis[i]==pred[i])
	}
	var atrasos = s.split("1").map(x=>x.length)
	//atrasos.sort((a,b)=>a>b)
	return atrasos.join(" ")
}
window.otecald.predicción_subcadenas = function(cadena,n)
{
	var array = []
	for(var i=0;i<cadena.length;i++)
	{
		var m=i-n
		var j=m<0?0:m
		var frecuencias = otecald.obtener_subcadenas(cadena.slice(j,i+1),2)
		var último = cadena[i]
		var fr_2 = frecuencias.filter(x=>x[0][1]==último)[0]
		//console.log(fr_2)
		if(fr_2==undefined){fr_2="x"}else{fr_2=fr_2[0][0]}
		array.push(fr_2)
		var k=10;if(i%k==0)console.log(cadena.length/k)
	}
	var pred = "x"+array.join("")
	var p = window.otecald.comparar(cadena,pred)
	ordenado = p.split(" ").sort((a,b)=>+a<+b)
	console.log(ordenado)
	console.log(p.split(" ").length)
	return p
}
window.otecald.depurar = function(i,array,cantidad)
{
	if(i%cantidad==0)
	{
		console.log(array.length/cantidad)
	}
}
window.otecald.últimos_turnos = function()
{
	var t = window.todo.slice(-2)
	var a = t[0].turnos
	var b = t[1].turnos
	return a.concat(b)
}
window.otecald.filtrar = function(mínimos,contado)
{
	var filtrado = []
	for(var i in mínimos)
	{
		var valor = mínimos[i]
		var pos = contado.map(x=>x[0]).indexOf(valor)
		filtrado.push(contado[pos])
	}
	filtrado.sort((a,b)=>a[1]<b[1])
	var actual = filtrado.slice(-1)[0][1]
	filtrado = filtrado.filter(x=>x[1]==actual)
	filtrado = filtrado.map(x=>x[0])
	return filtrado
}
window.otecald.pred_20 = function()
{
	var turnos = window.otecald.últimos_turnos()
	var mínimos = []
	for(var j=0;j<3;j++)
	{
		var c = []
		var b = turnos.slice(-1-j)[0]
		for(var i=0;i<4;i++)
		{
			var cadena = b.map(x=>x.slice(-1-i)[0])
            var contado
			if(j==0)
			{
				contado = window.otecald.buscar_mímimos(cadena)[1]
			}else
			{
				contado = window.otecald.frecuencias_diez(cadena)
				var filtrado = window.otecald.filtrar(mínimos[3-i],contado)
				mínimos[3-i] = filtrado
			}
			c.unshift(contado)
		}
		if(j==0){mínimos = c}
	}
	console.log(mínimos.join("\n"))
	console.log(mínimos.join(" "))
	return mínimos.map(x=>x[0])
}
