function cantidades_nulas()
{
	var diez=[]
	for(var i=0;i<10;i++)
	{
		diez[i]=[i,0]
	}
	return diez
}
function frecuencias_diez(cadena)
{
	var diez = cantidades_nulas()
	for(var i in cadena)
	{
		++diez[+cadena[i]][1]
	}
    return diez.sort((a,b)=>a[1]<b[1])
}
function generar_jugadas(cadena){
	var array = cadena.split(" ")
	var i,j,k,m,p=0
	var t=""
	for(var j in array[0]){
		for(var k in array[1]){
			var s = []
			for(var m in array[2]){
				s.push(array[0][j]+array[1][k]+array[2][m])
				++p
			}
			t+=s.join(" ")+"\n"
	}}
	t+="\n"
	for(var k in array[1]){
		var s = []
		for(var m in array[2]){
			s.push(array[1][k]+array[2][m])
			++p
		}
		t+=s.join(" ")+"\n"
	}
	return t
}
function predecir()
{
	var entrada = document.querySelector("textarea").value
	var salida = document.querySelectorAll("textarea")[1]
	var procesado = entrada.match(/\d{3}/g)
	var salida
	if(procesado!=null)
	{
		var array = []
		for(var i=0;i<3;i++)
		{
			var unidades = procesado.map(x=>x[i]).join("")
			var frecuencias = frecuencias_diez(unidades)
			var filtrado = frecuencias.filter(x=>x[1]==frecuencias[frecuencias.length-1][1]).map(x=>x[0]).join("")
			array.push(filtrado)
		}
		predicción = generar_jugadas(array.join(" "))
	}else
	{
		predicción = "Error"
	}
	salida.value = predicción
}
