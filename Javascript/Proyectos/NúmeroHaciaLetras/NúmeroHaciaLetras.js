function númeroHaciaLetras(x)
{
	var devuelve=""
	var i,j,k
	var y,z
	var veintiún
	var esVálido, y, miles, resto
	var restoCondición, restoPrecisión, restoUnidad, restoLetra
	var unidades=["Cero","Uno","Dos","Tres","Cuatro","Cinco","Seis","Siete","Ocho","Nueve"]
	var decenas=[0,"Diez","Veinte","Treinta","Cuarenta","Cincuenta","Sesenta","Setenta","Ochenta","Noventa"]
	var dieci=[decenas[1],"Once","Doce","Trece","Catorce","Quince",16,17,18,19]
	var centenas=[000,"Cien",200,300,400,"Quinientos",600,"Sete",800,"Nove"]
	var millón=[000000,"Mi","Bi","Tri","Cuatri","Quinti","Sexti","Septi","Octi","Noni"]
	var válidos={decenas:[2,3,4,6,8],centenas:[5,7,9]}
	var precisión=Math.pow(10,12)
	if(x<0)
	{
		devuelve+="Menos "
		x*=-1
	}
	resto=x%1
	x-=resto
	y=Math.floor(x/1000)
	z=[0,Math.floor(y/1000)]
	for(i=0;i<10;i++)
	{
		z[z.length]=Math.floor(z[z.length-1]/1000000)
	}
	if(x>-1&x<1){devuelve+=unidades[0]}
	veintiún=function(z){
		var devuelve,miles
		var k=1
		if(z%10==1)
		{
			if(z%100==21){k+=3}
			if(z%100>30|z%100<10){k++}
		}
		miles=númeroHaciaLetras(z%1000000)
		devuelve=miles.slice(0,miles.length-k)
		if(k==4){devuelve+="ún"}
		devuelve+=" "
		return devuelve
	}
	for(i=z.length-1;i>0;i--)
	{
		if(z[i]%1000000>=1)
		{
			if(z[i]%1000000==1)
			{
				devuelve+="Un "+millón[i]+"llón"
			}
			else
			{
				devuelve+=veintiún(z[i])
				devuelve+=millón[i]+"llones"
			}
			if(x%Math.pow(1000000,i)>0){devuelve+=" "}
		}
	}
	x-=z[1]*1000000
	y=Math.floor(x/1000)
	if(y%1000>0)
	{
		if(y>=2)
		{
			devuelve+=veintiún(y)
		}
		if(y%1000>=1){devuelve+="Mil"}
		if(x%1000>0){devuelve+=" "}
	}
	if(x%1000>=100&x%1000<200){devuelve+=centenas[1]}
	if(x%1000>100&x%1000<200){devuelve+="to "}
	i=(x%1000-x%100)/100
	esVálido=false
	for(j=0;j<válidos.decenas.length;j++)
	{
		if(i==válidos.decenas[j]){esVálido=true}
	}
	if(esVálido)
	{
		devuelve+=unidades[i]
	}
	else
	{
		for(j=0;j<válidos.centenas.length;j++)
		{
			if(i==válidos.centenas[j]){devuelve+=centenas[i]}
		}
	}
	if(x%1000>=200&!(x%1000>=500&x%1000<600)){devuelve+=centenas[1]+"tos"}
	if(x%1000>200&x%100>0){devuelve+=" "}
	if(x%100>=10&x%100<16){devuelve+=dieci[x%10]}
	if(x%100>=16&x%100<20){devuelve+="Dieci"}
	if(x%100>=20&x%100<30)
	{
		devuelve+="Veint"
		if(x%10>0){devuelve+="i"}else{devuelve+="e"}
	}
	if(x%100>=30)
	{
		i=(x%100-x%10)/10
		devuelve+=decenas[i]
		if(x%10>0){devuelve+=" y "}
	}
	i=x%100
	esVálido=true
	if(i==22){devuelve+="Dós";esVálido=false}
	if(i==23){devuelve+="Trés";esVálido=false}
	if(i==16|i==26){devuelve+="Séis";esVálido=false}
	if(i>=10&i<16|x%10==0){esVálido=false}
	if(esVálido){devuelve+=unidades[i%10]}
	
	restoCondición=function(resto){return resto>1/precisión}
	restoPrecisión=function(resto,precisión){
		resto*=precisión
		resto=Math.round(resto)
		resto/=precisión
		return resto
	}
	resto=restoPrecisión(resto,precisión)
	if(restoCondición(resto)==true){devuelve+=" coma"}
	while(restoCondición(resto)==true)
	{
		resto*=10
		resto=restoPrecisión(resto,precisión)
		restoUnidad=Math.floor(resto)
		restoLetra=númeroHaciaLetras(restoUnidad)
		devuelve+=" "+restoLetra.slice(0,restoLetra.length-1)
		resto-=restoUnidad
	}
	devuelve+="."
	devuelve=devuelve.toLowerCase()
	devuelve=devuelve[0].toUpperCase()+devuelve.slice(1,devuelve.length)
	return devuelve
}
