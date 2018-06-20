window.teclas ={}
window.sala = 1
window.obtener_CSRF = function()
{
	return location.host=="admin.chatovod.com"
		?document.querySelector(".navbar-right>li>ul>li:nth-child(2)>a").href.slice(-6)
		:document.body.querySelector("script").textContent.match(/\x22[A-Za-z0-9]{6}\x22/g)[0].slice(1,-1)
}
window.descargar = function(dirección,función)
{
	var descarga = new XMLHttpRequest()
	descarga.onreadystatechange = function(){
		if (descarga.readyState == 4 && descarga.status == 200)
		{
			if(función!=undefined)
			{
				función(descarga.responseText)
			}else
			{
				var descargado = descarga.responseText
				var hecho = false
				if(/error/gi.test(descargado)){console.log("error",dirección,descargado);hecho = true}
				if(/{}/gi.test(descargado)&!hecho){console.log("correcto",dirección);hecho = true}
				if(!hecho){console.log(descargado)}
			}
		}
	}
	descarga.open("GET",dirección)
	descarga.send()
}
window.caracteres_hacia_hexadecimal = function(texto)
{
	var caracteres = ["\\+",":","\n","#","&","\x20"]
	for(var i in caracteres)
	{
		var actual = caracteres[i]
		var exp = new RegExp(actual,"gi")
		var char_hacia_hex = x=>"%"+("0"+x.slice(-1).charCodeAt().toString(16).toUpperCase()).slice(-2)
		texto = texto.replace(exp,char_hacia_hex(actual))
	}
	return texto
}
window.enviar_mensaje = function(mensaje,sala,usuarios)
{
	var chat = location.protocol+"//"+location.host+"/chat/"
	var modo = "send"
	var hacia = usuarios==undefined?"":usuarios
	mensaje = window.caracteres_hacia_hexadecimal(mensaje)
	var fin = "&to="+hacia+"&roomId="+sala+"&msg="+ mensaje
	var dirección = chat + modo + "?csrf="+ window.obtener_CSRF() + fin
	window.descargar(dirección)
}
window.cc.prototype.log = function (a, b, c) {
	var info = b.split(" ")
	var entrada = info[0]
	var habitación = info[3]
	habitación = habitación!=undefined?habitación.match(/\[\d+]/gi):undefined
	var nueva_sala = habitación!=null?(+habitación.slice(-1)[0].slice(1,-1)):sala
	if(nueva_sala!=window.sala)
	{
		window.sala = nueva_sala
		console.log("Sala: ",sala)
	}
	entrada = entrada=="enter"?1:entrada=="leave"?0:-1
	var nombre = info.slice(1).join(" ")
	if(entrada>=0)
	{
		if(entrada)
		{
			console.log("Entra: ",nombre)
		}
	}
}
var mensajes = document.querySelector(".chatSendControlsWrapper")
var wrapper = document.querySelector(".chatSendControlsWrapper")
var texto = wrapper.querySelector("textarea")
var nombres = wrapper.querySelector(".nicks")
var cerrar = wrapper.querySelector(".closeIcon")
var herramientas = wrapper.querySelector("#toolbar2>.goog-toolbar")
var texto_wrapper = wrapper.querySelector(".textareaWrapper")
var botón_wrapper = wrapper.querySelector(".buttonWrapper")
var botón_enviar = wrapper.querySelector(".sendMessageButton")
var area_hacia = wrapper.querySelector(".to")
var nuevo_texto = document.createElement("textarea")

var caritas = wrapper.querySelectorAll(".smileys")
Array.map(caritas,x=>x.remove())
var íconos = document.createElement("i")
íconos.className = "smileys"
íconos.style.right = "-5px"
íconos.style.top = "-20px"
íconos.addEventListener("click",()=>{
	var visible_1 = document.querySelector("#caritas_normales").style
	var visible_2 = document.querySelector("#caritas_memes").style
	var visible_3 = document.querySelector("#caritas_ponys").style
	visible_1.visibility = visible_1.visibility=="visible"?"hidden":"visible"
	visible_2.visibility = visible_2.visibility=="visible"?"hidden":"visible"
	visible_3.visibility = visible_3.visibility=="visible"?"hidden":"visible"
})
texto_wrapper.appendChild(íconos)

