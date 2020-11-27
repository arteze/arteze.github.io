<?php
$alias = $_GET["alias"];
$mensaje = $_GET["mensaje"];
$json = "{\n\t\"alias\": $alias,\n\t\"mensaje\": $mensaje\n}\n";
echo "Enviado.";
$hay_mensajes = file_get_contents("hay_mensajes.txt")==1;
if(!$hay_mensajes){
	file_put_contents("mensajes.txt", $json);
	file_put_contents("hay_mensajes.txt", "1");
}
?>
