function iniciar(callback,opciones){
	/* Opciones:
		var opciones = {
			puede_depurar: true | false
			, milisegundos: 10 | 20 | 50 | 100 // ...
		}
	*/	
	var iniciado = false
	var contador = 0
	var errores = []
	var intervalo = setInterval(function(){
		try{
			callback()
			iniciado = true
		}catch(e){
			if(opciones && opciones.puede_depurar){
				console.log(e)
			}
			errores.push(e)
			if(++contador==1000){
				clearInterval(intervalo)
				var depurado = (function mostrar_errores(){
					if(errores.length>0){
						console.log(errores.shift())
						setTimeout(mostrar_errores,50)
					}
				})()
			}
		}
		if(iniciado){
			clearInterval(intervalo)
			if(opciones && opciones.puede_depurar){
				console.log(iniciado,contador)
			}
		}
	},opciones && opciones.milisegundos?opciones.milisegundos:0)
	return intervalo
}
