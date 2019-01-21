function ambo(){
	return Math.floor(Math.random()*100)
}
function los_8(){
	var ocho = []
	while(true) {
		ocho = Array.from(new Set(ocho))
		if(ocho.length>=8){break}
		ocho.push(ambo())
	}
	return ocho.sort((a,b)=>a>b)
}
function los_20(){
	var resultados = []
	for(var i=0;i<20;i++)
	{
		resultados.push(ambo())
	}
	resultados = Array.from(new Set(resultados))
	return resultados
}
function poceada(){
	var aciertos = 0
	var veinte = los_20()
	var ocho = los_8()
	for(var i in ocho)
	{
		aciertos+=veinte.includes(ocho[i])
	}
	return aciertos
}
function simular_jugadas(){
	var s = [...new Array(8)].map(x=>[])
	for(var i =0;i<100000;i++)
	{
		if(i%10000==0){console.log(i)}
		var p = poceada()
		s[p].push([i,p])
	}
	return s
}
