function array_vacío(longitud)
{
	var array=[]
	for(var i=0;i<longitud;i++)
	{
		array.push(0)
	}
	return array
}
function mostrar_array(array)
{
	var abecedario="0123456789abcdef"
	var devuelve=array.map(x=>abecedario[x]).join("")
	return devuelve
}
function incremento(array,base,cantidad)
{
	array[array.length-1]+=cantidad
	for(var i=array.length-1;i>0;i--)
	{
		if(array[i]<base){break}
		while(array[i]>=base)
		{
			array[i]-=base
			array[i-1]++
		}
	}
	if(array[0]==base)
	{
		array[0]=0
		array.unshift(0)
	}
	return array
}
var abecedario_hex="0123456789abcdef"
var abecedario_bin="0112122312232334"
function sumatoria(hash,mínimo)
{
	var total=0
	for(var i=0;i<hash.length;i++)
	{
		var actual=hash[i]
		total+=+abecedario_bin[abecedario_hex.indexOf(actual)]
		if(total>mínimo){return total}
	}
	return total
}
function fuerza_bruta(desde,hasta,hash)
{
	var mínimo=undefined
	var hash_mínimo=undefined
	//var devuelve=[]
	var array=array_vacío(64)
	desde=Math.floor(Math.pow(16,desde))
	incremento(array,16,desde)
	hasta=Math.pow(16,hasta)
	for(var i=desde;i<hasta;i++)
	{
		var actual=mostrar_array(array)
		var s256=hex_sha256(actual)
		//var diferencia=Math.log10( Math.abs( ("0x"+hash) - ("0x"+s256) ) )
		var suma=sumatoria(s256,mínimo)
		if(mínimo==undefined|suma<=mínimo)
		{
			var hash_actual=[
				i,
				actual,
				s256,
				suma
			]
			if(hash_mínimo!=undefined)
			{
				if(suma==mínimo&hash_mínimo[0]==hash_actual[0])
				{
					return "colisión "+suma
				}
			}
			mínimo=suma
			hash_mínimo=hash_actual
			console.log(hash_mínimo)
		}
		//devuelve.push(hash_actual)
		incremento(array,16,1)
	}
	/*
	var columna=3

	devuelve=devuelve.sort(
		(a,b)=>a[columna]>b[columna]?1:a[columna]<b[columna]?-1:0
	)*/
	return hash_mínimo
}
