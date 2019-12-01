/*
Header

Estructura:

function Nodo()

Funciones:

function mostrarNodo(nodo)
function copiarNodo(nodo)
function esIgualNodo(nodo)
function enteroHaciaNodo(entero)
function enteroDesdeNodo(binario)
function últimoNodo(nodo)
function padreNodo(entero)
function agregarCadenaEnNodo(nodo,alfa)
function buscarNodo(nodo,valor)
function seccionarCadena(cadena,caracter)
function padreCadena(cadena)

*/

function Nodo()
{
	this.anterior=null
	this.siguiente=null
	this.valor="" //Puntero a caracter
}

function mostrarNodo(nodo)
{
	var salida=""
	var actual=nodo
	while(actual!=null)
	{
		if(actual.valor==""){salida+="\\0"}
		if(typeof(actual.valor)=="object")
		{
			if(salida!=""){salida+="."}
			salida+=mostrarNodo(actual.valor)
		}
		else
		{
			salida+=actual.valor
		}
		actual=actual.siguiente
	}
	return salida
}
function copiarNodo(nodo)
{
	var actualNodo=nodo
	var copia=new Nodo()
	var actualCopia=copia
	if(actualNodo==null){return null}
	while(actualNodo.siguiente!=null)
	{
		actualCopia.valor=actualNodo.valor
		actualCopia.siguiente=new Nodo()
		actualCopia=actualCopia.siguiente
		actualNodo=actualNodo.siguiente
	}
	actualCopia.valor=actualNodo.valor
	return copia
}
function esIgualNodo(uno,dos)
{
	var actualUno=uno
	var actualDos=dos
	var entero
	while(actualUno!=null&actualDos!=null)
	{
		if(typeof(actualUno.valor)=="object"|typeof(actualDos.valor)=="object")
		{
			if(typeof(actualUno)!="object"){return false}
			if(typeof(actualDos)!="object"){return false}
			entero=esIgualNodo(actualUno.value,actualDos.value)
			if(!entero){return false}
		}
		if(actualUno.valor!=actualDos.valor){return false}
		actualUno=actualUno.siguiente
		actualDos=actualDos.siguiente
	}
	if(actualUno!=null|actualDos!=null){return false}
	return true
}
function enteroHaciaNodo(entero)
{
	var nodo=new Nodo()
	var actual=nodo
	var cero=entero
	var uno=cero
	var potenciado=1
	var nulo=0
	if(cero<2){nulo=3-2*cero}
	while(cero>=4)
	{
		actual.siguiente=new Nodo()
		actual.siguiente.anterior=actual
		actual=actual.siguiente
		
		cero/=2
		potenciado*=2
	}
	while(actual.anterior!=null)
	{
		actual.valor=uno%2+""
		uno-=uno%2
		uno/=2
		actual=actual.anterior
	}
	actual.valor=uno%2+nulo+""
	return nodo
}
function enteroDesdeNodo(nodo)
{
	var actual=nodo
	var entero=1
	var resto=0
	var nulo=0
	if(nodo.valor>=2){nulo=2*nodo.valor-1}
	while(actual!=null)
	{
		entero*=2
		resto*=2
		resto+=actual.valor*1
		actual=actual.siguiente
	}
	return entero+resto-nulo
}
function últimoNodo(nodo)
{
	var actual=nodo
	while(actual.siguiente!=null){actual=actual.siguiente}
	return actual
}
function padreNodo(entero)
{
	var nodo=enteroHaciaNodo(entero)
	var actual=nodo
	var resultado
	actual=últimoNodo(nodo)
	if(actual==nodo){return (actual.valor!=3)*1}
	actual=actual.anterior
	delete actual.siguiente
	resultado=enteroDesdeNodo(nodo)
	return resultado
}
function agregarCadenaEnNodo(nodo,alfa)
{
	var actual=nodo
	var i=0
	actual=últimoNodo(nodo)
	if(actual.valor==""){actual.valor=alfa[i++]}
	while(alfa[i]!=undefined)
	{
		actual.siguiente=new Nodo()
		actual=actual.siguiente
		actual.valor=alfa[i++]
	}
}
function buscarNodo(nodo,valor)
{
	var actual=nodo
	var i=1
	while(actual!=null)
	{
		if(actual.valor==valor){return i}
		actual=actual.siguiente
		i++
	}
	return 0
}
function seccionarCadena(cadena,caracter)
{
	var principalCadena=new Nodo()
	var principalNodo=new Nodo()
	var actualCadena=principalCadena
	var actualNodo=principalNodo
	var i=0
	while(cadena[i]!=undefined)
	{
		if(cadena[i]==caracter)
		{
			actualCadena.valor=principalNodo
			actualCadena.siguiente=new Nodo()
			actualCadena=actualCadena.siguiente
			principalNodo=new Nodo()
			actualNodo=principalNodo
		}
		else
		{
			actualNodo.valor=cadena[i]
			if(cadena[i+1]!=caracter&cadena[i+1]!=undefined)
			{
				actualNodo.siguiente=new Nodo()
				actualNodo=actualNodo.siguiente
			}
		}
		i++
	}
	actualCadena.valor=principalNodo
	return principalCadena
}
function padreCadena(nodo)
{
	var copia=copiarNodo(nodo)
	var actual=copia
	var sonIguales
	if(actual==null){return null}
	while(actual.siguiente!=null)
	{
		if(actual.siguiente.siguiente!=null)
		{
			actual=actual.siguiente
		}
		else
		{
			break
		}
	}
	delete actual.siguiente
	sonIguales=esIgualNodo(nodo,copia)
	if(sonIguales){return null}
	return copia
}

