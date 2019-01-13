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
	var comprobar_hora = 
		 hora_entre(h,m,10, 0,10,40)
		|hora_entre(h,m,12, 0,12,40)
		|hora_entre(h,m,14,30,16,40)
		|hora_entre(h,m,18, 0,20,10)
	return día_semana!=0&&comprobar_hora
}
function está_sorteando()
{
	/*
		Primera:    11:00 11:30
		Matutina:   13:30 14:00
		Vespertina: 17:00 17:30
		Nocturna:   20:30 21:00
	*/
	var puedo = true
	var fecha = new Date()
	var día_semana = fecha.getDay()
	var h = fecha.getHours()
	var m = fecha.getMinutes()
	var comprobar_hora =
		 hora_entre(h,m,11,30,12, 0)
		|hora_entre(h,m,14, 0,14,30)
		|hora_entre(h,m,17,30,18, 0)
		|hora_entre(h,m,21, 0,21,30)
	return día_semana!=0&&comprobar_hora
}
function instante()
{
	var puedo = puedo_jugar()
	var sortea = está_sorteando()
	document.querySelector("body").style.setProperty("background-color",sortea?"#00f":puedo?"#0f0":"#f00")
	document.title = document.title = sortea?"🎲":puedo?"✅":"❌"
	setTimeout(instante,10000)
}
document.onreadystatechange = instante
