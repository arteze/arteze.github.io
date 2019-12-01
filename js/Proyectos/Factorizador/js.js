/*
	Requiere:
	"agregarArray.js", Funciones requeridas: agregarArray, último
	"numeroToArray.js",
	
	Inspirado en el factorizador de Santiago Bruno: http://www.santiagobruno.com.ar/javascript/factorizador.htm
*/

function agregarFactor(factores,factor)
{
	var puede=true
	var anterior=último(factores)
	if(anterior==undefined){agregarArray(factores,factor) ;puede=false}
	if(puede&isFinite(anterior))
	{
		if(anterior==factor){último(factores,true,[factor,2]) ;puede=false}
		if(puede){agregarArray(factores,factor) ;puede=false}
	}
	if(puede)
	{
		if(anterior[0]==factor){anterior[1]++ ;puede=false}
		if(puede){agregarArray(factores,factor) ;puede=false}
	}
	return factores
}
function factorizar(x)
{
	var resultado=true,factores=[],negativo=false
	var leyendas=[true,"número decimal","fuera de alcance","debe ingresar una cadena de texto",""]
	var idLeyenda=0
	if(x%1){resultado=false ;idLeyenda=1}
	if(númeroToArray(x).join("")!=x*1+""){resultado=false ;idLeyenda=2}
	var nulo=false
	if(númeroToArray(x)+""=="0"){nulo=true}
	if(typeof x!="string"){resultado=false ;idLeyenda=3}
	if(x==""){resultado=false ;idLeyenda=4}
	if(x<0)
	{
		x*=-1
		negativo=true
	}
	if(resultado)
	{
		var número=x
		var i=2
		while(i<=Math.sqrt(x))
		{
			if(x%i==0)
			{
				agregarFactor(factores,i)
				x/=i
			}
			else
			{
				i++
			}
		}
		agregarFactor(factores,x)
		resultado=factores
		if(factores.length==1&isFinite(factores[0])&factores[0]>1){resultado="primo"}
	}
	if(resultado==1){resultado="ni primo ni compuesto"}
	if(idLeyenda){resultado=leyendas[idLeyenda]}
	if(nulo){resultado="nulo"}
	if(negativo)
	{
		if(resultado=="primo"){resultado="primo negativo"}
		if(typeof resultado=="object")
		{
			resultado.length++
			for(var i=resultado.length-1;i>0;i--)
			{
				resultado[i]=resultado[i-1]
			}
			resultado[0]=-1
		}
	}
	return resultado
}
