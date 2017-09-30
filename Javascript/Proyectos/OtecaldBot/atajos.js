function atajos(event)
{
	var tecla=event.key.toUpperCase()
	switch(tecla)
	{
		case "ENTER":iterar_bot();break;
	}
}
function agregarTeclado()
{
	document.addEventListener('keyup',atajos)
}
