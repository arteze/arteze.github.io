function calcular_progresión(quiero_ganar,es_por_día,a_los,moneda,exp,números_a_jugar)
{
	//calcular_progresión(2,true,20,2,0)
	var gastado=0
	var array=[]
	var multiplicar_día=70/a_los
	var multiplicación_final=multiplicar_día-números_a_jugar
	var a=a_los==20?moneda*multiplicación_final:multiplicación_final
	var b=a_los==20?moneda:1
	for(var i=0;true;i++)
	{
		if(/*Math.abs(hoy_cada_número)>17142|*/ i>200){break}
		var multiplica=es_por_día?i+1:1
		var eleva=exp?Math.pow(7,i):1
		var esperado=quiero_ganar*multiplica
		var hoy_cada_número=Math.ceil((esperado*eleva+gastado)/a)*b
		var hoy_todo=hoy_cada_número*números_a_jugar
		gastado+=hoy_todo
		array.push([
			i+1,
			gastado,
			hoy_cada_número,
			hoy_todo,
			hoy_cada_número*multiplicar_día,
			hoy_cada_número*multiplicar_día-gastado
		])
	}
	return array
}
function generar_aleatorio()
{
	var número=Math.floor(Math.random()*100)
	return número
}
function simular_jugadas(años,cantidad_mis_números,inicial,por_día,meta)
{
	//clear();simular_jugadas(1/12,3,100000000000000000,200,4993)
	/**/
	if(años==undefined){años=1}
	if(cantidad_mis_números==undefined){cantidad_mis_números=3}
	if(inicial==undefined){inicial=1000}
	if(por_día==undefined){por_día=200}
	if(meta==undefined){meta=4993}
	/**/
	var dinero=inicial
	var dinero_mínimo=dinero
	var dinero_máximo=dinero
	var devuelve=0
	var atraso=0
	var acierta_general=false
	var pérdidas_seguidas=[0,0,0,0],acierta=[0,0,0,0],pierde_máximo=[0,0,0,0]
	var días_hábiles=Math.floor(365.2425/7*6-17)
	var progresión=calcular_progresión(por_día,true,20,2,false,cantidad_mis_números)
	var juegos_año=días_hábiles*4
	var jugadas=juegos_año*años
	var apuesta_total=0
	var máximo_a_gastar=Math.floor(10000/3.5/2)*2*6*cantidad_mis_números
	var máximos=0
	var i=0
	for(;i<jugadas;i++)
	{
		if(dinero-inicial>=meta)
		{
			console.log("El sueño ha sido realizado.")
			break
		}
		if(dinero<dinero_mínimo){dinero_mínimo=dinero}
		if(dinero>dinero_máximo){dinero_máximo=dinero}
		//if(i%10000==0){console.log(pierde_máximo)}
		if(false)
		//if(dinero>i*2)
		console.log(
			devuelve,
			i,
			dinero,
			apuesta_total,
			pérdidas_seguidas,
			dinero_mínimo,
			dinero_máximo,
			dinero_máximo/inicial,
			dinero/inicial,
		//	aciertos,
		//	pérdidas_seguidas,
		//	pierde_máximo
		//	pierde_máximo
		)
		//if(i%10000==0){console.log(pierde_máximo)}
		var tablero=[]
		for(var j=0;j<20;j++)
		{
			var aleatorio=generar_aleatorio()
			tablero.push(aleatorio)
		}
		var aciertos=0
		var mis_números=[]
		var apuesta_cada_número=0
		/*
		for(var j=0;j<cantidad_mis_números;j++)
		{
			apuesta_cada_número+=progresión[pérdidas_seguidas[j]][2]
		}
		*/
		apuesta_cada_número=progresión[atraso][2]
		apuesta_total=apuesta_cada_número*cantidad_mis_números
		if(apuesta_total>máximo_a_gastar)
		{
			apuesta_total=máximo_a_gastar
			apuesta_cada_número=apuesta_total/cantidad_mis_números
			máximos++
			if(máximos%10==0){console.log("¡Peligro: Muchos máximos!")}
		}
		if(dinero-apuesta_total<i*por_día)
		{
			atraso=0
			apuesta_cada_número=progresión[atraso][2]
			apuesta_total=apuesta_cada_número*cantidad_mis_números
		}
		dinero-=apuesta_total
		if(dinero<0){break}
		for(var j=0;mis_números.length<cantidad_mis_números;j++)
		{
			var número=generar_aleatorio()
			if(mis_números.indexOf(número)==-1)
			{
				var condición=tablero.indexOf(número)!=-1
				mis_números.push(número)
				aciertos+=+condición
				if(condición)
				{
					dinero+=apuesta_cada_número*3.5
				}
			}
		}
		//apuesta_2=pérdidas_seguidas
		for(var j=0;j<cantidad_mis_números;j++)
		{
			acierta[j]=aciertos==j
			if(!acierta[j]){pérdidas_seguidas[j]++}else{pérdidas_seguidas[j]=0}
			if(pérdidas_seguidas[j]>pierde_máximo[j]){pierde_máximo[j]=pérdidas_seguidas[j]}
		}
		var acierta_general=aciertos>0
		atraso=acierta_general?0:atraso+1
		devuelve+=acierta_general
		//devuelve+=aciertos
	}
	devuelve*=100
	devuelve/=i
	//devuelve/=cantidad_mis_números
	if(dinero-inicial>0){console.log("¡Aleluya!")}
	if( máximos==0 & dinero>inicial ){console.log("¡Viva!")}
	var cantidad_máximos=3
	if( máximos>cantidad_máximos & dinero-inicial>0 )
	{
		console.log("¡Sobreviviste a "+cantidad_máximos+" máximos!")
	}
	return [
		i,
		máximos,
		pierde_máximo+"",
		dinero,
		dinero-inicial,
		"menos "+(inicial-dinero_mínimo),
		"más "+(dinero_máximo-inicial),
		dinero_máximo/inicial,
		dinero/inicial
	]
}
