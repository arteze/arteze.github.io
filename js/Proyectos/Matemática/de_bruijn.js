function db(t,p,n,a,k,sequence)
{
	if(t>n)
	{
		if(!(n%p))
		{
			sequence=sequence.concat(a.slice(1,p+1))
		}
	}
	else{
		a[t]=a[t-p]
		++t
		sequence=db(t,p,n,a,k,sequence)
		var b=p
		p=t-1
		var c=1+a[Math.abs(p-b)]
		for(var j=0;j<k-c;j++)
		{
			a[p]=j+c
			sequence=db(t,p,n,a,k,sequence)
		}
	}
	return sequence
}
function de_bruijn(k,n)
{
    var a=[...Array(n+1)].map(x=>0)
    var sequence = []
	var t=1
	var p=1
    sequence=db(t,p,n,a,k,sequence)
    return sequence
}
