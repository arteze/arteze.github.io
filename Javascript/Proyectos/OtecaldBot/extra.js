var eliza = new ElizaBot()
var mensajes_array = new Array()

function elizaReset()
{
	eliza.reset()
	mensajes_array.length = 0
	iterar_bot()
}
function iterar_bot()
{
	var mensaje = entrada.value
	if(eliza.quit)
	{
		entrada.value = ""
		if (confirm("This session is over.\nStart over?"))
		{
			elizaReset()
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
			var usr = nombres.usuario + mensaje
			var rpl = nombres.bot + eliza.transform(mensaje)
			mensajes_array.push(usr)
			mensajes_array.push(rpl)
			var temp  = new Array()
			for (var i=mensajes_array.length-1; i>=0; i--) {
				temp.push(mensajes_array[i])
			}
			mensajes_array = temp.reverse()
			texto.value = mensajes_array.join('\n')
		}
		else
		{
			if (mensajes_array.length == 0)
			{
				var initial = nombres.usuario + eliza.getInitial()
				mensajes_array.push(initial)
				texto.value = initial + '\n'
			}
		}
	}
	entrada.value = ""
	entrada.focus()

	texto.scrollTop=Math.pow(10,4)
}
setTimeout(elizaReset,100)
