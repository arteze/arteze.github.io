function compara(a,b,de_menor_a_mayor)
{
	var devuelve=0
	var a=homogeneizar(a[0])
	var b=homogeneizar(b[0])
	var abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
	var l=a.length
	if(b.length<l){l=b.length}
	for(var i=0;i<l;i++)
	{
		var A=abecedario.search(a[i])
		var B=abecedario.search(b[i])
		if(A<B){devuelve=-1}
		if(A>B){devuelve= 1}
	}
	if(a.length>b.length){devuelve= 1}
	if(a.length<b.length){devuelve=-1}
	if(de_menor_a_mayor){devuelve*=-1}
	return devuelve
}
function comparaNúmeros(a,b,de_menor_a_mayor)
{
	var devuelve=0
	if(a*1<b*1){devuelve= 1}
	if(a*1>b*1){devuelve=-1}
	if(de_menor_a_mayor){devuelve*=-1}
	return devuelve
}
function compara_secuencia_inversa(a,b)
{
	for(var i=0;i<a.length;i++)
	{
		if(a[a.length-i]>b[b.length-i]){devuelve=+1}
		if(a[a.length-i]<b[b.length-i]){devuelve=-1}
	}
	return 0
}
