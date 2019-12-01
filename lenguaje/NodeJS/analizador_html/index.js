/*
Descargar analizador_html desde:
	https://github.com/ArtEze/arteze.github.io/Lenguajes/NodeJS/analizador_html/index.js

*/

var s_a = "\x20\x09\x0d\x0a"
var s = "[" + s_a + "]" // Serie de espacios
var s_0p = s + "*" // Quizás hay espacios
var s_p = s + "+" // Hay espacios

var s_b = "[^" + s_a + "]"
var s_c = "[^" + s_a + "]*"
var s_d = "[^" + s_a + "]+"
var s_e = "[^" + s_a + ">" + "]+"

var n = "[\x0d\x0a]+" + s_0p

var l = "[a-z0-9-]" // Serie de letras y números
var l_0p = l + "*" // Quizás hay espacios
var l_p = l + "+" // Hay espacios

var abre = "(<" + s_0p + l_p
	+ "(?:" + s_0p + "[^=]+" + "=" + '"' + '[^"]*' + '"' + ")*"
var fin_abre = s_0p + ">)"

var regs = [
	[ n , "" ]
	, [ "<!DOCTYPE"+s_p+"html>" , "" ]
	, [ abre + s_0p + "/" + fin_abre, "i" ] // Abre. Cierra. Atributos con comillas dobles.
	, [ abre + fin_abre, "i"] // Abre. Atributos con comillas dobles.
	, [ "(" + "<" + s_0p + "\/" + s_0p + "[^>]+" + ">" + ")", "i"] // Cierra.
].map(function(x){
	return new RegExp(x[0],x[1])
})

var regex_hacia_array = function(regex,texto){
	var encontrado = texto.match(regex)
	var devuelve
	if(encontrado){
		devuelve = Array.from(encontrado)
	}
	return devuelve
}
var partir_etiquetas = function(x,todo,regs){
	var a = regex_hacia_array(regs[2],x)
	var b = regex_hacia_array(regs[3],x)
	var c = regex_hacia_array(regs[4],x)
	if(todo==false){
		if(a){a = ["ac",a[0]]}
		if(b){b = ["a" ,b[0]]}
		if(c){c = ["c" ,c[0]]}
	}else{
		if(a){a = ["ac",a]}
		if(b){b = ["a" ,b]}
		if(c){c = ["c" ,c]}
	}
	var devuelve = a || b || c || ["m",x]
	if(x.slice(0,6)=="<meta "){devuelve[0]="ac"}
	if(x.slice(0,10)=="<!DOCTYPE "){devuelve[0]="ac"}
	return devuelve
}

