<?php
$hay_mensajes = 0;
$intentos = 0;
while($hay_mensajes != 1 && $intentos < 70)
{
	$hay_mensajes = file_get_contents("./hay_mensajes.txt");
	usleep(20000);
	++$intentos;
}
$mensajes = file_get_contents("./mensajes.txt");
file_put_contents("./mensajes.txt","");
file_put_contents("./hay_mensajes.txt","0");
echo $mensajes;
?>
