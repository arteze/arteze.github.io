function enviar(){
	var alias = JSON.stringify(document.querySelector("input").value)
	var mensaje = JSON.stringify(document.querySelector("textarea").value)
	if(alias!="\x22\x22"&&mensaje!="\x22\x22"){
		fetch(`chat/enviar.php?alias=${alias}&mensaje=${mensaje}`).then(x=>x.text()).then(x=>{
			document.querySelector("textarea").value = ""
		})
	}
}
function mensaje_teclas(){
	if (event.key === "Enter") {
		event.preventDefault();
		enviar()
	}
}
function puentear(){
	fetch(`chat/puente.php`).then(x=>x.text()).then(x=>{
		var chat = document.querySelector(".chat")
		var mensaje = document.createElement("div")
		var b = document.createElement("b")
		if(x!=""){
			var m = JSON.parse(x)
			b.innerHTML = `${m.alias}: ${m.mensaje}`
			mensaje.appendChild(b)
			chat.appendChild(mensaje)
		}
		var chat = document.querySelector(".chat")
		chat.scrollTop = chat.scrollHeight;
		setTimeout(puentear,20)
	})
}

window.contador = 0
document.onreadystatechange = function(){
	if(window.contador==1){
		document.querySelector("button").addEventListener("click",enviar)
		document.querySelector("textarea").addEventListener("keydown",mensaje_teclas)
		setTimeout(puentear,10)
	}
	++window.contador
}