var atributar = function(etiqueta_actual){
	//console.log(etiqueta_actual)
	var devuelve
	var etiqueta
	var x = etiqueta_actual
	var tabulaciones = x[0]
	var tipo_apertura = x[1]
	var etiqueta_original = x[2]
	if( tipo_apertura!="m" ){
		var a_0 = "(" + s_e + ")" + s_0p + "(.+)"
		var a_3 = "([^=]+" + "=" + '"' + '[^"]*' + '")'
		var a_4 = s_0p + "([^=]+)" + "=" + '"' + '([^"]*)' + '"'
		var a_5 = s_p
		var b_0 = new RegExp(a_0,"i")
		var b_3 = new RegExp(a_3,"g")
		var b_4 = new RegExp(a_4,"i")
		var b_5 = new RegExp(a_5,"i")
		var etiqueta = etiqueta_original
			.replace(/^[<\/]+/g,"")
			.replace(/[\/>]+$/g,"")
		//console.log(4 , etiqueta_original , 4)
		//console.log(5 , etiqueta, 5)
		var nombre
		if( b_5.test(etiqueta) ){
			nombre =  etiqueta.match(b_0)[1]
		}else{
			nombre = etiqueta
		}
		var atributos
		if(b_5.test(etiqueta)){
			atributos = etiqueta.match(b_0)[2]
		}
		if(atributos){
			var encontrado = atributos.match(b_3)
			if(encontrado){
				atributos = encontrado.map(function(x){
					var atributos_encontrado = x.match(b_4)
					if(atributos_encontrado){
						atributos_encontrado = Array.from(atributos_encontrado).slice(1)
					}
					return atributos_encontrado
				})
				//console.log( atributos.length, atributos )
			}
		}
		devuelve = [ tabulaciones, tipo_apertura, nombre ]
		if( atributos && typeof(atributos)=="object" ){
			//console.log(atributos)
			devuelve.push(atributos)
		}
		//console.log( devuelve )
	}
	else{
		devuelve = x
	}
	//console.log(devuelve)	
	return devuelve
}
var analizar_html = function(texto){
	var devuelve = texto
		.replace(/</g,"\n<")
		.replace(/>/g,">\n")
		.split(regs[0])
		.filter(function(x){
			var y = !(/^$/.test(x))
			return y
		})
	devuelve = devuelve.map(function(x){return partir_etiquetas(x,false,regs)})
	var tabulado = []
	var cantidad_tabuladores = 0
	var sumar = false
	var restar = false
	for(var i=0;i<devuelve.length;i++)
	{
		sumar = false
		restar = false
		if(devuelve[i][0]=="a"){
			sumar = true
		}else{
			if(devuelve[i][0]=="c"){
				restar = true
			}
		}
		if(restar){--cantidad_tabuladores}
		var tabs_texto = [...Array(cantidad_tabuladores)]
			.map(function(x){return "\t"})
			.join("")
		var etiqueta = [ cantidad_tabuladores, ...devuelve[i] ]
		var atributado = atributar(etiqueta)
		//console.log(atributado)
		tabulado.push(atributado)
		if(sumar){++cantidad_tabuladores}
	}
	return tabulado
}
var buscar_elementos = function(atributado,etiqueta,atributos_buscados){
	var indices = []
	for( var k=0; k<atributado.length ; k++ )
	{
		var x = atributado[k]
		var tabulado = x[0]
		var tipo_apertura = x[1]
		var nombre = x[2]
		var atributos = x[3]
		var es_abierto = tipo_apertura.includes("a")
		var d_2 = es_abierto && nombre == etiqueta
		var coinciden = 0
		if(atributos){
			for( var i=0; i<atributos.length ; i++ )
			{
				var tiene = atributos[i]
				//console.log(atributos[i])
				for( var j=0; j<atributos_buscados.length ; j++ )
				{
					var buscado = atributos_buscados[j]
					var coincide_clave = tiene[0] == buscado[0]
					var coincide_valor = tiene[1] == buscado[1]
					var contiene_valor = tiene[1].split(" ").includes(buscado[1])
					var busca_clase = buscado[0] == "class"
					var busca_valor_nulo = buscado[1] == ""
					if(
						coincide_clave
						&& (
							( busca_clase && busca_valor_nulo && coincide_valor )
							|| busca_clase && !busca_valor_nulo && contiene_valor
							|| !busca_clase && coincide_valor
						)
						
					){
						// console.log( 7, buscado , 8 , tiene , 7 )
						++coinciden
					}
				}
			}
		}
		if( atributos_buscados.length == coinciden ){
			var contenido = []
			var tabulado = atributado[k][0]
			for( var m=k; m<atributado.length ; m++ )
			{
				var agregar = atributado[m]
				var tabulado_agregar = agregar[0]
				var tipo_apertura = agregar[1]
				var nombre = agregar[2]

				if( /*tipo_apertura != "c"*/ true )
				{
					//console.log( agregar )
					contenido.push( agregar )
				}
				if(
					m!=k
					&& tipo_apertura=="c"
					&& tabulado_agregar==tabulado
					&& nombre==atributado[k][2]
				){
					break
				}

			}
			indices.push( contenido )
		}
	}
	//console.log(indices.length,indices.map(function(x){return x.length}))
	//console.log(indices)
	return indices;
}
module.exports = {
	html: analizar_html
	, buscar: buscar_elementos
}

