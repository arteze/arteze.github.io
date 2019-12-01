/*

Modo de uso:

https://discordapp.com/developers/applications/me

n_bot = require("C:/Users/Otecald/Desktop/Proyectos 2017/Node JS/Otecald Bot/código.js")

n_bot.iniciar(escribir el token aquí) //Ejemplo: n_bot.iniciar("adfsfklgjdfgkljdf")

*/

funs={
	procesar:function(mensaje)
	{
		try{
			return eval(mensaje)
		}catch(e){
			console.log("No",mensaje)
			return mensaje
		}
	},
	quitar_espacios:function(mensaje)
	{
		var i=0
		for(;i<mensaje.length;i++)
		{
			if( !(mensaje[i]==" "|mensaje[i]=="\t") ){break;}
		}
		return mensaje.slice(i)
	},
	quitar_prefijo:function(mensaje,prefijo)
	{
		var mensaje=this.quitar_espacios(mensaje)
		
		if( mensaje.slice(0,prefijo.length).toLowerCase()==prefijo )
		{
			mensaje=mensaje.slice(prefijo.length)
		}
		var mensaje=this.quitar_espacios(mensaje)
		return mensaje
	}
}

module.exports =
{
	iniciar:function(TOKEN){
		
		dichos = []
		discord = require("C:/nodejs/node_modules/discord.js")
		bot = new discord.Client()

		this.funs=funs
		bot.funs=funs
		
		var prefijo = "ote"

		bot.on("ready", function() {
			console.log("Listo y sin errores.")
		})

		bot.on("message", function(message) {
			
			var mensaje = message.content
			var minúsculas = mensaje.toLowerCase()
			if (message.author.equals(bot.user)) return;
			if (!minúsculas.startsWith(prefijo)) return;

			var post_pref = this.funs.quitar_prefijo(mensaje,prefijo)
			var args = post_pref.split(/\s+/g)

			switch( args[0] ){
				case "info":
					message.channel.sendMessage("Un mensaje.")
					break;
				case "-":
					var cant=args[1]
					for(var i=0;i<cant;i++){dichos.shift()}
					message.channel.sendMessage(dichos.join("\n"))
					break;
				case "r":
					dichos.length=1
					message.channel.sendMessage(dichos.join("\n"))
					break;
				default:
					var procesado = this.funs.procesar(post_pref)
					dichos.push(procesado)
					message.channel.sendMessage(dichos.join("\n"))
					break;
			}
			return;
		})
		bot.login(TOKEN)
	}
}

// module.exports.iniciar("gadlñfgdsfglkj") //Poner el token

