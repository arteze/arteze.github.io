function iniciar(callback,mostrar_error){
	var iniciado = false
	var intervalo = setInterval(function(){
		try{
			callback()
			iniciado = true
		}catch(e){
			if(mostrar_error){
				console.log(e)
			}
		}
		if(iniciado){
			clearInterval(intervalo)
		}
	})
	return intervalo
}
