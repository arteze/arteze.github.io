#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char* nuevo_texto(){
	return "";
}
char* nuevo_natural(){
	return "";
}
char* nuevo_salto_de_linea(){
	return "\n";
}
char* nuevo_espacio(){
	return " ";
}

void mostrar_string(char* string){
	printf("%s",string);
	return;
}
long obtener_longitud_de_string_como_long(char* string){
	size_t longitud = strlen(string);
	long longitud_como_long = longitud;
	return longitud_como_long;
}
void mostrar_natural(char* string){
	int puede_mostrar = 0;
	long longitud = obtener_longitud_de_string_como_long(string);
	for(long i=0;i<longitud;++i){
		char actual = string[i];
		if(!puede_mostrar){
			if( actual!='0' ){
				puede_mostrar = 1;
			}
		}
		if(puede_mostrar){
			printf("%c",actual);
		}
	}
	if(!puede_mostrar){
		printf("0");
	}
	return;
}
char* obtener_longitud_como_string(char* string){
	long longitud = obtener_longitud_de_string_como_long(string);
	char* long_string = malloc( sizeof(size_t) + 1 );
	for(int i=7;i>=0;--i){
		long_string[i] = '0'+longitud%10;
		longitud /= 10;
	}
	long_string[8] = '\x00';
	return long_string;
}
int main()
{
	mostrar_string("Texto: '");
	char* cadena = nuevo_texto();
	mostrar_string(cadena);
	mostrar_string( "'\n" );

	mostrar_string("Numero natural: '");
	char* natural = nuevo_natural();
	mostrar_natural(natural);
	mostrar_string( "'\n" );

	char* longitud_de_natural = obtener_longitud_como_string(natural);
	mostrar_string("Longitud de natural: ");
	mostrar_natural(longitud_de_natural);

	return 0;
}

