function multiplicar(a,b)
{
	var array=[]
	for(var i in b)
	{
		for(var j in a)
		{
			if(array[+i+ +j]==undefined){array[+i+ +j]=0}
			array[+i+ +j]+=b[i]*a[j]
		}
	}
	for(var k=array.length-1;k>0;k--)
	{
		array[k-1]+=Math.floor(array[k]/10)
		array[k]=array[k]%10
	}
	return array.join("")
}
