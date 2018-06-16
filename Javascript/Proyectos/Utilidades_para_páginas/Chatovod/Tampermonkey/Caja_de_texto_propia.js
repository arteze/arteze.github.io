var ta = document.createElement("textarea")
var wrapper = document.querySelector(".textareaWrapper")
wrapper.querySelector("textarea").remove()
wrapper.appendChild(ta)
function enviar_texto(e)
{
	console.log(e.key)
	var i = e.key
	var s = e.preventDefault
	if(i=="Enter")
	{
		s()
		ta.value = ""
		enviar_mensaje(ta.value,1,[])
	}
}
ta.addEventListener('keypress',enviar_texto)
ta.addEventListener('keyup',function(e){
	letras[e.key]=false
})
