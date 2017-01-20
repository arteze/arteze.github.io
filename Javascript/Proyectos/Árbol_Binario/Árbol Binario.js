/*
Header

Estructura:

function Árbol()

Funciones:

function subÁrbol(árbol,entero)
function buscarLongitudÁrbol(árbol,mínimo,máximo)
function longitudÁrbol(árbol)
function homogeneizar(uno)
function sonIgualesNoFinales(uno,dos,puedeHomogeneizar)
function sonIgualesNoFinales(uno,dos)
function comparaCadenas(alfa,es,beta)
function buscarEnteroÁrbol(árbol,posición,compara)
function mostrarÁrbol(árbol)
function siNoExisteHijoCreaÁrbol(árbol,bit)
function asignarÁrbol(árbol,entero,posición,valor)
function eliminarSubÁrbol(árbol,enteroHijo)
function correrIzquierdaÁrbol(árbol,entero)
function correrDerechaÁrbol(árbol,entero)
function agregarÁrbol(árbol,posición,valor)
function propiedadÁrbol(árbol,posición)
function eliminarPropiedadÁrbol(árbol,posición)
function agregarPropiedadesÁrbol(árbol,cadena,valor)
function propiedadesÁrbol(árbol,cadena)
function eliminarPropiedadesÁrbol(árbol,cadena)

*/

function Árbol()
{
	this.hijos=[]
	this.hijos.length=2
	this.propiedades=null
	this.posición=""
	this.valor=""
	for(var bit=0;bit<2;bit++)
	{
		this.hijos[bit]=null
	}
}

