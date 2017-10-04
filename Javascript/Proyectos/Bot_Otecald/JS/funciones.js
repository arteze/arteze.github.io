//Funciones generales

function agregar_prototipo(clase,prototipo,función)
{
	var objeto={
		get:function(){
			return function(){return función(this,...arguments)}
		}
	}
	Object.defineProperty(clase.prototype,prototipo,objeto)
}
function agregar_prototipo_automático(clase,prototipo)
{
	var función=clase[prototipo]
	agregar_prototipo(clase,prototipo,función)
}
function scroll_al_final(area_texto)
{
	area_texto.scrollTo(0,area_texto.scrollHeight)
}
//Funciones para el bot

function posición_aleatoria(array)
{
	return Math.floor(Math.random()*array.length)
}
function elemento_aleatorio(array)
{
	return array[posición_aleatoria(array)]
}
function procesar(array)
{
	for(var i in array)
	{
		var cadena=array[i]
		bot_otecald.prototype[cadena]=bot[cadena]
		bot_otecald.prototype[cadena+"Exp"]=new RegExp(
			'\\b('+bot[cadena].keys().join('|')+')\\b'
		)
	}
}
