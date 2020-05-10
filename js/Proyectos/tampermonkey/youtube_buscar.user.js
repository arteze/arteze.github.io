// ==UserScript==
// @name         No mostrar primeros videos
// @version      1.0.1
// @description  Extensión de YouTube para no mostrar los primeros videos.
// @author       ArtEze
// @match        *://www.youtube.com/results?search_query=*
// @grant        none
// ==/UserScript==

function borrar_primeros_videos(){
	var cantidad_permanecer = 30
	var videos = [...document.querySelectorAll("ytd-video-renderer")]
	if(videos.length>cantidad_permanecer){
		videos[0].remove()
	}
}
setInterval(borrar_primeros_videos,30000)

