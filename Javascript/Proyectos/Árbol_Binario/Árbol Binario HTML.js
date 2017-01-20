function navegador(){return (toString+"")[9]=="("?"Chrome":"Firefox"}
function deshabilitarCajas()
{
	if(navegador()=="Chrome")
	{
		propiedades.disabled=true
		resultado.disabled=true
	}
}
function insertarHTML(principal)
{
	propiedades.value=mostrarÁrbol(principal)+""
	resultado.value=JSON.stringify(principal)
	agregar.value=""
}
function insertarResultadoDesdeCadena(agregaValor)
{

	var principal=resultado.value
	var valores=agregaValor
	if(principal=="")
	{
		principal=new Árbol()
	}
	else
	{
		principal=JSON.parse(principal)
	}
	if(valores.search("\n")>=0)
	{
		var fecha_1=new Date()
		fecha_10=fecha_1.getSeconds()*1000+fecha_1.getMilliseconds()

		valores=valores.split("\n")
		for(var i=0;i<valores.length;i++)
		{
			var actual=valores[i].split(" ")
			if(actual[0]!="")
			{
				agregarPropiedadesÁrbol(principal,actual[0],actual[1])
			}
		}
		insertarHTML(principal)
		
		var fecha_2=new Date()
		fecha_20=fecha_2.getSeconds()*1000+fecha_2.getMilliseconds()
		var diferenciaTiempo=Math.floor(fecha_20-fecha_10)
		var diferenciaTiempo=Math.floor(fecha_20-fecha_10)
		console.log("Tardó "+diferenciaTiempo+" milisegundos.")
	}
}
function insertarResultado()
{
	insertarResultadoDesdeCadena(agregar.value)
}
function prueba()
{
	var principal=probando()
	insertarHTML(principal)
}
function eliminarTodo()
{
	resultado.value=""
	propiedades.value=""
}
function eliminarPropiedades()
{
	var principal=resultado.value
	var posición=agregar.value
	if(principal=="")
	{
		principal=new Árbol()
	}
	else
	{
		principal=JSON.parse(principal)
	}
	eliminarPropiedadesÁrbol(principal,posición)
	insertarHTML(principal)
}

