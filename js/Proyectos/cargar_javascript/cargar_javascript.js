function iniciar(callback){
	var intervalo = setInterval(function(){
		try{
			callback()
			iniciado = true
		}catch(e){}
		if(iniciado){
			clearInterval(intervalo)
		}
	})
}
iniciar(function(){
	var html = document.createElement("html")
	var head = document.createElement("head")
	var script = document.createElement("script")
	var texto_script = function(){
		function insertar_texto(texto){
			var a = document.createElement("a")
			a.innerHTML = texto
			document.body.appendChild(a)
		}
		insertar_texto("¡Hola mundo!")
	}
	var procesado = (texto_script
		.toString()
		.replace(/(function\(\)\{)(.*)/g,"$2")
		.replace(/\}$/,"")
		.replace(/^\s*/,"")
		.replace(/\s*$/,"")
	)
	script.innerHTML = procesado
	head.appendChild(script)
	html.appendChild(head)

	document.head.innerHTML = ""
	document.body.innerHTML = ""

	Array.from(head.children).map(function(x){
		document.head.appendChild(x)
	})
})
