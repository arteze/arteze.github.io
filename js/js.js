function hola_mundo(){
	var a = document.createElement("a")
	var b = document.createElement("a")
	var c = document.createElement("a")
	b.innerHTML = "Hola mundo."
	c.innerHTML = " "
	a.appendChild(b)
	a.appendChild(c)
	document.body.appendChild(a)
}