if(texto!=null){texto.remove()}
function enviar_mensaje_texto()
{
	var mensaje = nuevo_texto.value
	var habitación = window.sala
	var hacia = Array.map(nombres.querySelectorAll("span"),x=>x.attributes["data-nick"].value)
	window.enviar_mensaje(mensaje,habitación,hacia)
	nuevo_texto.value = ""
	cerrar.click()
}
function presionar_tecla(e)
{
	var i = e.key
	window.teclas[i] = true
	if(window.teclas["Enter"]&!window.teclas["Shift"])
	{
		e.preventDefault()
		enviar_mensaje_texto()
	}
}
function soltar_tecla(e)
{
	var i = e.key
	window.teclas[i] = false
}

nuevo_texto.addEventListener('keydown',presionar_tecla)
nuevo_texto.addEventListener('keyup',soltar_tecla)
texto_wrapper.appendChild(nuevo_texto)

// Cambiar caritas
var caritas_nuevas = [
	document.createElement("div")
	,document.createElement("div")
	,document.createElement("div")
]
caritas_nuevas[0].id="caritas_normales"
caritas_nuevas[1].id="caritas_memes"
caritas_nuevas[2].id="caritas_ponys"

caritas_nuevas[0].className="smileysContainer"
caritas_nuevas[1].className="smileysContainer"
caritas_nuevas[2].className="smileysContainer"

var caritas_contenedor = document.createElement("div")
var caritas_contenido = document.createElement("div")
var enviar_botón = document.createElement("a")
caritas_contenedor.className="contentContainer"
caritas_contenido.className="content"
enviar_botón.className="sendMessageButton"

var i
var j
// Uno
var estilo = [
	["visibility","hidden"]
	,["right","0px"], ["top","-210px"], ["width","144px"]
	,["max-height","405px"]
]
for(i in estilo)
{
	caritas_nuevas[0].style[estilo[i][0]] = estilo[i][1]
}
// Dos
var estilo = [
	["visibility","hidden"]
	,["right","147px"], ["top","-210px"], ["width","224px"]
	,["max-height","405px"]
]
for(i in estilo)
{
	caritas_nuevas[1].style[estilo[i][0]] = estilo[i][1]
}
//Tres
var estilo = [
	["visibility","hidden"]
	,["right","24px"],["top","-31px"], ["width","225px"]
	,["max-height","405px"]
]
for(i in estilo)
{
	caritas_nuevas[2].style[estilo[i][0]] = estilo[i][1]
}
// Fin tres

enviar_botón.setAttribute("href","#")
enviar_botón.innerHTML = "Enviar"
enviar_botón.addEventListener("click",enviar_mensaje_texto)
botón_enviar.remove()
botón_wrapper.appendChild(enviar_botón)
botón_wrapper.appendChild(area_hacia)

/* Capturar:

var campo_caritas = document.querySelector(".smileysContainer")
var contenedor_caritas = campo_caritas.querySelector(".contentContainer")
var contenido_caritas = campo_caritas.querySelector(".content")

Array.map(contenido_caritas.querySelectorAll("div>img"),x=>[x.attributes["src"].value.split("//st1.chatovod.com/widget/i/sm/").slice(1)[0],x.attributes["alt"].value,x.attributes["width"].value,x.attributes["height"].value])
*/

/*
	0 .png excepto emo.gif
	1 .gif excepto grumpy.png
	2 todos .png
*/

var url_caritas = "https://st1.chatovod.com/widget/i/sm"

