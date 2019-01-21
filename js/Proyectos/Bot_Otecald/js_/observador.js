function observar(texto,función)
{
	observación = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
		//console.log(mutation.type)
		función()
	  })
	})

	var target = texto // selecciona el nodo objetivo
	configuración = { attributes: true, childList: false, characterData: false }
	observación.observe(target, configuración) // pasa en el nodo objetivo, así como las opciones de observador
	//observación.disconnect() // más tarde, puedes dejar de observar
}
