function reiniciar_bot()
{
	bot_actual.reiniciar()
	mensajes_array.length = 0
	iterar_bot()
}
function iterar_bot()
{
	var mensaje = entrada.value
	var nombres = {
		usuario:"Yo:  ",
		bot:    "Bot: "
	}
	var mensajes={
		usuario: nombres.usuario + mensaje,
		bot: nombres.bot + bot_actual.responder(mensaje)
	}
	if(bot_actual.fin)
	{
		entrada.value = ""
		var mensaje_actual=nombres.bot+bot_actual.obtener_mensaje_final()
		mensajes_array.push(mensaje_actual)
		texto.value=mensaje_actual+"\n"
		if(confirm(
			mensaje_actual+"\n\n"+
			"¿Quieres iniciar una nueva conversación?"
		)){
			reiniciar_bot()
		}
		entrada.focus()
		return;
	}
	if(mensaje=="")
	{
		if(!mensajes_array.length)
		{
			var mensaje_actual=nombres.bot+bot_actual.obtener_mensaje_inicial()
			mensajes_array.push(mensaje_actual)
			texto.value=mensaje_actual+"\n"
		}
		return;
	}
	mensajes_array.push(mensajes.usuario,mensajes.bot)
	texto.value=mensajes_array.join("\n")
	entrada.value=""
	entrada.focus()

	scroll_al_final(texto)
}
