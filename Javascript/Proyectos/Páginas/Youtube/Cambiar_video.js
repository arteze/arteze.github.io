// ==UserScript==
// @name		 Youtube cambia
// @namespace	http://tampermonkey.net/
// @version	  0.1
// @description  Cambia video de Youtube si ya se vio.
// @author	   You
// @match		https://www.youtube.com/*
// @grant		none
// ==/UserScript==

function descargar(dirección)
{
	var descarga = new XMLHttpRequest()
	var hecho = false
	descarga.onreadystatechange = function(){
		var descargado = descarga.responseText
		if (descarga.readyState == 4 && descarga.status == 200)
		{
			//console.log(descarga.responseText)
		}
	}
	descarga.open("GET",dirección)
	descarga.send()
}
function analizar_link(url)
{
	return url.split("?")[1].split("&").map(x=>x.split("=")).filter(x=>x[0]=="v")[0][1]
}
function guardar_videos(array)
{
	var videos_objeto = {videos:array}
	localStorage.setItem("videos",JSON.stringify(videos_objeto))
}
function agregar_y_cambiar_video()
{
	console.log(Math.random())
	descargar("http://192.168.4.245:8080/")
	if(!location.href.includes("watch")){return;}
	var videos = localStorage.getItem("videos")
	var url = document.querySelector("#movie_player").getVideoUrl()
	var id = analizar_link(url)
	if(videos==null)
	{
		guardar_videos([id])
	}
	else{
		var videos_array = JSON.parse(videos).videos
		if(!videos_array.includes(id))
		{
			videos_array.push(id)
			guardar_videos(videos_array)
			window.último_enlace = id
			document.title = ". " + document.title
		}
		else
		{
			if(window.último_enlace == id){return;}
			var relacionados = Array.from(document.querySelector("#related").querySelectorAll("ytd-thumbnail"))
			.filter(x=>x.getAttributeNode("use-hovered-property"))
			.map(x=>analizar_link(x.querySelector("a").href))
			var hecho = false
			for(var i in relacionados)
			{
				var actual = relacionados[i]
				if(!videos_array.includes(actual))
				{
					if(actual==undefined)
					{
						console.log(i,relacionados[i])
					}else{
						location.href = "https://www.youtube.com/watch?v="+actual
						hecho = true
						break
					}
				}
			}
			if(!hecho)
			{
				var aleatorio = Math.floor(Math.random()*relacionados.length)
				location.href = "https://www.youtube.com/watch?v="+relacionados[aleatorio]
			}
		}
	}
}
window.intervalo = setInterval(agregar_y_cambiar_video,10000)
