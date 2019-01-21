function calcular_gasto(cantidad_números,dinero,gastado)
{
	return [
			cantidad_números,
			dinero,
			cantidad_números*dinero,
			7*dinero,
			dinero*(7-cantidad_números),
			dinero*(7-cantidad_números)-gastado
		]
}
function sumar_array(array)
{
	var devuelve=0
	for(var i in array)
	{
		devuelve+=array[i]
	}
	return devuelve
}
function cuánto_jugar(dinero,jugadas)
{
	var gastado=sumar_array(jugadas)
	var i=Math.floor(dinero/gastado)
	var array=[]
	var actual=[]
	var alcanza
	for(var i=1;i<7;i++)
	{
		alcanza=Math.floor(dinero/i)
		var diferencia=alcanza*(7-i)-gastado
		if(diferencia<0){i--;break}
		actual=calcular_gasto(i,alcanza,gastado)
	}
	var i=actual[0]
	var jugar=actual[1]
	var copia=actual
	while(true)
	{
		actual=calcular_gasto(i,jugar,gastado)
		if(
			actual[5]<0
			| actual[0]==undefined
			| isNaN(actual[1])
		){break;}
		copia=actual
		jugar--
	}
	return copia
}
function pérdidas_consecutivas(dinero,jugadas)
{
	var array=[]
	for(var i=0;i<18;i++)
	{
		var actual=cuánto_jugar(dinero,jugadas)
		dinero-=actual[2]
		jugadas.push(actual[2])
		array.push(actual)
		actual.push("$"+dinero)
		//console.log(actual)
		if(
			actual[0]==0
			| actual[1]==0
			| actual[0]==undefined
			| actual[0]=="$NaN"
		){break;}
	}
	array.pop()
	return array
}
