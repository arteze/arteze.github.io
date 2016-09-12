function inyectarArchivo(archivo)
{
	//El archivo (script.js) debe estar en web_accessible_resources en manifest.json
	var código = document.createElement("script")
	código.src = chrome.extension.getURL(archivo)
	código.onload = function(){this.remove()}
	document.head.appendChild(código)
}
function inyectarBot()
{
	var archivos=["Alizia.js","Bot.js"]
	for(var i=0;i<archivos.length;i++)
	{
		inyectarArchivo(archivos[i])
	}
}
inyectarBot()