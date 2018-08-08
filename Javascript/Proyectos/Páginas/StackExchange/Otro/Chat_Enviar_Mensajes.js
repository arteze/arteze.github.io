function enviar_mensaje(mensaje)
{
	$.ajax({
		'type': 'POST',
		'url': t,
		'data': fkey({
			'text': mensaje
		}),
		'success': i,
		'dataType': 'json',
		'error': _t(e, a)
	})
}
