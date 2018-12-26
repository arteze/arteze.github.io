function hora_entre(hh,mh,h1,m1,h2,m2)
{
	var hoy = hh+mh/60
	var hora_1 = h1+m1/60
	var hora_2 = h2+m2/60
	return hoy>hora_1&&hoy<hora_2
}
function puedo_jugar()
{
	var puedo = true
	var fecha = new Date()
	var día_semana = fecha.getDay()
	var h = fecha.getHours()
	var m = fecha.getMinutes()
	var comprobar_hora = 	 hora_entre(h,m,12,0,13,30)
						|hora_entre(h,m,15,30,17,0)
						|hora_entre(h,m,18,0,20,30)
	return día_semana!=0&&comprobar_hora
}
function instante()
{
	var puedo = puedo_jugar()
	//puedo=Math.floor(Math.random()*2)
	document.querySelector("body").style.setProperty("background-color",puedo?"#0f0":"#f00")
	document.title = document.title = puedo?"✅":"❌"
	setTimeout(instante,10000)
}
document.onreadystatechange = instante
