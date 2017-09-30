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
	if(bot.quit)
	{
		entrada.value = ""
		if (confirm("This session is over.\nStart over?"))
		{
			reiniciar_bot()
		}
		entrada.focus()
		return;
	}
	else
	{
		var nombres={
			usuario:"Yo:  ",
			bot:    "Bot: "
		}
		if (mensaje != "")
		{
			var mensajes={
				usuario: nombres.usuario + mensaje,
				bot: nombres.bot + bot.transform(mensaje)
			}
			mensajes_array.push(mensajes.usuario)
			mensajes_array.push(mensajes.bot)
			var temporal  = new Array()
			for (var i=mensajes_array.length-1; i>=0; i--)
			{
				temporal.push(mensajes_array[i])
			}
			mensajes_array = temporal.reverse()
			texto.value = mensajes_array.join("\n")
		}
		else
		{
			if (mensajes_array.length == 0)
			{
				var inicial = nombres.usuario + bot.getInitial()
				mensajes_array.push(inicial)
				texto.value = inicial + '\n'
			}
		}
	}
	entrada.value = ""
	entrada.focus()

	texto.scrollTop=Math.pow(10,4)
}
setTimeout(reiniciar_bot,100)
