// ==UserScript==
// @name         Viví tu suerte
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Funciones utilitarias para el análisis numérico.
// @author       ArtEze
// @match        http://www.vivitusuerte.com/datospizarra_loteria.php?fecha=*
// @grant        none
// ==/UserScript==

Array.prototype.u=function(){return this[this.length-1]}

window.otecald = {}

window.otecald.obtener_decenas = function()
{
	return window.todo.map(x=>x.turnos.map(x=>x[0].slice(-2,-1)).join("")).join("")
}
window.otecald.obtener_unidades = function()
{
	return window.todo.map(x=>x.turnos.map(x=>x[0].slice(-1)).join("")).join("")
}
window.otecald.formateado_salidores = function()
{
	var cantidad = 7
	console.log(window.otecald.formatear_salidores(window.otecald.salidores(window.otecald.obtener_decenas(),cantidad)))
	console.log(window.otecald.formatear_salidores(window.otecald.salidores(window.otecald.obtener_unidades(),cantidad)))
}
console.log("window.otecald.formateado_salidores()")
setTimeout(window.otecald.formateado_salidores,1000*10)

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
	var a = []
	var t = window.todo.slice(-10)
	for(var i in t){
		if(t[i].turnos==undefined){console.log(t,i)}
		a=a.concat(t[i].turnos)
	}
	return a
}
window.otecald.pred_20 = function(turnos)
{
	if(turnos==undefined){
		turnos = window.otecald.últimos_turnos()
	}
	var mínimos = []
	var cifras = 4
	for(var j in turnos){
		var c = []
		var actual = turnos[turnos.length-1-j]
		var turno = actual.map(x=>x.slice(-cifras))
		for(var i=0;i<cifras;i++){
			var cifra = turno.map(x=>x[i])
			var contado = window.otecald.frecuencias_diez(cifra)
			var filtrado
			if(j==0){
				filtrado = contado.filter(x=>x[1]==contado[contado.length-1][1]).map(x=>x[0]).join("")
				c.push(filtrado)
			}else{
				var mínimo = mínimos[mínimos.length-1][i]
				var filtro = []
				filtrado = contado
				for(var k in mínimo){
					filtro = filtro.concat(filtrado.filter(x=>x[0]==mínimo[k]))
				}
				filtro = filtro.sort((a,b)=>a[1]<b[1])
				filtrado = filtro.filter(x=>x[1]==filtro[filtro.length-1][1]).map(x=>x[0]).join("")
				c.push(filtrado)
			}
		}
		mínimos.push(c)
		if(c.join(" ").length==7){break}
	}
	return "\n"+mínimos.map(x=>x.join(" ")).join("\n")+"\n"
}
window.otecald.generar_jugadas = function(cadena){
	var array = cadena.split(" ")
    var s=[]
	var i,j,k,m,p,q
	var t="\n"
	q=0
	p=0
	for(i in array[0]){
		for(j in array[1]){
			for(k in array[2]){
				s = []
				for(m in array[3]){
					s.push(array[0][i]+array[1][j]+array[2][k]+array[3][m])
					++p
				}
				t+=s.join(" ")+"\n"
	}}}
	console.log(p)
	q+=p;p=0
	t+="\n"
	for(j in array[1]){
		for(k in array[2]){
			s = []
			for(m in array[3]){
				s.push(array[1][j]+array[2][k]+array[3][m])
				++p
			}
			t+=s.join(" ")+"\n"
	}}
	console.log(p)
	q+=p;p=0
	t+="\n"
	for(k in array[2]){
		s = []
		for(m in array[3]){
			s.push(array[2][k]+array[3][m])
			++p
		}
		t+=s.join(" ")+"\n"
	}
	console.log(p)
	q+=p;p=0
	t+="\n"
	s = []
	for(m in array[3]){
		s.push(array[3][m])
		++p
	}
	t+=s.join(" ")+"\n"
	q+=p
	console.log(p,q)
	return t
}
window.otecald.simular_20_un_año = function(){
	var s=""
	var ale = x=>Math.floor(Math.random()*100)
	for(var i=0;i<365.2425*4*100;i++)
	{
		var simu = [...Array(20)].map(x=>ale())
		var alea = ale()
		s+=+(simu.includes(alea)|simu.includes((alea+1)%100))
	}
	s=s.split(1).map(x=>x.length).sort((a,b)=>a<b)
	return s
}
window.otecald.costo = function(unidad,ambo,cantidad_ambos)
{
	var a = 405+unidad+cantidad_ambos*ambo
	return [a,cantidad_ambos*ambo*3.5,unidad*7]
}
window.otecald.costo_20 = function(cantidad_ambos,extra)
{
	var precio_2 = 2
	var precio_3 = 2
	var precio_4 = 2
	if(extra==undefined){extra=0}
	var calcular_total = (cantidad_ambos,d,c,b)=>d+c+b*cantidad_ambos+extra
	var veces_a_acertar = Math.ceil(cantidad_ambos/3.5)
	console.log("Hay que acertar ",veces_a_acertar," veces.")
	var i=0
	while(
		calcular_total(cantidad_ambos,precio_4,precio_3,precio_2)>=precio_2*3.5*veces_a_acertar
		| calcular_total(cantidad_ambos,precio_4,precio_3,precio_2)>=precio_3*25
		| calcular_total(cantidad_ambos,precio_4,precio_3,precio_2)>=precio_4*175
	)
	{
		if(i>10000){break}
		while(calcular_total(cantidad_ambos,precio_4,precio_3,precio_2)>=precio_2*3.5*veces_a_acertar)
		{
			precio_2 = Math.ceil(calcular_total(cantidad_ambos,precio_4,precio_3,precio_2)/veces_a_acertar/2)*2
			if(calcular_total(cantidad_ambos,precio_4,precio_3,precio_2)==precio_2*3.5*veces_a_acertar)
			{
				++precio_2
			}
		}
		while(calcular_total(cantidad_ambos,precio_4,precio_3,precio_2)>=precio_3*25)
		{
			precio_3 = Math.ceil(calcular_total(cantidad_ambos,precio_4,precio_3,precio_2)/25)
			if(calcular_total(cantidad_ambos,precio_4,precio_3,precio_2)==precio_3*25)
			{
				++precio_3
			}
		}
		while(calcular_total(cantidad_ambos,precio_4,precio_3,precio_2)>=precio_4*175)
		{
			precio_4 = Math.ceil(calcular_total(cantidad_ambos,precio_4,precio_3,precio_2)/175)
			if(calcular_total(cantidad_ambos,precio_4,precio_3,precio_2)==precio_4*175)
			{
				++precio_4
			}
		}
		++i
	}
	for(i=0;i<cantidad_ambos;i++)
	{
		console.log("__xx",precio_2,precio_2*3.5)
	}
	console.log("_xxx",precio_3,precio_3*25)
	console.log("xxxx",precio_4,precio_4*175)
	console.log(
		"Total: ",precio_2*cantidad_ambos
		,precio_3
		,precio_4
		,calcular_total(cantidad_ambos,precio_4,precio_3,precio_2)
	)
}
window.otecald.costo_20_2 = function(m,c,d,u){
	var a = [175,25,3.5,0.35]
	var b = []
	for(var i in a)
	{
		var cantidad = Math.ceil(arguments[i]/a[i])
		b.push(cantidad)
	}
	for(var i=0;i<10;i++){
		;
	}
	return b
}
window.otecald.comparar_cadenas = function(a,b)
{
	var cantidad = 0
	for(var i=0;i<10;i++)
	{
		cantidad+=+(a.includes(i)&&b.includes(i))
	}
	return cantidad
}
window.comparar_sorteos = function(a,b)
{
	var array = []
	for(var i=0;i<20;i++)
	{
		array.push(
			otecald.comparar_cadenas(a[i],b[i])
		)
	}
	return array
}
window.otecald.coincidencias_sorteos = function()
{
	var salida=""
	var turnos = otecald.obtener_turnos()
	for(var i in turnos)
	{
		if(i!=0)
		{
			salida+=+turnos[i-1].map(x=>x.slice(-1)).slice(1,2).includes(turnos[i][0].slice(-1))
		}
	}
	return salida
}
window.otecald.comparar_turnos = function(arr,turnos)
{
	var s=[]
	for(var i in arr)
	{
		s.push(
			     +turnos[i].map(x=>x.slice(-4)).includes(arr[i].slice(-4))
			+""+(+turnos[i].map(x=>x.slice(-3)).includes(arr[i].slice(-3)))
			+""+(+turnos[i].map(x=>x.slice(-2)).includes(arr[i].slice(-2)))
			+""+(+turnos[i].map(x=>x.slice(-1)).includes(arr[i].slice(-1)))
		)
	}
	return s
}
window.otecald.frecuencias_cien = function(sorteo)
{
	var frecuencias = []
	for(var i=0;i<sorteo.length;i++)
	{
		var actual = sorteo[i]
		var pos = frecuencias.map(x=>x[0]).indexOf(actual)
		if(pos==-1){frecuencias.push([actual,0]);pos=frecuencias.length-1}
		++frecuencias[pos][1]
	}
	frecuencias.sort((a,b)=>a[1]<b[1]?1:a[1]==b[1]&&a[0]>b[0]?1:-1)
	return frecuencias
}
