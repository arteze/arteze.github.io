function ajaxScript (src)
{
	var request = new XMLHttpRequest()
	request.userSrc = src

	request.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			var script = document.createElement('script')
			script.innerHTML = this.responseText
			document.head.appendChild(script)
			RequestCounter++
			
			if (RequestCounter >= TotalRequests)
			{
				haciaPalabrasButton.disabled = false
				haciaBase64Button.disabled = false
			}
			
		}
		else
		{
			if (this.readyState == 4)
			{
				console.log("Problemas al cargar el script remoto '" + this.userSrc + "'");
			}
		}
	}
	request.open("GET", src, true)
	request.send()
}

window.onload = function ()
{
	var hospedaje="https://raw.githubusercontent.com/ArtEze/Otecald/master/Base64%20hacia%20Palabras/"
	var códigos=[
		"Wikcionario_Lemario_3.js",
		"General/General.js"
		"programa.js",
		"HTML.js"
	]
	RequestCounter = 0
	TotalRequests = códigos.length
	for(var i=0;i<TotalRequests;i++)
	{
		ajaxScript(hospedaje+códigos[1])
	}
}