function subÁrbol(árbol,entero)
{
	var actual=árbol
	var nodo=enteroHaciaNodo(entero)
	if(nodo.valor==2){return actual}
	while(nodo!=null)
	{
		bit=nodo.valor
		actual=actual.hijos[bit]
		if(actual==null){break}
		nodo=nodo.siguiente
	}
	return actual
}
function buscarLongitudÁrbol(árbol,mínimo,máximo)
{
	var principal=árbol
	var actual
	var medio=promedio(mínimo,máximo)
	while(mínimo<máximo)
	{
		actual=subÁrbol(principal,medio)
		if(actual!=null){mínimo=medio+1}else{máximo=medio}
		medio=promedio(mínimo,máximo)
	}
	return medio
}
function longitudÁrbol(árbol)
{
	var principal=árbol
	var actual=principal
	var mínimo=1
	var medio
	var máximo
	while(actual.hijos[0]!=null)
	{
		mínimo*=2
		actual=actual.hijos[0]
	}
	máximo=mínimo*2
	medio=buscarLongitudÁrbol(principal,mínimo,máximo)
	return medio
}
function homogeneizar(uno)
{
	var a_1="ÁáÉéÍíÓóÚúüñçabcdefghijklmnopqrstuvwxyz"
	var a_2="AAEEIIOOUUUÑÇABCDEFGHIJKLMNOPQRSTUVWXYZ"
	var i=0
	while(a_1[i]!=undefined)
	{
		if(a_1[i]==uno){return a_2[i]}
		i++
	}
	return uno
}
function sonIgualesNoFinales(uno,dos,puedeHomogeneizar)
{
	var diez
	var once
	var doce
	var veintiuno
	var veintidós
	var i=0
	while(true)
	{
		if(puedeHomogeneizar)
		{
			veintiuno=homogeneizar(uno[i])
			veintidós=homogeneizar(dos[i])
		}
		else
		{
			veintiuno=uno[i]
			veintidós=dos[i]
		}
		diez=veintiuno!=veintidós
		once=veintiuno==undefined
		doce=veintidós==undefined
		if(diez|once|doce){break}
		i++
	}
	return i
}
function comparaCadenas(uno,es,dos)
{
	var diez
	var once
	var alfa
	var beta
	var i=0
	var j=0
	var devuelve=3
	var lógico=2
	var nodo=new Nodo()
	var lista="<=>"
	var a_1="AaÁáBbCcDdEeÉéFfGgHhIiÍíJjKkLlMmNnÑñOoÓóPpQqRrSsTtUuÚúÜüVvWwX"
	var a_2="xYyZzÇç0123456789_ -.,;:+\\/*^\"'%=<>&|¡!¿?[]{}¬~ªº@#$\n\r\t"
	agregarCadenaEnNodo(nodo,a_1)
	agregarCadenaEnNodo(nodo,a_2)
	j=sonIgualesNoFinales(uno,dos,true)
	diez=uno[j]
	once=dos[j]
	if(diez==undefined&once==undefined)
	{
		j=sonIgualesNoFinales(uno,dos,false)
		diez=uno[j]
		once=dos[j]
	}
	if(diez==undefined&once!=undefined){devuelve=0}
	if(diez!=undefined&once==undefined){devuelve=2}
	alfa=buscarNodo(nodo,diez)
	beta=buscarNodo(nodo,once)
	if(alfa<beta&devuelve==3){devuelve=0}
	if(alfa>beta&devuelve==3){devuelve=2}
	if(!alfa&!beta&diez<once&devuelve==3){devuelve=0}
	if(!alfa&!beta&diez>once&devuelve==3){devuelve=2}
	if(!alfa&beta&devuelve==3){devuelve=0}
	if(alfa&!beta&devuelve==3){devuelve=2}
	if(devuelve==3){devuelve=1}
	for(i=0;lista[i]!=undefined;i++){if(es==lista[i]){lógico=devuelve==i}}
	return lógico
}
function buscarEnteroÁrbol(árbol,posición,compara)
{
	var actual=árbol
	var es
	var mínimo=1
	var máximo=longitudÁrbol(actual)
	var medio=promedio(mínimo,máximo)
	while(mínimo<máximo)
	{
		es=compara(posición,">",subÁrbol(actual,medio).posición)
		if(es){mínimo=medio+1}else{máximo=medio}
		medio=promedio(mínimo,máximo)
	}
	return medio
}
function mostrarÁrbol(árbol)
{
	var principal=árbol
	var actual
	var salida=[]
	var propiedades
	var longitud=longitudÁrbol(principal)
	for(var i=1;i<longitud;i++)
	{
		actual=subÁrbol(principal,i)
		if(actual.posición!="")
		{
			agregarArray(salida,actual.posición+"="+actual.valor)
		}
		if(actual.propiedades!=null)
		{
			propiedades=mostrarÁrbol(actual.propiedades)
			agregarArray(salida,"["+propiedades+"]")
		}
	}
	return salida
}
function siNoExisteHijoCreaÁrbol(árbol,bit)
{
	var actual=árbol
	if(actual.hijos[bit]==null)
	{
		actual.hijos[bit]=new Árbol()
	}
	actual=actual.hijos[bit]
	return actual
}
function asignarÁrbol(árbol,entero,posición,valor)
{
	var actual=árbol
	var nodo=enteroHaciaNodo(entero)
	var bit=nodo.valor
	if(bit==2)
	{
		actual.posición=posición
		actual.valor=valor
		return actual
	}
	while(nodo.siguiente!=null)
	{
		actual=siNoExisteHijoCreaÁrbol(actual,bit)
		nodo=nodo.siguiente
		bit=nodo.valor
	}
	actual=siNoExisteHijoCreaÁrbol(actual,bit)
	actual.posición=posición
	actual.valor=valor
}
function eliminarSubÁrbol(árbol,enteroHijo)
{
	var principal=árbol
	var enteroPadre=padreNodo(enteroHijo)
	var árbolHijo=subÁrbol(principal,enteroHijo)
	var árbolPadre=subÁrbol(principal,enteroPadre)
	if(árbolPadre==árbolHijo)
	{
		principal.posición=""
		principal.valor=""
		return
	}
	var i
	var longitud=2
	for(i=0;i<longitud;i++)
	{
		if(árbolHijo==árbolPadre.hijos[i]){delete árbolPadre.hijos[i]}
	}
}
function correrIzquierdaÁrbol(árbol,entero)
{
	var principal=árbol
	var enteroActual=entero
	var mayor
	var posición
	var valor
	var i
	var longitud=longitudÁrbol(principal)
	var enteroHijo=longitud-1
	for(i=enteroActual;i<longitud-1;i++)
	{
		mayor=subÁrbol(principal,i+1)
		posición=mayor.posición
		valor=mayor.valor
		asignarÁrbol(principal,i,posición,valor)
	}
	eliminarSubÁrbol(principal,enteroHijo)
}
function correrDerechaÁrbol(árbol,entero)
{
	var principal=árbol
	var enteroActual=entero
	var menor
	var posición
	var valor
	var i
	var longitud=longitudÁrbol(principal)
	for(i=longitud;i>enteroActual;i--)
	{
		menor=subÁrbol(principal,i-1)
		posición=menor.posición
		valor=menor.valor
		asignarÁrbol(principal,i,posición,valor)
	}
}
function agregarÁrbol(árbol,posición,valor)
{
	var principal=árbol
	if(posición==""){return}
	if(principal.posición!="")
	{
		var entero=buscarEnteroÁrbol(principal,posición,comparaCadenas)
		var sub=subÁrbol(principal,entero)
		if(sub!=null)
		{
			if(posición!=sub.posición)
			{
				correrDerechaÁrbol(principal,entero)
			}
		}
		asignarÁrbol(principal,entero,posición,valor)
	}
	else
	{
		principal.posición=posición
		principal.valor=valor
	}
}
function propiedadÁrbol(árbol,posición)
{
	var principal=árbol
	var entero=buscarEnteroÁrbol(principal,posición,comparaCadenas)
	var actual=subÁrbol(principal,entero)
	return actual
}
function eliminarPropiedadÁrbol(árbol,posición)
{
	var enteroHijo=buscarEnteroÁrbol(árbol,posición,comparaCadenas)
	correrIzquierdaÁrbol(árbol,enteroHijo)
}
function agregarPropiedadesÁrbol(árbol,cadena,valor)
{
	var actualÁrbol=árbol
	var actualCadena
	var pendiente
	var propiedades=seccionarCadena(cadena,".")
	while(propiedades!=null)
	{
		actualCadena=mostrarNodo(propiedades.valor)
		pendiente=propiedadÁrbol(actualÁrbol,actualCadena)
		if(pendiente==null)
		{
			agregarÁrbol(actualÁrbol,actualCadena)
			actualÁrbol=propiedadÁrbol(actualÁrbol,actualCadena)
		}
		else
		{
			if(pendiente.posición==actualCadena)
			{
				actualÁrbol=pendiente
			}
			else
			{
				agregarÁrbol(actualÁrbol,actualCadena)
				actualÁrbol=propiedadÁrbol(actualÁrbol,actualCadena)
			}
		}
		if(propiedades.siguiente!=null)
		{
			if(actualÁrbol.propiedades==null)
			{
				actualÁrbol.propiedades=new Árbol()
			}
			actualÁrbol=actualÁrbol.propiedades
		}
		propiedades=propiedades.siguiente
	}
	actualÁrbol.valor=valor
	return actualÁrbol
}
function propiedadesÁrbol(árbol,cadena)
{
	var actualÁrbol=árbol
	var actualCadena
	var propiedades=seccionarCadena(cadena,".")
	while(propiedades!=null)
	{
		actualCadena=mostrarNodo(propiedades.valor)
		var pendiente=propiedadÁrbol(actualÁrbol,actualCadena)
		if(pendiente==null){return null}else{actualÁrbol=pendiente}
		if(propiedades.siguiente!=null){actualÁrbol=actualÁrbol.propiedades}
		propiedades=propiedades.siguiente
	}
	return actualÁrbol
}
function eliminarPropiedadesÁrbol(árbol,cadena)
{
	var propiedades=seccionarCadena(cadena,".")
	var nodoPadre=padreCadena(propiedades)
	var nodoPropiedad=últimoNodo(propiedades)
	var cadenaPadre=mostrarNodo(nodoPadre)
	var cadenaPropiedad=mostrarNodo(nodoPropiedad)
	var actualÁrbol
	var enteroHijo
	if(cadenaPadre=="")
	{
		actualÁrbol=árbol
	}
	else
	{
		actualÁrbol=propiedadesÁrbol(árbol,cadenaPadre).propiedades
	}
	var enteroHijo=buscarEnteroÁrbol(actualÁrbol,cadenaPropiedad,comparaCadenas)
	correrIzquierdaÁrbol(actualÁrbol,enteroHijo)
}

