/*
	Requiere:
	"agregarArray.js", Funciones: agregarArray, último
*/

function númeroToArray(x)
{
	var A=[]
	var coma=false
	if(typeof x=="string")
	{
		var cero=false
		for(var i=0;i<x.length;i++)
		{
			if(x[i]=="0"){cero=true}
			var y=x[i]
			if(y>=0){y*=1}
			if(y=="."){coma=true}
			agregarArray(A,y)
			if(0==A[0]*1){A.shift()}
		}
		if(coma)
		{
			while(último(A)==0){A.length--}
			if(último(A)=="."){A.length--}			
		}
		if(cero&!A.length){A=[0]}
		if(cero&A+""=="-,0"){A=[0]}
	}
	return A
}