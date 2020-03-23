function iniciar(callback,puede_depurar){
	var iniciado = false
	var contador = 0
	var errores = []
	var intervalo = setInterval(function(){
		try{
			callback()
			iniciado = true
		}catch(e){
			if(puede_depurar){
				console.log(e)
			}
			errores.push(e)
			++contador
			if(contador==1000){
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
			if(puede_depurar){
				console.log(iniciado,contador)
			}
		}
	})
	return intervalo
}
