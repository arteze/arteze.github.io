
function descargar_https_asíncrono(url,mostrar_resultado,callback,argumentos){
	var espera = 5*1000
	setTimeout(function(){
		https.get(url,function(recurso){
			var resultado = ""
			recurso.setEncoding("utf8")
			recurso.on("data", function(buffer){
				resultado+=buffer
			})
			recurso.on("end", function(){
				mostrar_resultado && console.log(resultado)
				callback(resultado,recurso,argumentos)
			})	
		})	
	},Math.floor(Math.random()*espera+espera))
}
function guardar_archivo(ruta,texto){
	fs.writeFile(ruta,texto,function(error){
		if(error){
			console.log("Error: ",error)
		}else{
			// console.log("Guardado")
		}
	})
}

function obtener_origen(){
	var protocolo = "https"
	var subsitio = "chat"
	var nombre_sitio = [
		 ["Intercambio","Pila" ]
		,["Exchange"   ,"Stack"]
	][1].reverse().join("").toLowerCase()
	var dominio = "com"
	var sitio = [subsitio,nombre_sitio,dominio].join(".")
	var origen = protocolo + "://" + sitio
	return origen
}
function obtener_día_completo(){
	return "/0-24"
}
function obtener_día_relativo(cuerpo,tipo){
	var regex = new RegExp( "<a\\s+.+?"+tipo+" day.+?</a>", "g" )
	var buscado = Array.from(cuerpo
		.match(regex))[0]
		.split("href")[1]
		.split(/["']+/)[1]
	return buscado
}
function encuentra_día(cuerpo,tipo){
	return cuerpo.indexOf(tipo+" day")!=-1
}
function obtener_fecha_corta(url){
	return url.split("/").slice(-1-3,-1).map(x=>(("0"+x).slice(-2))).join("")
}

function procesar_resultado(resultado,recurso,argumentos){
	var día_encontrado = true
	var tipo = "next"

	var ruta_actual = recurso.socket._httpMessage.path
	//console.log( "Descargado: " , ruta_actual )

	var carpeta = argumentos.carpeta

	var ruta_archivo = "./" + carpeta + "/" + obtener_fecha_corta(ruta_actual) + ".html"
	guardar_archivo(ruta_archivo,resultado)

	if( !encuentra_día(resultado,tipo) ){
		console.log("No hay día siguiente.")
		tipo = "last"
		if( !encuentra_día(resultado,tipo) ){
			console.log("Es el final.")
			día_encontrado = false
		}
	}
	if(día_encontrado){
		var relativo = obtener_día_relativo(resultado,tipo)
		var enlace_con_horas = obtener_origen() + relativo + obtener_día_completo()
		console.log(enlace_con_horas)
		descargar_día(enlace_con_horas,argumentos)
	}
}
function descargar_día(url,argumentos){
	descargar_https_asíncrono(url,false,procesar_resultado,argumentos)
}
function callback_transcripción_final(resultado,argumentos){
	//console.log(resultado.slice(0,2000))
	var tipo = "first"
	if( encuentra_día(resultado,tipo) ){
		var relativo = obtener_día_relativo(resultado,tipo)
		var url = obtener_origen() + relativo + obtener_día_completo()
		console.log(url)
		descargar_día(url,argumentos)
	}else{
		console.log("Día no encontrado.")
	}
}
function descargar_desde_día_inicial(sala,carpeta){
	var relativo = "/transcript/" + sala
	var ruta = obtener_origen() + relativo
	var argumentos = {
		carpeta: carpeta
	}
	function callback(x){
		return callback_transcripción_final(x,argumentos)
	}
	descargar_https_asíncrono(ruta,false,callback,argumentos)
}
function comenzar_descarga(){
	var sala = 30872
	var carpeta = "chat_soes_volcado"
	descargar_desde_día_inicial(sala,carpeta)
}

function exportar(){
	var objeto = {}
	var exportado = [
		"descargar_https_asíncrono"
		, "descargar_día"
		, "descargar_desde_día_inicial"
		, "comenzar_descarga"
	].map(function(x){
		objeto[x] = eval(x)
	})
	return objeto
}
module.exports = exportar()