var caritas = [
[["smile",":-)","20","20"],["happy","=)","20","20"],["lol",":lol:","20","20"],["grin",":-D","20","20"],["w00t",":w00t:","20","22"],["wink",";-)","20","20"],["tongue",":P","20","20"],["pouty",":|","20","20"],["sad",":-(","20","20"],["kissing",":-*","20","20"],["heart","<3","18","17"],["love",":-X","22","28"],["joyful","^_^","20","20"],["blushing",":-*>","20","20"],["andy","o_O","20","20"],["wondering","o.o?","20","20"],["sideways","=]","20","20"],["surprised",":-O","20","20"],["uncertain",":/","20","20"],["unsure",":\\","20","20"],["whistling",":-\"","28","23"],["pinched",">_<","20","20"],["angry",">:o","20","20"],["cool","B)","20","20"],["angel","O:)","20","24"],["crying",":'(","20","20"],["sick",":&","20","20"],["sleeping","-_-","20","27"],["devil",">:)","20","26"],["bandit",":bandit:","24","24"],["ninja",":ninja:","20","20"],["policeman",":police:","20","24"],["wizard",":wizard:","26","33"],["fp",":fp:","20","20"],["alien",":alien:","22","22"],["internet",":internet:","19","19"],["computer",":computer:","24","24"],["game",":game:","19","19"],["music",":music:","16","16"],["video",":video:","16","16"],["good",":good:","24","24"],["bad",":bad:","24","24"],["handshake",":handshake:","24","24"],["meeting",":meeting:","24","24"],["pizza",":pizza:","16","16"],["cake",":cake:","24","24"],["coffee",":coffee:","24","24"],["beer",":beer:","20","20"],["drink",":drink:","24","24"],["island",":island:","24","24"],["football",":football:","24","24"],["geek",":geek:","19","19"],["james",":james:","19","19"],["emo",":emo:","20","20"],["vampire",":vampire:","24","24"],["money",":money:","16","16"],["btc",":btc:","20","20"],["flower",":flower:","19","19"],["bear",":bear:","20","20"],["in-love",":in-love:","24","24"],["iloveyou",":iloveyou:","19","19"],["panties-pink",":panties-pink:","19","19"],["boxers",":boxers:","19","19"],["love-over",":love-over:","24","24"],["no-loving",":no-loving:","19","19"],["bomb",":bomb:","24","24"],["handcuffs",":handcuffs:","24","24"],["kitty",":kitty:","25","20"],["cow",":cow:","24","24"],["pig",":pig:","24","24"],["clown",":clown:","24","24"],["r2d2",":r2d2:","19","20"],["sun",":sun:","22","22"],["rain",":rain:","24","24"],["rainbow",":rainbow:","24","24"],["star",":star:","24","24"]]
,
[["bw001",":troll:","51","42"],["bw002",":trollsmile:","51","33"],["bw003",":sadtroll:","54","42"],["bw004",":hotchick:","52","49"],["bw005",":okay:","64","42"],["bw006",":pokerface:","35","42"],["bw007",":pokerface2:","34","42"],["bw008",":yao:","32","42"],["bw009",":omg:","34","42"],["bw010",":pff:","56","42"],["bw011",":bw011:","35","42"],["bw012",":lolguy:","59","42"],["bw013",":megusta:","40","42"],["bw014",":megustasmile:","41","42"],["bw015",":fuckyea:","44","42"],["bw016",":gtfo:","58","44"],["bw017",":no.:","55","42"],["bw018",":yes.:","56","42"],["bw019",":foreveralone:","43","42"],["bw020",":bw020:","42","42"],["bw021",":bw021:","42","42"],["bw022",":fap:","50","42"],["bw023",":why:","44","42"],["bw024",":fuuuu:","49","42"],["bw025",":crying:","42","42"],["bw026",":bw026:","41","42"],["bw027",":bw027:","39","42"],["bw028",":why!?:","50","44"],["bw029",":bw029:","39","42"],["bw030",":bw030:","39","42"],["bw031",":wait:","41","42"],["bw032",":comeon:","38","42"],["bw033",":bw033:","38","42"],["bw034",":bw034:","42","42"],["bw035",":bw035:","39","42"],["bw036",":thumbup:","51","42"],["bw037",":laughinface:","40","42"],["bw038",":happy:","42","42"],["bw039",":yay!:","39","42"],["bw040",":bw040:","40","42"],["bw041",":bw041:","40","42"],["bw042",":happyderp:","39","42"],["bw043",":normal:","41","42"],["bw044",":feellikeasir:","41","46"],["bw045",":veryhappy:","44","42"],["bw046",":bw046:","41","42"],["bw047",":bw047:","39","42"],["bw048",":kidding:","42","42"],["bw049",":challenge_accepted:","90","46"],["bw050",":challenge_denied:","77","48"],["bw051",":bw051:","35","42"],["bw052",":cerealguyhey:","47","42"],["bw053",":cerealguy:","70","42"],["bw054",":cerealdad:","56","42"],["bw055",":bw055:","22","46"],["bw056",":happyhatersgonnahatel:","32","52"],["bw057",":ohcrap:","63","42"],["bw058",":ohcrap2:","56","42"],["bw059",":angrydark:","57","42"],["bw060",":iseewhatyoudidthere:","47","42"],["bw061",":ilied:","48","42"],["bw062",":motherofgod:","60","44"],["bw063",":ohgodwhy:","49","46"],["bw064",":ohstopityou:","70","42"],["bw065",":whysobutthurt:","42","42"],["bw066",":bw066:","35","42"],["bw067",":herpderp:","40","42"],["bw068",":awesome:","36","42"],["bw069",":showtits:","28","44"],["bw070",":imwatchingu:","68","50"],["bw071",":sweetjesus:","43","42"],["bw072",":bw072:","31","44"],["bw073",":mrrage:","52","42"],["bw074",":bw074:","76","42"],["bw075",":tableflip:","50","52"],["bw076",":bw076:","30","44"],["bw077",":bw077:","35","42"],["bw078",":bw078:","34","46"],["bw079",":bw079:","35","46"],["bw080",":jackiechan:","69","42"],["bw081",":spiderman:","32","42"],["bw082",":youdontsay:","61","42"],["bw083",":areyouserious:","44","42"],["bw084",":areyouseriousfemale:","43","42"],["bw085",":brownomfg:","47","44"],["bw086",":notbad:","55","48"],["bw087",":notbadfem:","49","50"],["bw088",":aawwweaah:","70","42"],["bw089",":epicwin:","30","58"],["bw090",":soclose:","32","46"],["bw091",":badass:","60","44"],["bw092",":impossibru:","42","47"],["bw093",":truestory:","60","48"],["bw094",":ifyouknowwhatimean:","55","48"],["bw095",":bw095:","49","46"],["bw096",":bw096:","49","46"],["bw097",":bw097:","57","44"],["bw098",":bw098:","38","42"],["bw099",":bw099:","64","42"],["bw100",":davai:","43","50"],["bw101",":petrosyan:","38","48"],["bw102",":styd:","48","48"],["bw103",":genius:","43","48"],["bw104",":bw104:","29","42"],["bw105",":bw105:","84","42"],["bw106",":happyface:","42","42"],["bw107",":wingeddoom:","42","42"],["bw108",":slowpoke:","42","42"],["bw109",":puh:","54","42"],["bw110",":staredad:","47","42"],["bw111",":budmuzhikom:","77","42"],["bw112",":philosoraptor:","60","42"],["bw113",":pedobear:","49","42"],["bw114",":sparta:","33","42"],["bw115",":facepalm:","48","44"],["bw116",":shatun:","32","44"],["bw117",":volk:","32","44"],["bw118",":vlastelin:","50","42"],["bw119",":experts:","72","48"],["bw120",":jirinovskiy:","96","42"],["bw121",":jirinovskiy2:","38","42"],["bw122",":nnnada:","34","42"],["grumpy",":grumpy:","35","35"],["nyan",":nyan:","32","32"]]
,
[["pony_smile",":pony_smile:","27","27"],["pony_happy",":pony_happy:","27","27"],["pony_pathetic",":pony_pathetic:","27","27"],["pony_insane",":pony_insane:","27","27"],["pony_shock",":pony_shock:","27","27"],["pony_laugh",":pony_laugh:","27","27"],["pony_confused",":pony_confused:","27","27"],["pony_cheeky",":pony_cheeky:","27","27"],["pony_tease",":pony_tease:","27","27"],["pony_determined",":pony_determined:","27","27"],["pony_speechless",":pony_speechless:","27","27"],["pony_smile2",":pony_smile2:","27","27"],["pony_awkward",":pony_awkward:","27","27"],["pony_blush",":pony_blush:","27","27"],["pony_angry",":pony_angry:","27","27"],["pony_oops",":pony_oops:","27","27"],["pony_shifty(right)",":pony_shifty(right):","27","27"],["pony_shifty(left)",":pony_shifty(left):","27","27"],["pony_smug",":pony_smug:","27","27"],["pony_overwhelmed",":pony_overwhelmed:","27","27"],["pony_tired",":pony_tired:","27","27"],["pony_undecided",":pony_undecided:","27","27"],["pony_bemused",":pony_bemused:","27","27"],["pony_angel",":pony_angel:","27","27"],["pony_rage",":pony_rage:","27","27"],["pony_wince",":pony_wince:","27","27"],["pony_sad",":pony_sad:","27","27"],["pony_awful",":pony_awful:","27","27"],["pony_cry",":pony_cry:","27","27"],["pony_derpy",":pony_derpy:","27","27"],["pony_stunned1",":pony_stunned1:","27","27"],["pony_stunned2",":pony_stunned2:","27","27"],["pony_starry-eyed",":pony_starry-eyed:","27","27"],["pony_bawl",":pony_bawl:","27","27"],["pony_wink",":pony_wink:","27","27"],["pony_despair",":pony_despair:","27","27"],["pony_unsure",":pony_unsure:","27","27"],["pony_heart",":pony_heart:","27","27"],["pony_embarrassed",":pony_embarrassed:","34","27"],["pony_nerdy",":pony_nerdy:","27","27"],["pony_sick",":pony_sick:","27","27"],["pony_cool",":pony_cool:","27","27"]]
]

