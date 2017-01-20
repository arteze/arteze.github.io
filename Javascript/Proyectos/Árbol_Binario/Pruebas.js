/*
Programas de prueba:

function probando()
function prueba2()

*/

//Funciones de prueba

function probando()
{
	var lista=[
		"Actinio", "Aleatoriedad", "Autómata celular", "Calor específico",
		"Carbono", "Carga eléctrica", "Cinemática", "Coeficiente binomial",
		"Diagrama de Venn", "Ecuaciones de Maxwell", "Electromagnetismo",
		"Emil Julius Klaus Fuchs", "Física", "Física de partículas",
		"Henri Poincaré", "Interacciones fundamentales", "Luz",
		"Matemática inca", "Numeración maya", "Número p", "Oscilador armónico",
		"Paradoja de los gemelos", "Pequeño teorema de Fermat",
		"Potencia de un punto", "Potencial químico", "Productos notables",
		"Quark", "Regla y compás", "Regresión lineal",
		"Sistema de referencia no inercial", "Teorema de Euler",
		"Teoría de la Relatividad Especial", "Topología"
	]

	var árbol=new Árbol()
	var principal=árbol
	var siguiente
	var longitud=lista.length
	for(var i=0;i<longitud;i++)
	{
		siguiente=i+1
		agregarPropiedadesÁrbol(principal,lista[i],"Subárbol "+(i+1) )
	}
	return principal
}
function prueba2()
{
	var lista="\n"+
		"Cero 0"+"\n"+
		"Uno 1"+"\n"+
		"Cero.Cero 2"+"\n"+
		"Cero.Uno 3"+"\n"+
		"Uno.Cero 4"+"\n"+
		"Uno.Uno 5"+"\n"+
		"Cero.Cero.Cero 6"+"\n"+
		"Cero.Cero.Uno 7"+"\n"+
		"Cero.Uno.Cero 8"+"\n"+
		"Cero.Uno.Uno 9"+"\n"+
		"Uno.Cero.Cero 10"+"\n"+
		"Uno.Cero.Uno 11"+"\n"+
		"Uno.Uno.Cero 12"+"\n"+
		"Uno.Uno.Uno 13"+
	"\n"
	principal=resultado.value
	if(principal=="")
	{
		principal=new Árbol()
	}
	else
	{
		principal=JSON.parse(principal)
	}
	insertarResultadoDesdeCadena(lista)
	principal=JSON.parse(resultado.value)
	eliminarPropiedadesÁrbol(principal,"Cero.Uno.Uno")
	insertarHTML(principal)
}

