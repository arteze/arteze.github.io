document.onreadystatechange = ()=>{
	window.ctx = document.body.querySelector("canvas").getContext("2d")
	ctx.imageSmoothingEnabled = false;
	window.elem = {
		ancho: document.body.querySelector("#ancho")
		, alto: document.body.querySelector("#alto")
	}
}
/*
setInterval(()=>{
	var aleat = Math.floor(Math.random()*2)
	if(aleat==0){elem.ancho.value=(+elem.ancho.value)-1}
	if(aleat==1){elem.ancho.value=(+elem.ancho.value)+1}
	window.gens()
},1000)
*/
window.gens = function(botón)
{
	if(botón)
	{
		var elemento = elem[botón.className]
		if(botón.textContent=="-"){elemento.value=(+elem.ancho.value)-1}
		if(botón.textContent=="+"){elemento.value=(+elem.ancho.value)+1}
	}
	var y=caracteres.value.split("").map(x=>Math.round(x/9*256))

	var raíz = Math.ceil(Math.sqrt(y.length))
	var ancho = elem.ancho.value
	var alto = elem.alto.value
	if(ancho==undefined|ancho==""){ancho=canvas.width}
	if(alto==undefined|alto==""){alto=canvas.height}
	canvas.width = ancho
	canvas.height = alto

	var imageData = ctx.createImageData(ancho,alto)

	for(var i=0;i<imageData.data.length/4;i++)
	{
		if(y[i]==undefined){break}
		imageData.data[i*4+0] = y[i]
		imageData.data[i*4+1] = y[i]
		imageData.data[i*4+2] = y[i]
		imageData.data[i*4+3] = 255
	}
	ctx.putImageData(imageData, 0, 0)
}
