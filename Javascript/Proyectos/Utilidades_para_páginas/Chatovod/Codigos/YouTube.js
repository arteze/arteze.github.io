/*
https://youtu.be/Angs2TAJbfk 
https://vt.media.tumblr.com/tumblr_p537izpb9O1uw3nya.mp4 
*/

function getVidId(url)
{
    var vidId;
    if(url.indexOf("youtube.com/watch?v=") !== -1) //https://m.youtube.com/watch?v=e3S9KINoH2M
    {
        vidId = url.substr(url.indexOf("youtube.com/watch?v=") + 20);
    }
    else if(url.indexOf("youtube.com/watch/?v=") !== -1) //https://m.youtube.com/watch/?v=e3S9KINoH2M
    {
        vidId = url.substr(url.indexOf("youtube.com/watch/?v=") + 21);
    }
    else if(url.indexOf("youtu.be") !== -1)
    {
        vidId = url.substr(url.indexOf("youtu.be") + 9);
    }
    else if(url.indexOf("www.youtube.com/embed/") !== -1)
    {
        vidId = url.substr(url.indexOf("www.youtube.com/embed/") + 22);
    }
    else if(url.indexOf("?v=") !== -1) //http://m.youtube.com/?v=tbBTNCfe1Bc
    {
        vidId = url.substr(url.indexOf("?v=")+3, 11);
    }
    if(vidId.indexOf("&") !== -1)
    {
        vidId = vidId.substr(0, vidId.indexOf("&") );
    }
    return vidId;
}
function YouTubeUrlNormalize(url)
{
    var rtn = url;
    if(url)
    {
        var vidId = getVidId(url);
        if(vidId)
        {
            rtn = "https://www.youtube.com/embed/"+vidId;
        }
        else
        {
            rtn = url;
        }
    }
    return rtn;
}
if ( typeof exports !== "undefined" ) {
    module.exports = YouTubeUrlNormalize;
} else if ( typeof define === "function" ) {
    define( function (){
        return YouTubeUrlNormalize;
    })
} else {
    window.YouTubeUrlNormalize = YouTubeUrlNormalize;
}

function youtube_insertar()
{
	var array = Array.from(
		document.querySelectorAll(".chatMessage>.text")
	).map(x=>x.querySelector("a[target]"))
	.filter(x=>x!=null).map(
		x=>{
			var a = x.parentNode
			var b = x.innerHTML
			var c = b.split("/").slice(-1)[0].split("?")[1].split("&").map(x=>x.split("="))
			var id_video
			for(var i in c)
			{
				if(c[i][0]=="v"){id_video=c[i][1];break}
			}
			var direccion = location.protocol + "//youtube.com/embed/" + id_video
			console.log(id_video)

			if(b.includes("youtube"))
			{
				a.innerHTML = '<iframe allow="encrypted-media" width="320" height="180" src="'
					+ direccion + '?rel=0" frameborder="1" allowfullscreen></iframe>'
			}
			return true
		}
	)
}
setInterval(youtube_insertar,1000)
