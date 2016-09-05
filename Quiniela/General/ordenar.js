function buscar(A,a,compara)
{
	var i=0
	var k=A.length
	var j=Math.floor((i+k)*.5)
	while(i<k)
	{
		if(compara(a,A[j])==1){i=j+1}else{k=j}
		j=Math.floor((i+k)*.5)
	}
	return j
}
function insertar(A,a,pos)
{
	A.length++
	for(var i=A.length-1;i>pos;i--){A[i]=A[i-1]}
	A[pos]=a
}
function buscarInsertar(A,a,compara)
{
	var pos=buscar(A,a,compara)
	insertar(A,a,pos)
	return A
}
function ordenar(A,compara)
{
	var B=[]
	for(var i=0;i<A.length;i++)
	{
		buscarInsertar(B,A[i],compara)
		if(i%1000==0){console.log(i)}
	}
	return B
}
//Prueba
function homogeneizar(p)
{
	var o=""
	p=p.toUpperCase()
	for(var i=0;i<p.length;i++)
	{
		var tildes=[["Á","A"],["É","E"],["Í","I"],["Ó","O"],["Ú","U"]]
		var q=false
		for(var j=0;j<tildes.length;j++)
		{
			if(p[i]==tildes[j][0])
			{
				o+=tildes[j][1]
				q=true
			}
		}
		if(!q&(p[i]>="A"&p[i]<="Z"|p[i]=="Ñ")){o+=p[i]}
	}
	return o
}
function compara(a,b)
{
	var a=homogeneizar(a[0])
	var b=homogeneizar(b[0])
	var abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
	var l=a.length
	if(b.length<l){l=b.length}
	for(var i=0;i<l;i++)
	{
		var A=abecedario.search(a[i])
		var B=abecedario.search(b[i])
		if(A<B){return -1}
		if(A>B){return 1}
	}
	if(a.length>b.length){return 1}
	if(a.length<b.length){return -1}
	return 0
}
function comparaNúmeros(a,b)
{
	if(a[1]<b[1]){return 1}
	if(a[1]>b[1]){return -1}
	return 0
}