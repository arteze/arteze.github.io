function insertarResultado()
{
	var factorizado=factorizar(aFactorizar.value)
	var s=[]
	var t=""
	if(typeof factorizado=="object")
	{	
		for(var i=0;i<factorizado.length;i++)
		{
			if(isFinite(factorizado[i-1])&i>0){t+=" * "}
			if(isFinite(factorizado[i]))
			{
				s[i]=factorizado[i]
				t+=factorizado[i]
			}
			else
			{
				s[i]=factorizado[i].join("^")
				t+=factorizado[i][0]+"<sup>"+factorizado[i][1]+"</sup>"
			}
		}
		s=s.join(" * ")
	}
	if(typeof factorizado=="object")
	{
		resArray.innerHTML=JSON.stringify(factorizado)
	}
	else
	{
		resArray.innerHTML=factorizado
	}
	resSimb.innerHTML=s
	if(s!=t){resSup.innerHTML=t}else{resSup.innerHTML=""}
}