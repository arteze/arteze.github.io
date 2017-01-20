/*
Header

Funciones:

function agregarArray(A,valor)
function último(A,opera,valor)
function promedio(mínimo,máximo)
function decimalHaciaHexadecimal(i)
function enteroHaciaCaracter(i)

*/

function agregarArray(A,valor)
{
	A[A.length]=valor
}
function último(A,opera,valor)
{
	if(opera){A[A.length-1]=valor}
	return A[A.length-1]
}
function promedio(mínimo,máximo)
{
	var medio=mínimo+máximo
	medio-=medio%2
	medio/=2
	return medio
}
function decimalHaciaHexadecimal(i)
{
	var a=i
	if(a>=10)
	{
		a=Function("return \"\\x"+(41+i-10)+"\"")()
	}
	return a
}
function enteroHaciaCaracter(i)
{
	var a=(i-i%16)/16
	var b=i%16
	var a_2=decimalHaciaHexadecimal(a)
	var b_2=decimalHaciaHexadecimal(b)
	return Function("return \"\\x"+a_2+""+b_2+"\"")()
}

