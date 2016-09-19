/**
* Obtener la actual URL.
* @param {function(string)} callback - es llamado cuando la URL de la pestaña actual es encontrado
*/
function getCurrentTabUrl(callback) {
  // Consulta filtro que será pasado a chrome.tabs.query - ver:
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invoca el callback con una lista de pestañas que encuentra
    // la consulta. Cuando el popup es abierto, alli ciertamente es una ventana y al menos
    // una pestaña, asi nosotros podemos seguramente asumir que esa pestaña |tabs| no es un arreglo vacio.
    // Una ventana solo puede tener activa una pestaña a la vez, asi que el arreglo es
    // exactamento una pestaña.
    var tab = tabs[0];
    // Un tab es un objeto plano que provee información sobre la pestaña.
    // Ver https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
  // La mayoría de los métodos del Chrome extension API son asíncronos. Eso significa que
  // no puedes hacer algo como esto:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Mostrará "undefined", porque chrome.tabs.query es asíncrono.
}
/**
* @param {string} searchTerm – Buscar termino para Google Image search.
* @param {function(string,number,number)} callback – Llamada cuando una imagen fue encontrada. El callback obtiene la URL, el ancho y alto de la imagen.
* @param {function(string)} errorCallback – Llamada cuando la imagen no es encontrada.
*   El callback obtiene una cadena con las razones del porque fallo.
*/
function getImageUrl(searchTerm, callback, errorCallback) {
  var searchUrl = ' 'https://www.googleapis.com/customsearch/v1?cx=017923793791201738471%3A4nh2tpzikma&imgColorType=color&imgSize=medium&num=1&searchType=image&start=1&key=AIzaSyDcNC3g_HDSY8rHhBLFuqXbqqslQyjSgW4&q='
  + encodeURIComponent(searchTerm);
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  x.responseType = 'json';
  x.onload = function() {
    var response = x.response;
    if (!response || !response.items || response.items.length === 0){
	  errorCallback('No response from Google Image search!');
	  return;
    }
    var firstResult = response.items[0].image;
 
    var imageUrl = firstResult.thumbnailLink;
    var width = parseInt(firstResult.thumbnailWidth);
    var height = parseInt(firstResult.thumbnailHeight);
    console.assert(
	    typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
	    'Unexpected respose from the Google Image Search API!');
    callback(imageUrl, width, height);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}
 
function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}
document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    // Pone la imagen de la URL en Google search.
    renderStatus('Performing Google Image search for ' + url);
 
    getImageUrl(url, function(imageUrl, width, height) {
 
	  renderStatus('Search term: ' + url + '\n' +
		  'Google image search result: ' + imageUrl);
	  var imageResult = document.getElementById('image-result');
 
	  imageResult.width = width;
	  imageResult.height = height;
	  imageResult.src = imageUrl;
	  imageResult.hidden = false;
 
    }, function(errorMessage) {
	  renderStatus('Cannot display image. ' + errorMessage);
    });
  });
});
