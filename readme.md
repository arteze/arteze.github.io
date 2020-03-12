# arteze.github.io

Bienvenido al sitio web de ArtEze. Se intenta que el sitio sea bueno. El sitio Otecald en GitHub.

https://arteze.github.io/ (por ahora solo genera un __Hola mundo__ mediante JavaScript)

Página alternativa en GitHub Pages: https://otecald.github.io/
- Proyecto GitHub: https://github.com/Otecald/otecald.github.io

> ## Otros repositorios
> - charlavod: https://arteze.github.io/charlavod/
>   - Proyecto GitHub: https://github.com/ArtEze/charlavod
> 
> - NaCludora: https://arteze.github.io/NaCludora/
>   - Proyecto GitHub: https://github.com/ArtEze/NaCludora

Proyectos actuales:

* Cofonedor: Conversor de fonética.
* Bot Otecald: Bot conversacional basado en ElizaBot (faltan cosas por traducir).
* Base 64 hacia Palabras de Wikcionario.
* Estadísticas de la Quiniela.

Proyectos triviales:

* Descargar AJAX: Ejemplo de cómo se descarga una página mediante AJAX.
* Enviar mail: Página que sirve para enviarme un mail.

Herramientas generales: [js/General][General]

> Herramientas generales: [General.js][General.js]  
Criterios de ordenamiento: [Criterios_ordenamiento.js][Criterios]  
Ordenado unidimensional: [ordenar.js][Ordenar 1D]  
Ordenado bidimensional: [ordenado_2D.js][Ordenar 2D]

* Herramientas generales: [js/General/General.js][General.js]
  * `copiarArray`: Copiar elementos de un array a otro array.
  * `eliminarElementoArray`: Eliminar elementos de un array mediante una posición dada.
  * `eliminarDuplicadosEnArrayOrdenado`: Elimina elementos duplicados en un array ordenado.
  * `buscarEnArray`: Buscar elemento en un array.
  * `copiaReferencia`: Copiar array por referencia o por copia (usa `copiarArray`).
  * `concatenarArrays`: Concatenar arrays.
  * `arrayHaciaCadena`: Crear una cadena a partir de un array.
  * `mayúsculasParaArray`: Convertir todos los elementos de un array a mayúsculas.
  * `enteroHaciaHexadecimal`: Entero hacia hexadecimal.
  * `enteroHaciaCaracter`: Entero hacia caracter string.

* Criterios de ordenamiento: [js/General/Criterios_ordenamiento.js][Criterios]
  * `compara`: Abecedario en español con la Ñ.
  * `comparaNúmeros`: Ordenando números.
  * `compara_secuencia_inversa`: Ordenado por longitud de palabra.

* Ordenado unidimensional: [js/General/ordenar.js][Ordenar 1D]

  * `generarPosiciones`: Genera un array con las posiciones del array ingresado.
    * Ejemplo: `["Hola","Mundo"]` => `[0,1]`
  * `buscar`: Busca elemento dentro de un array ordenado.
  * `insertar`: Inserta elemento en una posición del array, corriendo a la derecha todos los siguientes elementos.
  * `buscarInsertar`: Busca elemento en un array ordenado y lo inserta.
  * `ordenar`: Ordena un array mediante un criterio.
  * `extraer_columna`: Extrae columna de un array.
  * `homogeneizar`: Convierte un string a mayúsculas y le quita las tildes.

* Ordenado bidimensional: [js/General/ordenado_2D.js][Ordenar 2D]
  * `criterio_números`: Generando función que sirve de criterio para ordenar números.
  * `criterio_secuencias`: Genera función de criterio para ordenar por longitud de string y números.
  * `ordenar`: Copiar una matriz y la ordena mediante el criterio elegido.
  * `ordenar_números`: Ordena la matriz por número (usa `criterio_números`).
  * `ordenar_secuencias`: Ordena la matriz por longitud de string (usa `criterio_secuencias`).

[General.js]: https://github.com/ArtEze/arteze.github.io/blob/master/js/General/General.js
[Criterios]: https://github.com/ArtEze/arteze.github.io/blob/master/js/General/Criterios_ordenamiento.js
[Ordenar 1D]: https://github.com/ArtEze/arteze.github.io/blob/master/js/General/ordenar.js
[Ordenar 2D]: https://github.com/ArtEze/arteze.github.io/blob/master/js/General/ordenado_2D.js

[General]: https://github.com/ArtEze/arteze.github.io/tree/master/js/General
