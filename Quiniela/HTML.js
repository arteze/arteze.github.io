function predecir()
{
	var entrada=ta_entrada.value
	var procesado=extraerNúmeros(entrada)
	var salida=ta_salida
	salida.innerHTML=procesado
}