for(i in caritas)
{
	var actual_0 = caritas[i]
	for(j in actual_0)
	{
		var actual_1 = actual_0[j]
		var carita_div = document.createElement("div")
		var carita_img = document.createElement("img")
		var formato = (i==0&actual_1[0]!="emo"|i==1&actual_1[0]=="grumpy"|i==2)?".png":actual_1[0]=="bw057"?".GIF":".gif"
		carita_img.src = url_caritas+"/"+(+i+1)+"/"+actual_1[0]+formato
		carita_img.setAttribute("height","16px")
		carita_img.setAttribute("width","16px")
		carita_img.setAttribute("alt",actual_1[1])
		carita_img.addEventListener("click",x=>document.querySelector("textarea").value+=x.target.alt+" ")
		carita_div.appendChild(carita_img)
		caritas_nuevas[i].appendChild(carita_img)
	}
}
mensajes.appendChild(caritas_nuevas[0])
mensajes.appendChild(caritas_nuevas[1])
mensajes.appendChild(caritas_nuevas[2])

var usuarios = document.querySelector(".chatUsersFilter>input")
function enfocar_usuarios(){window.hay_foco_usuarios = true}
function desenfocar_usuarios(){window.hay_foco_usuarios = false}
function enfocar_texto(){window.hay_foco_texto = true}
function desenfocar_texto(){window.hay_foco_texto = false}
usuarios.addEventListener("focus",enfocar_usuarios)
usuarios.addEventListener("blur",desenfocar_usuarios)
nuevo_texto.addEventListener("focus",enfocar_texto)
nuevo_texto.addEventListener("blur",desenfocar_texto)
function cambiar_foco()
{
	if(window.hay_foco_usuarios==undefined){window.hay_foco_usuarios = false}
	if(!window.hay_foco_usuarios&!window.hay_foco_texto){nuevo_texto.focus()}
}
setInterval(cambiar_foco,143)
