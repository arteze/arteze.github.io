var bot = new bot_otecald()
var mensajes_array = new Array()

function reiniciar_bot()
{
	bot.reset()
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
		bot: nombres.bot + bot.transform(mensaje)
	}
	if(bot.quit)
	{
		entrada.value = ""
		if(confirm(
			"Esta sesión ha terminado."+"\n"+
			"¿Comenzar de nuevo?"
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
			var inicial=nombres.bot+bot.getInitial()
			mensajes_array.push(inicial)
			texto.value=inicial+"\n"
		}
		return;
	}
	mensajes_array.push(mensajes.usuario)
	mensajes_array.push(mensajes.bot)
	texto.value=mensajes_array.join("\n")
	entrada.value=""
	entrada.focus()
	
	//Pone scroll al final.
	texto.scrollTop=Math.pow(10,4)
}
setTimeout(reiniciar_bot,100)
