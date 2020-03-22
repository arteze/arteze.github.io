function iniciar(callback){
	var iniciado = false
	var intervalo = setInterval(function(){
		try{
			callback()
			iniciado = true
		}catch(e){
			console.log(e)
		}
		if(iniciado){
			clearInterval(intervalo)
		}
	})
	return intervalo
}
