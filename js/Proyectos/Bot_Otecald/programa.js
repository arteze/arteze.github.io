function declarar_variables_globales()
{
	bot_actual=new bot_otecald()
	mensajes_array = []	
}
function iniciar()
{
	var scroll_texto=function(){scroll_al_final(texto)}
	agregar_prototipo_automático(Object,"keys")
	bot_otecald.prototype.iniciado = false
	declarar_variables_globales()
	setTimeout(reiniciar_bot,1000)
	agregarTeclado()
	observar(texto,scroll_texto)
}
