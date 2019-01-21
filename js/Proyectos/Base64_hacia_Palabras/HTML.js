function haciaPalabras()
{
	var array=base64HaciaPalabras(ta.value,lemario)
	comprobado.value=array.comprobaciónSuma
	ta_salida.value=array.salida
}
function haciaBase64()
{
	var array=palabrasHaciaBase64(ta_salida.value,lemario)
	comprobado.value=array.comprobaciónSuma
	ta.value=array.salida
}
